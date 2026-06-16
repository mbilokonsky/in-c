# In C — a collective performance tool

A static web app for an in-person, collective performance of Terry Riley's *In C* (1964).
People with instruments read a projected score and follow a shared pulse; everyone else turns
their phone into a self-playing instrument. No accounts, no server, no build step — just static
files you can host on GitHub Pages.

## The three views

| Page | Who | What |
|------|-----|------|
| [`index.html`](index.html) | everyone | Explains the tool and reproduces Terry Riley's full performing directions. |
| [`pulse.html`](pulse.html) | **project this** | The steady high-C eighth-note **pulse** (the shared clock) plus all **53 patterns** rendered large on one screen — the score the live instrumentalists read. A "Notation size" slider scales it for the projector. |
| [`player.html`](player.html) | **phones** | The phone-as-instrument. Pick a voice, press Play, and it loops the current pattern. *Advance* switches to the next pattern at the end of the loop. *Tap pulse* locks your phone to the room. |

## How a performance runs

1. Open **Pulse & Score** on the projected screen, set a BPM, press **Start pulse**.
2. Everyone opens **Player** on their phone, picks an instrument, sets the **same BPM**, presses **Play**.
3. Players tap **Tap pulse** along with the room so their loop downbeat locks to everyone else.
4. Each player stays on a pattern for a while (~45 s–1.5 min) then presses **Advance** when ready —
   it changes at the end of the current loop. Stay within 2–3 patterns of each other.
5. When everyone reaches **pattern 53**, hold it, swell up and down together, and drop out one by one.

## Timebase

`BPM` is the **eighth-note pulse rate** (pulses per minute) — the rate of the high-C clicks. One
score "duration" unit is one eighth note (`60 / BPM` seconds). Pulse and players share this one
clock, so matching BPM keeps the room aligned. *In C* is meant to drift, so tight network sync is
deliberately not used — tapping is the alignment tool.

## Tech / offline

- **Audio:** [Tone.js](https://tonejs.github.io/) — pure synthesis voices (no audio samples to
  download), instantiated lazily on selection.
- **Notation:** [VexFlow](https://www.vexflow.com/) — vector notation rendered from the score data,
  so it stays crisp at any size and always matches the audio.
- Both libraries are **bundled locally** in `vendor/`, so the tool runs with no internet once the
  page has loaded (the venue has poor wifi).
- Phone browsers require a tap before they play audio — that's what the Play button is for. The
  Player also requests a screen wake-lock while playing, where supported.

## Score data — with thanks to teropa

`js/score-data.js` holds all 53 patterns (pitch, duration in eighth-note units, dynamics, grace
notes, rests) and is the single source of truth for both notation and audio.

That transcription comes directly from **Tero Parviainen's** ([teropa](https://teropa.info/))
open-source [`teropa/in-c`](https://github.com/teropa/in-c) project — this tool leans heavily on his
careful work, and it would have been far harder and less trustworthy to build without it. Go enjoy his
own interactive realization and his [write-up on the
piece](https://teropa.info/blog/2017/01/23/terry-rileys-in-c.html). We cross-checked the data against
the published Celestial Harmonies score.

## Deploy to GitHub Pages

Push to a GitHub repo, then in **Settings → Pages** set the source to the `main` branch, root
folder. It's plain static files (a `.nojekyll` file is included), so no build is required.

To preview locally:

```sh
python3 -m http.server 8099
# then open http://localhost:8099/
```

## Credits

- Music: Terry Riley, *In C* (1964).
- Pattern transcription: **Tero Parviainen / [teropa/in-c](https://github.com/teropa/in-c)** — thank you.
- Built with [Tone.js](https://tonejs.github.io/) and [VexFlow](https://www.vexflow.com/).
