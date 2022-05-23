// Adds a mode toggle button, containing an SVG, to the HTML
const toggleButton = (function (window, document) {
  const name = "theme";
  const btnClass = "btn-" + name;
  const svgClass = btnClass + "__icon";
  const clickedClass = "js-clicked";
  const [light, dark] = ["light", "dark"];
  const body = document.body;
  const btn = document.createElement("button");

  let mode;

  const _setAttr = (obj, attr, value) => obj.setAttribute(attr, value);
  const _modeInvert = (mode) => (mode === "dark" ? light : dark);
  const _animEnd = (e) => btn.classList.remove(clickedClass);

  const _changeTheme = () => {
    mode = _modeInvert(mode);
    body.style.colorScheme = mode; // Ignored where unsupported
    _setAttr(body, "data-theme", mode);
    _setAttr(btn, "aria-label", `Change to ${_modeInvert(mode)} mode`);
    localStorage.setItem("theme", mode);
    btn.classList.add(clickedClass);
    btn.addEventListener("animationend", _animEnd, { once: true });
  };

  // Using symbol defs in the HTML
  // const _getSvg = () => `<svg class=${svgClass} aria-hidden=true>
  //   <use class="${name}-${dark}" xlink:href="#icon-${name}-${dark}"></use>
  //   <use class="${name}-${light}" xlink:href="#icon-${name}-${light}"></use>
  // </svg>`;

  // Using an embedded SVG
  const _getSvg =
    () => `<svg class="${svgClass}" aria-hidden=true viewbox="0 0 512 512">
    <g class="${name}-${dark}">
      <path d="M32 256C32 132.2 132.3 32 255.8 32c11.4 0 29.7 1.7 40.9 3.7 9.6 1.8 11.8 14.6 3.3 19.4-55 31.3-88.8 89.4-88.8 152.6 0 109.7 99.7 193 208.3 172.3 9.6-1.8 16.3 9.3 10.1 17-41.7 51.6-104.8 83-173.8 83C132.1 480 32 379.6 32 256z"/>
    </g>
    <g class="${name}-${light}">
      <path d="M256 405.3c10.3 0 18.7 8.4 18.7 18.7v37.3c0 10.3-8.4 18.7-18.7 18.7-10.3 0-18.7-8.4-18.7-18.7V424c0-10.3 8.4-18.7 18.7-18.7zM480 256c0 10.3-8.4 18.7-18.7 18.7H424c-10.3 0-18.7-8.4-18.7-18.7 0-10.3 8.4-18.7 18.7-18.7h37.3c10.3 0 18.7 8.4 18.7 18.7zM361.5 388l26.6 26.1c6.2 8.2 17.9 9.9 26.1 3.7 8.2-6.2 9.9-17.9 3.7-26.1-1.1-1.4-2.3-2.7-3.7-3.7L388 361.5c-7.3-7.3-19.3-7.3-26.6 0s-7.3 19.2.1 26.5zM124 414.2l26.6-26.1c7.3-7.3 7.3-19.3 0-26.6s-19.3-7.3-26.6 0L97.8 388c-8.2 6.2-9.9 17.9-3.7 26.1 6.2 8.2 17.9 9.9 26.1 3.7 1.4-1 2.7-2.2 3.8-3.6zM88 237.3c10.3 0 18.7 8.4 18.7 18.7 0 10.3-8.4 18.7-18.7 18.7H50.7c-10.3 0-18.7-8.4-18.7-18.7 0-10.3 8.4-18.7 18.7-18.7H88zM97.8 124l26.1 26.6c7.3 7.3 19.3 7.3 26.6 0s7.3-19.3 0-26.6L124 97.8c-6.2-8.2-17.9-9.9-26.1-3.7-8.2 6.2-9.9 17.9-3.7 26.1 1 1.4 2.2 2.7 3.6 3.8zM388 150.5l26.1-26.6c8.2-6.2 9.9-17.9 3.7-26.1s-17.9-9.9-26.1-3.7c-1.4 1.1-2.7 2.3-3.7 3.7L361.5 124c-7.3 7.3-7.3 19.3 0 26.6s19.2 7.3 26.5-.1zM237.3 50.7V88c0 10.3 8.4 18.7 18.7 18.7 10.3 0 18.7-8.4 18.7-18.7V50.7c0-10.3-8.4-18.7-18.7-18.7-10.3 0-18.7 8.4-18.7 18.7z"/>
      <circle cx="255.8" cy="256.2" r="112.9"/>
    </g>
  </svg>`;

  const _getInitialColorMode = () => {
    const persistedColorPreference = window.localStorage.getItem(name);

    if (persistedColorPreference) {
      return persistedColorPreference;
    }

    const prefersDarkScheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false;

    return prefersDarkScheme ? "dark" : "light";
  };

  const _init = () => {
    mode = _getInitialColorMode();

    // color-scheme cannot be set with CSS variable
    // Ignored where unsupported
    body.style.colorScheme = mode;

    _setAttr(body, "data-theme", mode);
    _setAttr(btn, "class", btnClass);
    _setAttr(btn, "role", "switch");
    _setAttr(btn, "aria-label", `Change to ${_modeInvert(mode)} mode`);

    btn.innerHTML = _getSvg();
    btn.addEventListener("click", _changeTheme);

    // Note: Button is added at the end of the HTML to avoid preceding an accessibility skip-to-content link.
    // Skip-to-content links should always be the first actionable asset on a web page.
    body.appendChild(btn);
  };

  _init();
})(window, document);
