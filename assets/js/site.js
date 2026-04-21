(() => {
  const doc = document;
  const root = doc.documentElement;
  const body = doc.body;
  const qs = (selector, scope = doc) => scope.querySelector(selector);
  const qsa = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));

  const isTypingTarget = (target) => {
    if (!target) return false;
    const tag = target.tagName;
    return target.isContentEditable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
  };

  const setScrolledState = () => {
    body.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const setupReadingProgress = () => {
    const article = qs(".post-single .post-content");
    if (!article) return;

    const progress = doc.createElement("div");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");
    body.appendChild(progress);

    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.transform = `scaleX(${pct})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  };

  const setupCommandPalette = () => {
    const shell = qs("[data-command-shell]");
    const openers = qsa("[data-command-open]");
    if (!shell || openers.length === 0) return;

    const input = qs("[data-command-input]", shell);
    const list = qs("[data-command-list]", shell);
    const items = qsa(".command-item", shell);
    let lastFocus = null;

    const setVisibleItems = () => {
      const query = (input?.value || "").trim().toLowerCase();
      let firstVisible = null;

      items.forEach((item) => {
        const haystack = `${item.textContent || ""} ${item.dataset.commandKeywords || ""}`.toLowerCase();
        const visible = !query || haystack.includes(query);
        item.hidden = !visible;
        if (visible && !firstVisible) firstVisible = item;
      });

      list?.classList.toggle("is-empty", !firstVisible);
    };

    const open = () => {
      lastFocus = doc.activeElement;
      shell.hidden = false;
      body.classList.add("command-open");
      input.value = "";
      setVisibleItems();
      requestAnimationFrame(() => input?.focus());
    };

    const close = () => {
      shell.hidden = true;
      body.classList.remove("command-open");
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    };

    const moveFocus = (direction) => {
      const visibleItems = items.filter((item) => !item.hidden);
      if (visibleItems.length === 0) return;
      const activeIndex = visibleItems.indexOf(doc.activeElement);
      const nextIndex = activeIndex === -1 ? 0 : (activeIndex + direction + visibleItems.length) % visibleItems.length;
      visibleItems[nextIndex].focus();
    };

    openers.forEach((button) => button.addEventListener("click", open));
    qsa("[data-command-close]", shell).forEach((node) => node.addEventListener("click", close));
    input?.addEventListener("input", setVisibleItems);

    shell.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveFocus(1);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveFocus(-1);
      }
      if (event.key === "Enter" && doc.activeElement === input) {
        const firstVisible = items.find((item) => !item.hidden);
        if (firstVisible) firstVisible.click();
      }
    });

    doc.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        shell.hidden ? open() : close();
      }
    });
  };

  const setupSearchShortcut = () => {
    doc.addEventListener("keydown", (event) => {
      if (event.key !== "/" || isTypingTarget(event.target)) return;
      const search = qs("#searchInput");
      if (!search) return;
      event.preventDefault();
      search.focus();
    });
  };

  const setupFilters = () => {
    qsa("[data-filter-scope]").forEach((scope) => {
      const buttons = qsa("[data-filter-value]", scope);
      const cards = qsa("[data-filterable]", scope);
      if (buttons.length === 0 || cards.length === 0) return;

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.dataset.filterValue;
          buttons.forEach((item) => item.classList.toggle("is-active", item === button));
          cards.forEach((card) => {
            const groups = (card.dataset.groups || "").split(/\s+/);
            const visible = value === "all" || groups.includes(value);
            card.hidden = !visible;
          });
        });
      });
    });
  };

  const copyText = async (text) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const input = doc.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    body.appendChild(input);
    input.select();
    const ok = doc.execCommand("copy");
    input.remove();
    return ok;
  };

  const setupArticleTools = () => {
    const copyButton = qs("[data-copy-link]");
    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        const label = qs("span", copyButton);
        const idle = copyButton.dataset.labelIdle || label?.textContent || "Copy link";
        const done = copyButton.dataset.labelDone || "Copied";
        try {
          await copyText(window.location.href);
          if (label) label.textContent = done;
          copyButton.classList.add("is-done");
          window.setTimeout(() => {
            if (label) label.textContent = idle;
            copyButton.classList.remove("is-done");
          }, 1400);
        } catch {
          if (label) label.textContent = idle;
        }
      });
    }

    const focusButton = qs("[data-reading-mode]");
    if (focusButton) {
      focusButton.addEventListener("click", () => {
        const enabled = body.classList.toggle("reading-mode");
        const label = qs("span", focusButton);
        const idle = focusButton.dataset.labelIdle || "Focus mode";
        const done = focusButton.dataset.labelDone || "Normal mode";
        if (label) label.textContent = enabled ? done : idle;
      });
    }

    const topButton = qs("[data-scroll-top]");
    topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const slugify = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const setupArticleOutline = () => {
    const outline = qs("[data-article-outline]");
    const content = qs(".post-single .post-content");
    const nav = outline ? qs("nav", outline) : null;
    if (!outline || !content || !nav) return;

    const headings = qsa("h2, h3", content).filter((heading) => heading.textContent.trim().length > 0);
    if (headings.length < 2) return;

    const used = new Set();
    headings.forEach((heading) => {
      if (!heading.id) {
        let id = slugify(heading.textContent || "section") || "section";
        let nextId = id;
        let index = 2;
        while (used.has(nextId) || doc.getElementById(nextId)) {
          nextId = `${id}-${index}`;
          index += 1;
        }
        heading.id = nextId;
      }
      used.add(heading.id);

      const link = doc.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = heading.tagName === "H3" ? "is-sub" : "";
      nav.appendChild(link);
    });

    outline.hidden = false;
  };

  const setupInternalLinkHints = () => {
    qsa("a[href^='/'], a[href^='./'], a[href^='../']").forEach((link) => {
      link.addEventListener(
        "pointerenter",
        () => {
          if (link.dataset.prefetched) return;
          link.dataset.prefetched = "true";
          const prefetch = doc.createElement("link");
          prefetch.rel = "prefetch";
          prefetch.href = link.href;
          doc.head.appendChild(prefetch);
        },
        { once: true }
      );
    });
  };

  const setupResearchVisual = () => {
    const canvas = qs("[data-research-visual]");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width || canvas.width));
      height = Math.max(1, Math.floor(rect.height || canvas.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawGrid = () => {
      context.strokeStyle = "rgba(220, 232, 232, 0.08)";
      context.lineWidth = 1;
      for (let x = 40; x < width; x += 52) {
        context.beginPath();
        context.moveTo(x, 32);
        context.lineTo(x, height - 32);
        context.stroke();
      }
      for (let y = 42; y < height; y += 52) {
        context.beginPath();
        context.moveTo(32, y);
        context.lineTo(width - 32, y);
        context.stroke();
      }
    };

    const drawLattice = () => {
      const cx = width * 0.33;
      const cy = height * 0.48;
      const step = Math.min(width, height) * 0.09;
      context.strokeStyle = "rgba(118, 199, 215, 0.34)";
      context.fillStyle = "rgba(118, 199, 215, 0.92)";
      context.lineWidth = 1.2;

      const points = [];
      for (let row = -2; row <= 2; row += 1) {
        for (let col = -2; col <= 2; col += 1) {
          const x = cx + (col + row * 0.5) * step;
          const y = cy + row * step * 0.86;
          points.push({ x, y });
        }
      }

      points.forEach((point, index) => {
        points.slice(index + 1).forEach((next) => {
          const distance = Math.hypot(point.x - next.x, point.y - next.y);
          if (distance < step * 1.08) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        });
      });

      points.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, 3.4, 0, Math.PI * 2);
        context.fill();
      });
    };

    const drawBands = () => {
      const left = width * 0.53;
      const right = width - 54;
      const mid = height * 0.5;
      const amp = height * 0.16;
      const phase = reduceMotion ? 0 : frame * 0.015;

      context.lineWidth = 2;
      ["rgba(159, 194, 133, 0.9)", "rgba(214, 165, 110, 0.8)"].forEach((color, band) => {
        context.strokeStyle = color;
        context.beginPath();
        for (let i = 0; i <= 120; i += 1) {
          const t = i / 120;
          const x = left + (right - left) * t;
          const gap = band === 0 ? -34 : 34;
          const y = mid + gap + Math.sin(t * Math.PI * 2 + phase) * amp * (0.25 + t * 0.35);
          if (i === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      });

      context.strokeStyle = "rgba(220, 232, 232, 0.18)";
      context.beginPath();
      context.moveTo(left, mid);
      context.lineTo(right, mid);
      context.stroke();

      context.fillStyle = "rgba(220, 232, 232, 0.62)";
      context.font = "12px system-ui, sans-serif";
      context.fillText("E", left - 18, 54);
      context.fillText("k", right - 8, mid + 26);
    };

    const drawSpectrum = () => {
      const left = 46;
      const bottom = height - 58;
      const widthSpan = width * 0.42;
      context.strokeStyle = "rgba(220, 232, 232, 0.18)";
      context.beginPath();
      context.moveTo(left, bottom);
      context.lineTo(left + widthSpan, bottom);
      context.stroke();

      context.strokeStyle = "rgba(118, 199, 215, 0.75)";
      context.lineWidth = 1.4;
      for (let i = 0; i < 11; i += 1) {
        const x = left + i * (widthSpan / 10);
        const peak = 28 + Math.sin(i * 1.7) * 12;
        context.beginPath();
        context.moveTo(x, bottom);
        context.lineTo(x, bottom - peak);
        context.stroke();
      }
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      drawGrid();
      drawLattice();
      drawBands();
      drawSpectrum();
      if (!reduceMotion) raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(raf);
      resize();
      draw();
    });
  };

  window.addEventListener("scroll", setScrolledState, { passive: true });
  setScrolledState();
  setupReadingProgress();
  setupCommandPalette();
  setupSearchShortcut();
  setupFilters();
  setupArticleTools();
  setupArticleOutline();
  setupInternalLinkHints();
  setupResearchVisual();
})();
