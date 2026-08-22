# OGPlayer — web demos

Integration demos for the [OGPlayer](https://ogplayer.tv) web SDK: VOD,
live & DVR, multi-DRM, Google IMA ads, subtitles & audio tracks, content
ratings, watermarks, custom controls, custom error handling and more —
each demo is a single readable HTML page you can lift code from.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:8124. That's it — the SDK resolves from npm:

```js
import { OGPlayer } from "ogplayer";
```

Docs: https://ogplayer.tv/docs

## Notes

- **FreeWheel:** the demo is included. OGPlayer's FreeWheel provider ships
  in the `ogplayer` package, but FreeWheel's own `AdManager.js` is licensed
  to FreeWheel customers and loads from your FreeWheel-provided URL — the
  demo page shows setup steps until you fill in `demoFwConfig` in
  `freewheel.html`.
- **DRM:** the Widevine/FairPlay demo uses Axinom's public test vectors.
  Your browser needs EME support (any evergreen browser; Safari for
  FairPlay).
- **Licensing:** this demo code is MIT. The OGPlayer SDK itself is a
  commercial product — free to evaluate with a watermark; production use
  requires a license. See https://ogplayer.tv/terms/
- **Read-only repository:** issues and pull requests are closed —
  questions and reports are welcome at hello@ogplayer.tv.

Demo content: Tears of Steel — (CC) Blender Foundation · mango.blender.org
