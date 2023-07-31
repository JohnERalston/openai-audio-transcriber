const path = "/assets/audio/";

export function copyToClipboard(
  title: string,
  fileName: string,
  transcript: string
) {
  const html = `
  <div class="with-audio">
  <audio data-title="${title}" controls preload="none">
        <source src="${path}${fileName}" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div data-transcript>${transcript}</div>
      </div>
  `.trim();
  window.navigator.clipboard.writeText(html);
}
