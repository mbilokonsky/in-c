/* player.js — Player view: the phone-as-instrument. Loops the current pattern,
 * queues an advance for the end of the loop, taps to sync, picks a voice. */
(function () {
  const el = {
    pos: document.getElementById("pos"),
    num: document.getElementById("num"),
    stage: document.getElementById("stage"),
    queued: document.getElementById("queued"),
    endnote: document.getElementById("endnote"),
    dot: document.getElementById("dot"),
    voice: document.getElementById("voice"),
    bpm: document.getElementById("bpm"),
    play: document.getElementById("play"),
    tap: document.getElementById("tap"),
    advance: document.getElementById("advance"),
    back: document.getElementById("back"),
    nudgeBack: document.getElementById("nudgeBack"),
    nudgeFwd: document.getElementById("nudgeFwd"),
    syncStatus: document.getElementById("syncStatus"),
  };

  let noteEls = [];
  let lastEl = null;

  // populate instruments
  InCAudio.VOICE_LIST.forEach(([id, name]) => {
    const o = document.createElement("option");
    o.value = id; o.textContent = name;
    el.voice.appendChild(o);
  });
  el.voice.value = "marimba";

  function renderCurrent(i) {
    const p = IN_C_SCORE[i];
    el.pos.textContent = i + 1;
    el.num.textContent = i + 1;
    const r = Notation.renderPattern(el.stage, p.score, { scale: 1.35 });
    noteEls = r.noteEls || [];
    lastEl = null;
    el.endnote.classList.toggle("show", i === IN_C_SCORE.length - 1);
    el.advance.disabled = i >= IN_C_SCORE.length - 1;
    el.back.disabled = i <= 0;
  }

  function highlight(idx) {
    if (lastEl) lastEl.classList.remove("active");
    const g = noteEls[idx];
    if (g) { g.classList.add("active"); lastEl = g; }
    el.dot.classList.add("on");
    setTimeout(() => el.dot.classList.remove("on"), 90);
  }

  const player = new InCAudio.PatternPlayer(IN_C_SCORE, {
    onPattern(i) { renderCurrent(i); },
    onNote(idx) { highlight(idx); },
    onQueue(q) { el.queued.classList.toggle("show", q); },
    onState(playing) {
      el.play.textContent = playing ? "❚❚ Pause" : "▶ Play";
      el.play.classList.toggle("go", !playing);
    },
    onBpm(b) { el.bpm.value = b; },
    onResync(queued) {
      el.syncStatus.className = "note" + (queued ? " queued-resync" : "");
      el.syncStatus.textContent = queued ? "↻ re-syncing at end of loop" : "";
    },
  });

  // initial paint
  renderCurrent(0);

  el.play.addEventListener("click", async () => {
    player.setBpm(parseFloat(el.bpm.value) || 120);
    await player.toggle();
  });
  el.advance.addEventListener("click", () => {
    if (player.advanceQueued) player.cancelAdvance();
    else player.queueAdvance();
  });
  el.back.addEventListener("click", () => player.goToPattern(player.patternIndex - 1));
  el.tap.addEventListener("click", () => player.tap());
  el.nudgeBack.addEventListener("click", () => player.nudge(-1));
  el.nudgeFwd.addEventListener("click", () => player.nudge(1));
  el.voice.addEventListener("change", () => player.setVoice(el.voice.value));
  el.bpm.addEventListener("change", () => {
    player.setBpm(parseFloat(el.bpm.value) || 120);
    el.bpm.value = Math.round(player.bpm);
  });
  el.bpm.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });

  // keep the screen awake during a performance, if supported
  let wakeLock = null;
  async function requestWake() {
    try { if ("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen"); } catch (e) {}
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && player.playing) {
      requestWake();
      // the audio clock pauses while hidden, so phase may have drifted — nudge a re-tap
      el.syncStatus.className = "note wake";
      el.syncStatus.textContent = "⚠ phone slept — tap pulse to re-sync";
      setTimeout(() => {
        if (el.syncStatus.classList.contains("wake")) {
          el.syncStatus.className = "note"; el.syncStatus.textContent = "";
        }
      }, 6000);
    }
  });
  el.play.addEventListener("click", requestWake, { once: false });
})();
