/* pulse.js — Pulse & Score view: steady high-C pulse + all 53 patterns rendered. */
(function () {
  const playBtn = document.getElementById("play");
  const bpmInput = document.getElementById("bpm");
  const rate = document.getElementById("rate");
  const dot = document.getElementById("dot");
  const grid = document.getElementById("grid");
  const size = document.getElementById("size");

  const engine = new InCAudio.PulseEngine({
    onState(playing) {
      playBtn.textContent = playing ? "❚❚ Stop pulse" : "▶ Start pulse";
      playBtn.classList.toggle("go", !playing);
    },
    onBeat() {
      dot.classList.add("on");
      setTimeout(() => dot.classList.remove("on"), 70);
    },
  });

  function showRate() {
    const bpm = engine.bpm;
    rate.textContent = bpm + " bpm · " + (bpm / 60).toFixed(1) + " clicks/sec";
  }

  // Render all 53 patterns once (crisp vector; columns scale them for projection).
  IN_C_SCORE.forEach((p) => {
    const cell = document.createElement("div");
    cell.className = "cell" + (p.changeHue ? " hue" : "");
    const num = document.createElement("div");
    num.className = "num";
    num.textContent = p.number;
    cell.appendChild(num);
    const holder = document.createElement("div");
    holder.style.paddingTop = "16px";
    cell.appendChild(holder);
    grid.appendChild(cell);
    Notation.renderPattern(holder, p.score, { scale: 1.0 });
  });

  size.addEventListener("input", () => {
    grid.style.setProperty("--cell-min", size.value + "px");
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
