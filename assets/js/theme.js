(() => {
  const KEY = "kevinylin-theme";
  const MODES = ["auto", "light", "dark"];
  const COLORS = { light: "#f7f7f4", dark: "#0d0d0b" };
  const root = document.documentElement;
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  const button = document.querySelector("[data-theme-toggle]");
  const label = document.querySelector("[data-theme-toggle-label]");
  const colorMeta = document.querySelector("meta[data-theme-color]");
  const isZh = document.documentElement.lang === "zh";

  const normalize = (mode) => (MODES.includes(mode) ? mode : "auto");
  const readStoredMode = () => {
    try {
      return localStorage.getItem(KEY);
    } catch (_) {
      return null;
    }
  };
  const writeStoredMode = (mode) => {
    try {
      if (mode === "auto") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (_) {}
  };
  const getMode = () => normalize(readStoredMode() || root.dataset.themeMode || "auto");
  const resolve = (mode) => (mode === "auto" ? (media?.matches ? "dark" : "light") : mode);

  const copy = {
    en: {
      auto: "Theme: system",
      light: "Theme: light",
      dark: "Theme: dark",
      labelAuto: "System",
      labelLight: "Light",
      labelDark: "Dark",
    },
    zh: {
      auto: "\u4e3b\u9898\uff1a\u8ddf\u968f\u7cfb\u7edf",
      light: "\u4e3b\u9898\uff1a\u6d45\u8272",
      dark: "\u4e3b\u9898\uff1a\u6697\u8272",
      labelAuto: "\u7cfb\u7edf",
      labelLight: "\u6d45\u8272",
      labelDark: "\u6697\u8272",
    },
  };

  const strings = isZh ? copy.zh : copy.en;

  const apply = (mode) => {
    const cleanMode = normalize(mode);
    const resolved = resolve(cleanMode);

    root.dataset.themeMode = cleanMode;
    if (cleanMode === "auto") root.removeAttribute("data-theme");
    else root.dataset.theme = cleanMode;

    root.style.colorScheme = resolved;
    root.style.backgroundColor = COLORS[resolved];
    if (colorMeta) colorMeta.setAttribute("content", COLORS[resolved]);

    if (button) {
      const title = strings[cleanMode];
      button.setAttribute("aria-label", title);
      button.setAttribute("title", title);
      button.dataset.resolvedTheme = resolved;
      button.dataset.themeState = cleanMode;
    }

    if (label) {
      label.textContent =
        cleanMode === "auto" ? strings.labelAuto : cleanMode === "light" ? strings.labelLight : strings.labelDark;
    }
  };

  const setMode = (mode) => {
    const cleanMode = normalize(mode);
    writeStoredMode(cleanMode);
    apply(cleanMode);
  };

  apply(getMode());

  button?.addEventListener("click", () => {
    const current = getMode();
    const next = current === "auto" ? "light" : current === "light" ? "dark" : "auto";
    setMode(next);
  });

  media?.addEventListener?.("change", () => {
    if (getMode() === "auto") apply("auto");
  });
})();
