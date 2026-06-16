/* pulse.js — Pulse & Score view: steady high-C pulse + all 53 patterns rendered. */
(function () {
  const playBtn = document.getElementById("play");
  const bpmInput = document.getElementById("bpm");
  const rate = document.getElementById("rate");
  const orb = document.getElementById("orb");
  const grid = document.getElementById("grid");
  const size = document.getElementById("size");
  const fitBtn = document.getElementById("fit");
  const scoreArea = document.querySelector(".score-area");

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
  // Fit the entire 53-pattern score into the projected screen by binary-searching
  // the largest notation scale whose flowed layout still fits the available height.
  let autofit = true;
  function fitToScreen() {
    autofit = true;
    grid.classList.remove("fill"); // measure natural content height, not the stretched grid
    const avail = scoreArea.clientHeight - 6;
    const min = parseFloat(size.min);
    const fits = (s) => { renderAll(s); return grid.scrollHeight <= avail; };
    // Layout height is a step function of scale (wrapping changes column count), so
    // binary search can land in a valley. Scan downward and take the LARGEST scale
    // that fits, then fine-refine upward.
    let best = min;
    let coarse = null;
    for (let s = 1.4; s >= min - 1e-9; s -= 0.1) {
      if (fits(Math.max(min, s))) { coarse = Math.max(min, s); break; }
    }
    if (coarse != null) {
      best = coarse;
      for (let s = coarse + 0.03; s <= coarse + 0.1 + 1e-9; s += 0.03) {
        if (fits(s)) best = s; else break;
      }
    }
    renderAll(best);
    grid.classList.add("fill"); // spread rows to fill the full height
    size.value = best.toFixed(2);
  }

  let rafPending = false;
  size.addEventListener("input", () => {
    autofit = false; // manual override — natural height, may scroll
    grid.classList.remove("fill");
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { rafPending = false; renderAll(parseFloat(size.value)); });
  });
  fitBtn.addEventListener("click", fitToScreen);

  let resizeT = null;
  window.addEventListener("resize", () => {
    if (!autofit) return;
    clearTimeout(resizeT);
    resizeT = setTimeout(fitToScreen, 250);
  });

  fitToScreen();

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
