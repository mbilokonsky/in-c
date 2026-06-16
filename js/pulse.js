/* pulse.js — Pulse & Score view: steady high-C pulse + all 53 patterns rendered. */
(function () {
  const playBtn = document.getElementById("play");
  const bpmInput = document.getElementById("bpm");
  const rate = document.getElementById("rate");
  const orb = document.getElementById("orb");
  const grid = document.getElementById("grid");
  const size = document.getElementById("size");

  const engine = new InCAudio.PulseEngine({
    onState(playing) {
      playBtn.textContent = playing ? "❚❚ Stop pulse" : "▶ Start pulse";
      playBtn.classList.toggle("go", !playing);
      if (!playing) orb.classList.remove("flash");
    },
    onBeat() {
      orb.classList.add("flash");
      // keep the flash short so it reads as a distinct pulse even at fast tempo
      const ms = Math.min(120, (60000 / engine.bpm) * 0.45);
      setTimeout(() => orb.classList.remove("flash"), ms);
    },
  });

  function showRate() {
    const bpm = engine.bpm;
    rate.textContent = bpm + " bpm · " + (bpm / 60).toFixed(1) + " clicks/sec";
  }

  // Render all 53 patterns at the chosen scale. Each keeps its intrinsic,
  // beat-proportional width; the size slider re-renders larger for projection.
  function renderAll(scale) {
    grid.innerHTML = "";
    IN_C_SCORE.forEach((p) => {
      const cell = document.createElement("div");
      cell.className = "cell" + (p.changeHue ? " hue" : "");
      const num = document.createElement("div");
      num.className = "num";
      num.textContent = p.number;
      cell.appendChild(num);
      const holder = document.createElement("div");
      cell.appendChild(holder);
      grid.appendChild(cell);
      Notation.renderPattern(holder, p.score, { scale });
    });
  }
  renderAll(parseFloat(size.value));

  let rafPending = false;
  size.addEventListener("input", () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { rafPending = false; renderAll(parseFloat(size.value)); });
  });

  bpmInput.addEventListener("change", () => {
    engine.setBpm(parseFloat(bpmInput.value) || 120);
    bpmInput.value = Math.round(engine.bpm);
    showRate();
  });

  playBtn.addEventListener("click", async () => {
    engine.setBpm(parseFloat(bpmInput.value) || 120);
    await engine.toggle();
    showRate();
  });

  // don't let an accidental scroll change the projected tempo
  bpmInput.addEventListener("wheel", (e) => e.preventDefault(), { passive: false });

  showRate();
})();
