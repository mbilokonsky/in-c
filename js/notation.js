/* notation.js — render one In C pattern as crisp SVG using VexFlow.
 * Single source of truth is the same score-data used by the audio engine.
 *
 * renderPattern(container, patternScore, opts) -> { svg, noteEls }
 *   noteEls[eventIndex] = the <g> SVG element for that sounding note (null for rests/graces)
 *   so the player view can highlight the currently sounding note.
 */
(function () {
  const VF = Vex.Flow;

  // duration (in eighth-note units) -> [vexflow duration code, dot count]
  const DUR = {
    0.5: ["16", 0],
    1:   ["8", 0],
    1.5: ["8", 1],
    2:   ["q", 0],
    3:   ["q", 1],
    4:   ["h", 0],
    6:   ["h", 1],
    8:   ["w", 0],
    12:  ["w", 1],
  };

  function noteToKey(n) {
    // "F#4" -> "f#/4", "Bb4" -> "bb/4", "C5" -> "c/5"
    const m = n.match(/^([A-G])(#|b)?(\d)$/);
    return m[1].toLowerCase() + (m[2] || "") + "/" + m[3];
  }

  function renderPattern(container, patternScore, opts) {
    opts = opts || {};
    const scale = opts.scale || 1.0;
    container.innerHTML = "";

    const notes = [];        // main tickables (StaveNotes incl. rests)
    const noteEls = [];      // per sounding-event -> svg group (filled after draw)
    const eventToNote = [];  // event index -> StaveNote (or null)
    let pendingGrace = [];

    for (let i = 0; i < patternScore.length; i++) {
      const ev = patternScore[i];

      if (ev.gracenote) {
        const g = new VF.GraceNote({ keys: [noteToKey(ev.note)], duration: "16", slash: true });
        const m = ev.note.match(/^[A-G](#|b)?/);
        if (m && m[1]) g.addModifier(new VF.Accidental(m[1]), 0);
        pendingGrace.push(g);
        eventToNote[i] = null;
        continue;
      }

      const spec = DUR[ev.duration];
      if (!spec) { eventToNote[i] = null; continue; }
      const [code, dots] = spec;

      let note;
      if (ev.rest || !ev.note) {
        note = new VF.StaveNote({ keys: ["b/4"], duration: code + "r" });
        eventToNote[i] = null; // rests are not highlighted
      } else {
        note = new VF.StaveNote({ keys: [noteToKey(ev.note)], duration: code, auto_stem: true });
        const m = ev.note.match(/^[A-G](#|b)?/);
        if (m && m[1]) note.addModifier(new VF.Accidental(m[1]), 0);
        if (pendingGrace.length) {
          const grp = new VF.GraceNoteGroup(pendingGrace, false);
          grp.beamNotes();
          note.addModifier(grp, 0);
          pendingGrace = [];
        }
        eventToNote[i] = note;
      }
      for (let d = 0; d < dots; d++) VF.Dot.buildAndAttach([note], { all: true });
      notes.push(note);
    }

    if (!notes.length) return { svg: null, noteEls };

    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 }).setMode(VF.Voice.Mode.SOFT);
    voice.addTickables(notes);

    // Generate beams BEFORE drawing so beamed notes suppress their own flags
    // (otherwise each eighth draws a flag AND the beam is layered on top).
    const beams = VF.Beam.generateBeams(notes);

    const formatter = new VF.Formatter().joinVoices([voice]);
    const minWidth = formatter.preCalculateMinTotalWidth([voice]);

    // Horizontal space proportional to total beats so that patterns with the
    // same number of beats get the same width, and within a pattern notes are
    // spaced by their durations (a whole note occupies more room than an eighth)
    // — i.e. real-sheet-music spacing rather than a shrink-wrap.
    let totalEighths = 0;
    for (const ev of patternScore) if (!ev.gracenote) totalEighths += ev.duration || 0;
    const PX_PER_EIGHTH = 26;
    const clefPad = 46;
    const rightPad = 18;
    const noteArea = Math.max(minWidth, totalEighths * PX_PER_EIGHTH);

    const W = Math.ceil((noteArea + clefPad + rightPad) * scale);
    const H = Math.ceil(130 * scale);

    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(W, H);
    const ctx = renderer.getContext();
    ctx.scale(scale, scale);

    const stave = new VF.Stave(2, 18, (W / scale) - 4);
    stave.addClef("treble");
    stave.setContext(ctx).draw();

    formatter.format([voice], noteArea);
    voice.draw(ctx, stave);
    beams.forEach((b) => b.setContext(ctx).draw());

    // map sounding events to their drawn SVG groups for highlighting
    for (let i = 0; i < eventToNote.length; i++) {
      const n = eventToNote[i];
      noteEls[i] = n ? n.getSVGElement() : null;
    }

    return { svg: container.querySelector("svg"), noteEls };
  }

  window.Notation = { renderPattern };
})();
