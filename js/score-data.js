/*
 * In C — Terry Riley (1964). The 53 melodic patterns.
 * Transcription source: teropa/in-c (github.com/teropa/in-c) score.json,
 * cross-checked against the published Celestial Harmonies score.
 *
 * Each event: { note?, duration, velocity?, gracenote?, rest? }
 *   - duration is in EIGHTH-NOTE units (2 = quarter, 1 = eighth, 0 = grace, 8 = whole, 12 = dotted whole)
 *   - rest: true means a silence of the given duration (no note)
 *   - gracenote: true is a crushed acciaccatura before the following note (duration 0)
 *   - velocity: "low" | "medium" | "high" (used for audio dynamics)
 */
window.IN_C_SCORE = [
  {
    "number": 1,
    "changeHue": false,
    "score": [
      {
        "duration": 0,
        "note": "C4",
        "velocity": "low",
        "gracenote": true
      },
      {
        "duration": 2,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 0,
        "note": "C4",
        "velocity": "low",
        "gracenote": true
      },
      {
        "duration": 2,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 0,
        "note": "C4",
        "velocity": "low",
        "gracenote": true
      },
      {
        "duration": 2,
        "note": "E4",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 2,
    "changeHue": false,
    "score": [
      {
        "duration": 0,
        "note": "C4",
        "velocity": "low",
        "gracenote": true
      },
      {
        "duration": 1,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 1,
        "note": "F4",
        "velocity": "low"
      },
      {
        "duration": 2,
        "note": "E4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 3,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 1,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "F4",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "E4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 4,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 1,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "F4",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 5,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 1,
        "note": "F4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "rest": true
      }
    ]
  },
  {
    "number": 6,
    "changeHue": true,
    "score": [
      {
        "duration": 8,
        "note": "C5",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "C5",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 7,
    "changeHue": false,
    "score": [
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 0.5,
        "note": "C4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "C4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "C4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      }
    ]
  },
  {
    "number": 8,
    "changeHue": false,
    "score": [
      {
        "duration": 12,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "F4",
        "velocity": "medium"
      },
      {
        "duration": 8,
        "note": "F4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 9,
    "changeHue": true,
    "score": [
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      }
    ]
  },
  {
    "number": 10,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 11,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 12,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 8,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 2,
        "note": "C5",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 13,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 1.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 1.5,
        "rest": true
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 6,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 14,
    "changeHue": true,
    "score": [
      {
        "duration": 8,
        "note": "C5",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 8,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 8,
        "note": "F#4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 15,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 1.5,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      }
    ]
  },
  {
    "number": 16,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "C5",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 17,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "C5",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "C5",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "rest": true
      }
    ]
  },
  {
    "number": 18,
    "changeHue": true,
    "score": [
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 1.5,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 19,
    "changeHue": false,
    "score": [
      {
        "duration": 3,
        "rest": true
      },
      {
        "duration": 3,
        "note": "G5",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 20,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 1.5,
        "note": "G3",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 21,
    "changeHue": false,
    "score": [
      {
        "duration": 6,
        "note": "F#4",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 22,
    "changeHue": true,
    "score": [
      {
        "duration": 3,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 3,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "B4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 23,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 3,
        "note": "F#4",
        "velocity": "high"
      },
      {
        "duration": 3,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "medium"
      },
      {
        "duration": 2,
        "note": "B4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 24,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "B4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 25,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "high"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "A4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "B4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 26,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "A4",
        "velocity": "low"
      },
      {
        "duration": 3,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 3,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "B4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 27,
    "changeHue": true,
    "score": [
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 28,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F#4",
        "velocity": "low"
      },
      {
        "duration": 1.5,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "E4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 29,
    "changeHue": true,
    "score": [
      {
        "duration": 6,
        "note": "E4",
        "velocity": "high"
      },
      {
        "duration": 6,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 6,
        "note": "C5",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 30,
    "changeHue": false,
    "score": [
      {
        "duration": 12,
        "note": "C5",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 31,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 32,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "low"
      },
      {
        "duration": 6,
        "note": "F4",
        "velocity": "medium"
      },
      {
        "duration": 3,
        "note": "G4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 33,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "rest": true
      }
    ]
  },
  {
    "number": 34,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 35,
    "changeHue": true,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "note": "Bb4",
        "velocity": "high"
      },
      {
        "duration": 6,
        "note": "G5",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "A5",
        "velocity": "high"
      },
      {
        "duration": 1,
        "note": "G5",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "G5",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "B5",
        "velocity": "low"
      },
      {
        "duration": 3,
        "note": "A5",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "G5",
        "velocity": "low"
      },
      {
        "duration": 6,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "G5",
        "velocity": "high"
      },
      {
        "duration": 1,
        "note": "F#5",
        "velocity": "low"
      },
      {
        "duration": 6,
        "note": "F#5",
        "velocity": "low"
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 2,
        "rest": true
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 1,
        "note": "E5",
        "velocity": "low"
      },
      {
        "duration": 4,
        "note": "E5",
        "velocity": "high"
      },
      {
        "duration": 12,
        "note": "F5",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 36,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 37,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 38,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 39,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "C5",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 40,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 41,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 42,
    "changeHue": true,
    "score": [
      {
        "duration": 8,
        "note": "C5",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "B4",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "A4",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "C5",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 43,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F5",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "E5",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "F5",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "E5",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "E5",
        "velocity": "high"
      },
      {
        "duration": 1,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F5",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "E5",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 44,
    "changeHue": false,
    "score": [
      {
        "duration": 1,
        "note": "F5",
        "velocity": "high"
      },
      {
        "duration": 1,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 2,
        "note": "C5",
        "velocity": "high"
      }
    ]
  },
  {
    "number": 45,
    "changeHue": false,
    "score": [
      {
        "duration": 2,
        "note": "D5",
        "velocity": "high"
      },
      {
        "duration": 2,
        "note": "D5",
        "velocity": "medium"
      },
      {
        "duration": 2,
        "note": "G4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 46,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "D5",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "D5",
        "velocity": "low"
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 1,
        "rest": true
      },
      {
        "duration": 1,
        "note": "G4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "D5",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "E5",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "D5",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 47,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "D5",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "E5",
        "velocity": "low"
      },
      {
        "duration": 1,
        "note": "D5",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 48,
    "changeHue": false,
    "score": [
      {
        "duration": 12,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 8,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 2,
        "note": "F4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 49,
    "changeHue": true,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "Bb4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "Bb4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 50,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 51,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "Bb4",
        "velocity": "medium"
      },
      {
        "duration": 0.5,
        "note": "F4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      },
      {
        "duration": 0.5,
        "note": "Bb4",
        "velocity": "medium"
      }
    ]
  },
  {
    "number": 52,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "Bb4",
        "velocity": "low"
      }
    ]
  },
  {
    "number": 53,
    "changeHue": false,
    "score": [
      {
        "duration": 0.5,
        "note": "Bb4",
        "velocity": "high"
      },
      {
        "duration": 0.5,
        "note": "G4",
        "velocity": "low"
      }
    ]
  }
];
