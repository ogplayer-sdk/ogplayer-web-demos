// Shared demo helpers — page header + the green event log (mobile parity).
export function pageHeader(title, lede) {
  const h = document.createElement("div");
  h.innerHTML = `
    <header class="demo">
      <a class="back" href="./index.html">‹ Demos</a>
      <a class="home" href="https://ogplayer.tv" title="ogplayer.tv" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit">
        <svg width="24" height="24" viewBox="0 0 32 32"><path d="M12 3H29V20L20 29H3V12Z" fill="none" stroke="rgba(255,255,255,0.72)" stroke-width="2.6" stroke-linejoin="round"/><path d="M13 10L22.5 16L13 22Z" fill="#F6C445"/></svg>
        <span class="brand"><span class="og">OG</span>Player</span>
      </a>
      <span class="sub">web SDK demos</span>
    </header>
    <h1 class="page">${title}</h1>
    <p class="lede">${lede}</p>`;
  document.querySelector(".wrap").prepend(h);
}

export function makeLog(el) {
  // Mirror page errors into the log so "read the console" never needs
  // DevTools — whatever breaks shows up right here.
  if (!el.dataset.errhook) {
    el.dataset.errhook = "1";
    window.addEventListener("error", (e) =>
      appendLine(el, `console error: ${e.message}`));
    window.addEventListener("unhandledrejection", (e) =>
      appendLine(el, `console rejection: ${e.reason?.message ?? e.reason}`));
  }
  return (line) => appendLine(el, line);
}

function appendLine(el, line) {
  const t = new Date();
  const p2 = (n) => String(n).padStart(2, "0");
  el.textContent += `${p2(t.getHours())}:${p2(t.getMinutes())}:${p2(t.getSeconds())}.${String(t.getMilliseconds()).padStart(3, "0")}  ${line}\n`;
  el.scrollTop = el.scrollHeight;
}

export function attachEventLogging(player, log, { includeProgress = false } = {}) {
  player.addListener({
    onStateChanged: (s) => log(`onStateChanged: ${s}`),
    onPlay: () => log("onPlay"),
    onPause: () => log("onPause"),
    onResume: () => log("onResume"),
    onIsPlayingChanged: (p) => log(`onIsPlayingChanged: ${p}`),
    onSeekStarted: (f, to) => log(`onSeekStarted: ${Math.round(f / 1000)}s -> ${Math.round(to / 1000)}s`),
    onSeekCompleted: (p) => log(`onSeekCompleted: ${Math.round(p / 1000)}s`),
    onPlaybackCompleted: () => log("onPlaybackCompleted"),
    onLiveEdgeChanged: (e) => log(`onLiveEdgeChanged: ${e}`),
    onError: (e) => log(`onError: ${e.codeName} (${e.code}) ${e.message}`),
    ...(includeProgress ? { onProgress: (p, b, d) => log(`onProgress: ${Math.round(p / 1000)}/${Math.round(d / 1000)}s (buffered ${Math.round(b / 1000)}s)`) } : {}),
  });
  player.addAnalyticsListener((e) => {
    if (e.type === "QualitySnapshot") {
      log(`analytics: QualitySnapshot(positionMs=${e.positionMs}, bufferedMs=${e.bufferedMs}, bandwidthEstimateBps=${e.bandwidthEstimateBps}, droppedFramesTotal=${e.droppedFramesTotal})`);
    } else if (e.type === "BitrateChanged") {
      log(`analytics: BitrateChanged(bitrate=${e.bitrate}, width=${e.width}, height=${e.height}, frameRate=${e.frameRate})`);
    } else if (e.type === "Seek") {
      log(`analytics: Seek(fromMs=${e.fromMs}, toMs=${e.toMs})`);
    } else if (e.type === "Error") {
      log(`analytics: Error(${e.error.codeName})`);
    } else {
      log(`analytics: ${e.type}`);
    }
  });
}

export function attachAdEventLogging(player, log) {
  player.addAdListener({
    onAdBreakStarted: (t, n) => log(`onAdBreakStarted: ${t} (${n} ads)`),
    onAdStarted: (ad) => log(`onAdStarted: AdInfo(adId=${ad.adId}, pod=${ad.positionInPod}/${ad.podSize}, breakType=${ad.breakType}, skippable=${ad.isSkippable}, skipOffsetMs=${ad.skipOffsetMs}, durationMs=${ad.durationMs})`),
    onAdSkipped: (ad) => log(`onAdSkipped: ${ad.adId}`),
    onAdCompleted: (ad) => log(`onAdCompleted: ${ad.adId}`),
    onAdBreakCompleted: (t) => log(`onAdBreakCompleted: ${t}`),
    onAdPaused: (ad) => log(`onAdPaused: ${ad.adId}`),
    onAdResumed: (ad) => log(`onAdResumed: ${ad.adId}`),
    onAdError: (e) => log(`onAdError: OGAdError(code=${e.code}, phase=${e.phase}, message=${e.message})`),
  });
}

export const TOS = "https://media.ogplayer.tv/tos/master.m3u8";
export const TOS_SUBS = "https://media.ogplayer.tv/tos/master.m3u8";
export const FOOTER = 'Content: Tears of Steel — (CC) Blender Foundation · OGPlayer is a product of Inverse DOO';
