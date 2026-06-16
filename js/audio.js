/* audio.js — Tone.js synthesis voices (no samples, fully offline) + the
 * scheduling engines for the Pulse and Player views.
 *
 * Timebase: BPM is the EIGHTH-NOTE PULSE rate (pulses per minute) — the same
 * high-C pulse the Pulse view sounds. One eighth-note unit = 60 / BPM seconds,
 * so a score "duration" of d eighth-units lasts d * 60 / BPM seconds. Pulse and
 * players therefore share one clock: set the same BPM and everyone lines up.
 */
(function () {
  let started = false;
  let bus = null;        // shared effects bus -> destination
  const voiceCache = {}; // lazily instantiated voices

  const VEL = { low: 0.45, medium: 0.72, high: 1.0 };

  async function ensureStarted() {
    if (started) return;
    await Tone.start();
    const reverb = new Tone.Reverb({ decay: 1.7, preDelay: 0.01, wet: 0.16 });
    const limiter = new Tone.Limiter(-2);
    const master = new Tone.Gain(0.85);
    reverb.connect(limiter);
    limiter.connect(master);
    master.toDestination();
    bus = reverb;
    started = true;
  }

  // ---- Voice palette (synthesis only; instant, no network) ----
  // Each factory returns an object exposing triggerAttackRelease(note, dur, time, velocity).
  const FACTORIES = {
    marimba: () => withGain(new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 8, modulationIndex: 2, oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.28, sustain: 0, release: 0.4 },
      modulation: { type: "square" },
      modulationEnvelope: { attack: 0.002, decay: 0.2, sustain: 0, release: 0.2 },
    }), 0.9),
    vibraphone: () => {
      const trem = new Tone.Tremolo({ frequency: 4.5, depth: 0.5 }).start();
      const s = new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 5, modulationIndex: 1.4, oscillator: { type: "sine" },
        envelope: { attack: 0.003, decay: 0.7, sustain: 0.05, release: 1.6 },
        modulation: { type: "sine" },
        modulationEnvelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.6 },
      });
      s.connect(trem); trem.connect(bus);
      return wrapLevel(s, 0.8);
    },
    epiano: () => withGain(new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 3, modulationIndex: 6, oscillator: { type: "sine" },
      envelope: { attack: 0.002, decay: 0.9, sustain: 0.15, release: 0.7 },
      modulation: { type: "sine" },
      modulationEnvelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 0.4 },
    }), 0.7),
    musicbox: () => withGain(new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.001, decay: 0.45, sustain: 0, release: 0.7 },
    }), 0.8),
    glockenspiel: () => withGain(new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 12, modulationIndex: 3, oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 0.5, sustain: 0, release: 0.9 },
      modulation: { type: "sine" },
      modulationEnvelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.3 },
    }), 0.55),
    pluck: () => {
      const s = new Tone.PluckSynth({ attackNoise: 1, dampening: 4000, resonance: 0.9 });
      s.connect(bus);
      return wrapLevel(s, 1.4);
    },
    nylon: () => {
      const s = new Tone.PluckSynth({ attackNoise: 0.6, dampening: 2600, resonance: 0.8 });
      s.connect(bus);
      return wrapLevel(s, 1.5);
    },
    flute: () => {
      const vib = new Tone.Vibrato({ frequency: 5, depth: 0.08 });
      const s = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.06, decay: 0.1, sustain: 0.9, release: 0.25 },
      });
      s.connect(vib); vib.connect(bus);
      return wrapLevel(s, 0.85);
    },
    clarinet: () => withGain(new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "square" },
      envelope: { attack: 0.04, decay: 0.1, sustain: 0.85, release: 0.2 },
    }), 0.4),
    strings: () => {
      const cho = new Tone.Chorus({ frequency: 1.5, delayTime: 4, depth: 0.6 }).start();
      const s = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.18, decay: 0.2, sustain: 0.85, release: 0.5 },
      });
      s.connect(cho); cho.connect(bus);
      return wrapLevel(s, 0.32);
    },
    organ: () => withGain(new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "fatsine", count: 3, spread: 18 },
      envelope: { attack: 0.01, decay: 0.05, sustain: 1, release: 0.15 },
    }), 0.4),
    pad: () => withGain(new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.5, decay: 0.4, sustain: 0.8, release: 1.2 },
    }), 0.3),
    bell: () => withGain(new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 3.01, modulationIndex: 14, oscillator: { type: "sine" },
      envelope: { attack: 0.001, decay: 1.4, sustain: 0, release: 1.4 },
      modulation: { type: "sine" },
      modulationEnvelope: { attack: 0.001, decay: 0.7, sustain: 0, release: 0.7 },
    }), 0.5),
    sine: () => withGain(new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.9, release: 0.2 },
    }), 0.7),
  };

  const VOICE_LIST = [
    ["marimba", "Marimba"], ["vibraphone", "Vibraphone"], ["epiano", "Electric Piano"],
    ["musicbox", "Music Box"], ["glockenspiel", "Glockenspiel"], ["bell", "Bell"],
    ["pluck", "Plucked String"], ["nylon", "Nylon Guitar"], ["flute", "Flute"],
    ["clarinet", "Clarinet"], ["organ", "Organ"], ["strings", "Strings"],
    ["pad", "Synth Pad"], ["sine", "Pure Sine"],
  ];

  function withGain(poly, level) { poly.connect(bus); return wrapLevel(poly, level); }
  function wrapLevel(node, level) {
    return {
      node,
      triggerAttackRelease(n, dur, time, vel) {
        try { node.triggerAttackRelease(n, dur, time, Math.max(0.02, vel * level)); } catch (e) {}
      },
    };
  }

  function getVoice(id) {
    if (!voiceCache[id]) voiceCache[id] = (FACTORIES[id] || FACTORIES.marimba)();
    return voiceCache[id];
  }

  // ---------------------------------------------------------------------------
  // PatternPlayer — loops one pattern; queues an advance that lands exactly at
  // the loop boundary. Lookahead scheduler over the audio clock for tight timing.
  // ---------------------------------------------------------------------------
  class PatternPlayer {
    constructor(score, handlers) {
      this.score = score;
      this.h = handlers || {};
      this.bpm = 120;                 // pulse (eighth-click) rate per minute — shared with the Pulse view
      this.voiceId = "marimba";
      this.patternIndex = 0;
      this.evIndex = 0;
      this.playing = false;
      this.advanceQueued = false;
      this.nextTime = 0;
      this.timer = null;
      this.taps = [];
      this.anchor = null;             // audio-clock time of a known pulse-grid onset (set by tapping)
      this.pending = null;            // { bpm, anchor } to apply cleanly at the next loop boundary
    }

    get voice() { return getVoice(this.voiceId); }
    setVoice(id) { this.voiceId = id; }
    setBpm(b) { this.bpm = Math.min(400, Math.max(20, b)); }
    secPerEighth() { return 60 / this.bpm; }

    // The shared pulse grid: onsets at anchor + k * (one eighth). Returns the first
    // grid onset at or after `after`. If no anchor yet, start the grid at `after`.
    _nextGrid(after) {
      const P = this.secPerEighth();
      if (this.anchor == null) { this.anchor = after; return after; }
      const k = Math.ceil((after - this.anchor) / P - 1e-9);
      return this.anchor + k * P;
    }

    goToPattern(i) {
      this.patternIndex = Math.min(this.score.length - 1, Math.max(0, i));
      this.evIndex = 0;
      this.advanceQueued = false;
      this.nextTime = this._nextGrid(Tone.now() + 0.06);
      if (this.h.onPattern) this.h.onPattern(this.patternIndex);
      if (this.h.onQueue) this.h.onQueue(false);
    }

    queueAdvance() {
      if (this.patternIndex >= this.score.length - 1) return;
      this.advanceQueued = true;
      if (this.h.onQueue) this.h.onQueue(true);
    }
    cancelAdvance() {
      this.advanceQueued = false;
      if (this.h.onQueue) this.h.onQueue(false);
    }

    async start() {
      await ensureStarted();
      if (this.playing) return;
      this.playing = true;
      // quantize the first note onto the shared pulse grid established by tapping
      this.nextTime = this._nextGrid(Tone.now() + 0.12);
      this.timer = setInterval(() => this._tick(), 25);
      if (this.h.onState) this.h.onState(true);
    }

    pause() {
      this.playing = false;
      if (this.pending) { // settle any queued re-sync so it's in effect for next Play
        this.setBpm(this.pending.bpm); this.anchor = this.pending.anchor; this.pending = null;
        if (this.h.onBpm) this.h.onBpm(Math.round(this.bpm));
        if (this.h.onResync) this.h.onResync(false);
      }
      if (this.timer) { clearInterval(this.timer); this.timer = null; }
      if (this.h.onState) this.h.onState(false);
    }

    toggle() { return this.playing ? (this.pause(), false) : (this.start(), true); }

    // Tap = one eighth-note pulse (tap along with the projected pulse). Sets BOTH
    // tempo (from the tap intervals) AND phase (this tap is a pulse-grid onset).
    tap() {
      const nowP = (typeof performance !== "undefined" ? performance.now() : Date.now());
      const nowA = Tone.now();
      this.taps = this.taps.filter((t) => nowP - t.p < 2200);
      this.taps.push({ p: nowP, a: nowA });
      let bpm = this.bpm;
      if (this.taps.length >= 2) {
        const iv = [];
        for (let i = 1; i < this.taps.length; i++) iv.push(this.taps[i].p - this.taps[i - 1].p);
        iv.sort((a, b) => a - b);
        const med = iv[Math.floor(iv.length / 2)];
        if (med > 80 && med < 3000) bpm = 60000 / med; // tap interval = one pulse
      }
      this._resync(bpm, nowA);
    }

    // Shift this phone's phase by half a pulse — fine repair when slightly off.
    nudge(dir) {
      const base = (this.anchor == null) ? Tone.now() : this.anchor;
      this._resync(this.bpm, base + dir * this.secPerEighth() / 2);
    }

    // Apply new tempo/phase. While playing, defer to the next loop boundary so the
    // current phrase finishes cleanly (no stutter); while stopped, apply at once.
    _resync(bpm, anchor) {
      if (this.playing) {
        this.pending = { bpm, anchor };
        if (this.h.onResync) this.h.onResync(true);
      } else {
        this.setBpm(bpm);
        this.anchor = anchor;
        if (this.h.onBpm) this.h.onBpm(Math.round(this.bpm));
      }
    }

    _tick() {
      if (!this.playing) return;
      const horizon = Tone.now() + 0.12;
      let guard = 0;
      while (this.nextTime < horizon && guard++ < 200) {
        this._scheduleOne(this.nextTime);
      }
    }

    _scheduleOne(t) {
      const pat = this.score[this.patternIndex].score;
      const ev = pat[this.evIndex];
      const eighth = 60 / this.bpm;

      if (ev.gracenote) {
        const gt = Math.max(Tone.now(), t - 0.045);
        this.voice.triggerAttackRelease(ev.note, 0.09, gt, (VEL[ev.velocity] || 0.5) * 0.7);
        this._advance(0); // grace consumes no time
        return;
      }

      const dur = ev.duration * eighth;
      if (!ev.rest && ev.note) {
        const vel = VEL[ev.velocity] || 0.7;
        this.voice.triggerAttackRelease(ev.note, Math.max(0.05, dur * 0.96), t, vel);
        if (this.h.onNote) {
          const idx = this.evIndex;
          const delay = Math.max(0, (t - Tone.now()) * 1000);
          setTimeout(() => { if (this.playing) this.h.onNote(idx); }, delay);
        }
      }
      this._advance(dur);
    }

    _advance(dur) {
      this.nextTime += dur;
      this.evIndex++;
      const pat = this.score[this.patternIndex].score;
      if (this.evIndex >= pat.length) {
        this.evIndex = 0;
        // apply a queued re-sync (tap / nudge) exactly at the loop boundary
        if (this.pending) {
          this.setBpm(this.pending.bpm);
          this.anchor = this.pending.anchor;
          this.pending = null;
          this.nextTime = this._nextGrid(this.nextTime);
          if (this.h.onBpm) this.h.onBpm(Math.round(this.bpm));
          if (this.h.onResync) this.h.onResync(false);
        }
        const boundary = this.nextTime;
        if (this.advanceQueued && this.patternIndex < this.score.length - 1) {
          this.patternIndex++;
          this.advanceQueued = false;
          const newIdx = this.patternIndex;
          const delay = Math.max(0, (boundary - Tone.now()) * 1000);
          setTimeout(() => {
            if (this.h.onPattern) this.h.onPattern(newIdx);
            if (this.h.onQueue) this.h.onQueue(false);
          }, delay);
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // PulseEngine — steady high-C eighth-note pulse for the Pulse view.
  // ---------------------------------------------------------------------------
  class PulseEngine {
    constructor(handlers) {
      this.h = handlers || {};
      this.bpm = 120;
      this.note = "C7";
      this.playing = false;
      this.nextTime = 0;
      this.timer = null;
      this.synth = null;
    }
    setBpm(b) { this.bpm = Math.min(400, Math.max(20, b)); }

    async start() {
      await ensureStarted();
      if (!this.synth) {
        this.synth = new Tone.Synth({
          oscillator: { type: "triangle" },
          envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 },
        });
        const g = new Tone.Gain(0.5); this.synth.connect(g); g.toDestination();
      }
      if (this.playing) return;
      this.playing = true;
      this.nextTime = Tone.now() + 0.1;
      this.timer = setInterval(() => this._tick(), 25);
      if (this.h.onState) this.h.onState(true);
    }
    pause() {
      this.playing = false;
      if (this.timer) { clearInterval(this.timer); this.timer = null; }
      if (this.h.onState) this.h.onState(false);
    }
    toggle() { return this.playing ? (this.pause(), false) : (this.start(), true); }

    _tick() {
      if (!this.playing) return;
      const horizon = Tone.now() + 0.12;
      const eighth = 60 / this.bpm;
      let guard = 0;
      while (this.nextTime < horizon && guard++ < 100) {
        this.synth.triggerAttackRelease(this.note, 0.05, this.nextTime, 0.9);
        if (this.h.onBeat) {
          const delay = Math.max(0, (this.nextTime - Tone.now()) * 1000);
          setTimeout(() => { if (this.playing && this.h.onBeat) this.h.onBeat(); }, delay);
        }
        this.nextTime += eighth;
      }
    }
  }

  window.InCAudio = {
    PatternPlayer,
    PulseEngine,
    VOICE_LIST,
    ensureStarted,
  };
})();
