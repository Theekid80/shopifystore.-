/* ==========================================================================
   WEDRA theme JavaScript — no dependencies.
   Cart operations use Shopify's Cart AJAX API (/cart/add.js, /cart/change.js)
   and re-render the drawer with the Section Rendering API, so the cart is
   always Shopify's real cart.
   ========================================================================== */
(() => {
  "use strict";

  const theme = window.theme || { routes: { cart: "/cart", cartAdd: "/cart/add", cartChange: "/cart/change", root: "/" }, strings: {} };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Money ---------- */
  function formatMoney(cents, format = theme.moneyFormat || "${{amount}}") {
    if (typeof cents === "string") cents = cents.replace(".", "");
    const value = Number(cents) || 0;
    const fmt = (n, decimals, thousands = ",", decimal = ".") => {
      const fixed = (n / 100).toFixed(decimals);
      const [int, frac] = fixed.split(".");
      return int.replace(/\B(?=(\d{3})+(?!\d))/g, thousands) + (frac ? decimal + frac : "");
    };
    return format.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => {
      switch (key) {
        case "amount_no_decimals": return fmt(value, 0);
        case "amount_with_comma_separator": return fmt(value, 2, ".", ",");
        case "amount_no_decimals_with_comma_separator": return fmt(value, 0, ".", ",");
        case "amount_with_apostrophe_separator": return fmt(value, 2, "'", ".");
        default: return fmt(value, 2);
      }
    });
  }
  theme.formatMoney = formatMoney;

  /* ---------- Analytics (custom events for Shopify Customer Events) ---------- */
  function publish(name, data) {
    try { window.Shopify?.analytics?.publish?.(name, data || {}); } catch (_) { /* no-op */ }
  }

  /* ---------- Scroll lock ---------- */
  let locks = 0;
  const lockScroll = () => { locks++; document.documentElement.classList.add("scroll-lock"); };
  const unlockScroll = () => { locks = Math.max(0, locks - 1); if (!locks) document.documentElement.classList.remove("scroll-lock"); };

  /* ---------- Drawers (native <dialog>) ---------- */
  const Drawer = {
    open(dialog, opener) {
      if (!dialog || dialog.open) return;
      dialog._opener = opener || document.activeElement;
      dialog.showModal();
      lockScroll();
      requestAnimationFrame(() => dialog.classList.add("is-open"));
      $$(`[aria-controls="${dialog.id}"]`).forEach((b) => b.setAttribute("aria-expanded", "true"));
    },
    close(dialog) {
      if (!dialog || !dialog.open || dialog._closing) return;
      dialog._closing = true;
      dialog.classList.remove("is-open");
      $$(`[aria-controls="${dialog.id}"]`).forEach((b) => b.setAttribute("aria-expanded", "false"));
      setTimeout(() => {
        dialog.close();
        dialog._closing = false;
        unlockScroll();
        dialog._opener?.focus?.({ preventScroll: true });
      }, 420);
    },
  };
  theme.Drawer = Drawer;

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-drawer-open]");
    if (opener) {
      const dialog = document.getElementById(opener.dataset.drawerOpen);
      if (dialog) { e.preventDefault(); Drawer.open(dialog, opener); }
      return;
    }
    const closer = e.target.closest("[data-drawer-close]");
    if (closer) { Drawer.close(closer.closest("dialog")); return; }
    if (e.target.matches("dialog.drawer")) Drawer.close(e.target);
  });
  document.addEventListener("cancel", (e) => {
    if (e.target.matches("dialog.drawer")) { e.preventDefault(); Drawer.close(e.target); }
  }, true);
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = $$("dialog.drawer[open]").pop();
    if (open) { e.preventDefault(); Drawer.close(open); }
  });
  // Links inside the mobile menu: close first so anchors land correctly.
  document.addEventListener("click", (e) => {
    const link = e.target.closest("#MenuDrawer a[href]");
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.pathname === location.pathname && url.hash) {
      e.preventDefault();
      Drawer.close($("#MenuDrawer"));
      setTimeout(() => { document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" }); history.pushState(null, "", url.hash); }, 440);
    }
  });

  /* ---------- Header ---------- */
  function initHeader() {
    const header = $("[data-header]");
    if (!header) return;
    const setHeight = () => document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    setHeight();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setHeight);
    if (header.classList.contains("header--overlay")) {
      // Only overlay the hero; if the first section isn't a hero, use the solid header.
      const first = $("#MainContent > .shopify-section");
      if (first && $(".hero", first)) document.body.classList.add("has-overlay-header");
      else header.classList.remove("header--overlay");
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal(root = document) {
    const els = $$(".reveal:not(.is-visible)", root);
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Cart ---------- */
  const Cart = {
    sectionIds() { return $("#CartDrawer") ? ["cart-drawer"] : []; },

    async request(url, body) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.status) {
        const err = new Error(data.description || data.message || theme.strings.cartError || "Something went wrong.");
        err.data = data;
        throw err;
      }
      return data;
    },

    async add(items, { open = true } = {}) {
      const sections = this.sectionIds();
      const data = await this.request(`${theme.routes.cartAdd}.js`, {
        items,
        ...(sections.length ? { sections, sections_url: location.pathname } : {}),
      });
      await this.refresh(data.sections);
      if (theme.cartType === "page" || !$("#CartDrawer")) { location.href = theme.routes.cart; return data; }
      if (open) Drawer.open($("#CartDrawer"));
      return data;
    },

    async change(line, quantity) {
      const sections = this.sectionIds();
      const onCartPage = !!$("[data-cart-page]");
      const data = await this.request(`${theme.routes.cartChange}.js`, {
        line,
        quantity,
        ...(sections.length ? { sections, sections_url: location.pathname } : {}),
      });
      if (onCartPage) { location.reload(); return data; }
      await this.refresh(data.sections);
      return data;
    },

    async refresh(sections) {
      if (sections && sections["cart-drawer"]) {
        const html = new DOMParser().parseFromString(sections["cart-drawer"], "text/html");
        const fresh = $("[data-cart-drawer-content]", html);
        const current = $("[data-cart-drawer-content]");
        if (fresh && current) {
          // Keep keyboard focus in place when the focused control is re-rendered.
          const focusable = (root) => $$("a[href], button:not([disabled]), input, select, textarea", root);
          const index = current.contains(document.activeElement) ? focusable(current).indexOf(document.activeElement) : -1;
          current.replaceWith(fresh);
          if (index > -1) {
            const items = focusable(fresh);
            const target = items[Math.min(index, items.length - 1)] || $("[data-drawer-close]", fresh.closest("dialog") || document);
            target?.focus({ preventScroll: true });
          }
        }
      }
      try {
        const cart = await (await fetch(`${theme.routes.cart}.js`, { headers: { Accept: "application/json" } })).json();
        $$("[data-cart-count]").forEach((el) => { el.textContent = cart.item_count > 0 ? cart.item_count : ""; });
        $$("[data-cart-count-label]").forEach((el) => { el.textContent = cart.item_count; });
      } catch (_) { /* count stays as rendered */ }
    },
  };
  theme.Cart = Cart;

  function showFormError(form, message) {
    const scope = form.closest(".card, .cart-upsell__item, [data-product-section]");
    const box = $("[data-form-error]", form) || (scope && $("[data-form-error]", scope));
    if (box) { box.textContent = message; box.hidden = false; }
  }

  // Product forms + quick add (Shopify `form 'product'` with data-product-form).
  document.addEventListener("submit", async (e) => {
    const form = e.target.closest("form[data-product-form]");
    if (!form) return;
    if (!window.fetch) return; // fall back to normal form post
    e.preventDefault();
    const button = $("[type=submit]", form);
    const box = $("[data-form-error]", form);
    if (box) box.hidden = true;
    const fd = new FormData(form);
    const id = Number(fd.get("id"));
    const quantity = Number(fd.get("quantity") || 1);
    const properties = {};
    for (const [k, v] of fd.entries()) { const m = k.match(/^properties\[(.+)\]$/); if (m) properties[m[1]] = v; }
    button?.setAttribute("aria-busy", "true");
    button?.classList.add("is-loading");
    try {
      await Cart.add([{ id, quantity, properties }]);
    } catch (err) {
      showFormError(form, err.message);
    } finally {
      button?.removeAttribute("aria-busy");
      button?.classList.remove("is-loading");
    }
  });

  // Quantity +/- and remove inside cart drawer / cart page.
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-cart-line-change]");
    if (!btn) return;
    e.preventDefault();
    const line = Number(btn.dataset.line);
    const qty = Number(btn.dataset.quantity);
    const container = btn.closest("[data-cart-item]") || btn;
    container.classList.add("is-loading");
    try { await Cart.change(line, qty); }
    catch (err) {
      container.classList.remove("is-loading");
      const box = $("[data-cart-error]");
      if (box) { box.textContent = err.message; box.hidden = false; }
    }
  });

  /* ---------- Quantity inputs (product forms) ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-qty-step]");
    if (!btn) return;
    const input = $("input", btn.closest(".quantity"));
    const min = Number(input.min || 1);
    const max = Number(input.max || 99);
    const next = Math.min(max, Math.max(min, Number(input.value || 1) + Number(btn.dataset.qtyStep)));
    input.value = next;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    const wrap = btn.closest(".quantity");
    $$("[data-qty-step]", wrap).forEach((b) => { b.disabled = (Number(b.dataset.qtyStep) < 0 && next <= min) || (Number(b.dataset.qtyStep) > 0 && next >= max); });
  });

  /* ---------- Gallery: swipe (phones), thumbnails (desktop), lightbox ---------- */
  const desktop = window.matchMedia("(min-width: 990px)");
  // Stop any product video that is no longer on screen.
  function pauseInactive(gallery) {
    $$(".gallery__slide:not(.is-active)", gallery).forEach((s) => {
      $$("video", s).forEach((v) => v.pause());
      $$("iframe", s).forEach((f) => {
        try {
          f.contentWindow.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: "" }), "*");
          f.contentWindow.postMessage(JSON.stringify({ method: "pause" }), "*");
        } catch (_) {}
      });
    });
  }
  function showSlide(gallery, mediaId) {
    if (!gallery) return;
    const slides = $$(".gallery__slide", gallery);
    const target = slides.find((s) => s.dataset.mediaId === String(mediaId));
    if (!target) return;
    slides.forEach((s) => s.classList.toggle("is-active", s === target));
    $$(".gallery__thumb", gallery).forEach((t) => t.setAttribute("aria-current", String(t.dataset.target === String(mediaId))));
    const track = $("[data-gallery-track]", gallery);
    if (track && !desktop.matches) track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
    const idx = $("[data-gallery-index]", gallery);
    if (idx) idx.textContent = Number(target.dataset.index) + 1;
    pauseInactive(gallery);
  }
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery__thumb");
    if (thumb) { showSlide(thumb.closest("[data-gallery]"), thumb.dataset.target); return; }
    const zoom = e.target.closest("[data-zoom]");
    if (zoom) {
      const gallery = zoom.closest("[data-gallery]");
      const box = document.getElementById(gallery?.dataset.lightbox);
      if (!box) return;
      Drawer.open(box, zoom);
      const slide = $(`.lightbox__slide[data-index="${zoom.dataset.zoom}"]`, box);
      requestAnimationFrame(() => slide?.scrollIntoView({ inline: "center", block: "nearest" }));
      return;
    }
    const step = e.target.closest("[data-lightbox-step]");
    if (step) {
      const track = $("[data-lightbox-track]", step.closest("dialog"));
      track?.scrollBy({ left: Number(step.dataset.lightboxStep) * track.clientWidth, behavior: "smooth" });
    }
  });
  document.addEventListener("keydown", (e) => {
    const box = $("dialog.lightbox[open]");
    if (!box || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
    const track = $("[data-lightbox-track]", box);
    track?.scrollBy({ left: (e.key === "ArrowRight" ? 1 : -1) * track.clientWidth, behavior: "smooth" });
  });
  function initGalleries(root = document) {
    $$("[data-gallery-track]", root).forEach((track) => {
      if (track._init) return;
      track._init = true;
      const gallery = track.closest("[data-gallery]");
      const idx = $("[data-gallery-index]", gallery);
      let t;
      track.addEventListener("scroll", () => {
        if (desktop.matches) return;
        clearTimeout(t);
        t = setTimeout(() => {
          const i = Math.round(track.scrollLeft / track.clientWidth);
          const slide = $$(".gallery__slide", track)[i];
          if (!slide) return;
          if (idx) idx.textContent = i + 1;
          $$(".gallery__slide", track).forEach((s) => s.classList.toggle("is-active", s === slide));
          $$(".gallery__thumb", gallery).forEach((th) => th.setAttribute("aria-current", String(th.dataset.target === slide.dataset.mediaId)));
          pauseInactive(gallery);
        }, 80);
      }, { passive: true });
      // Start the phone track on the selected variant's image.
      const active = $(".gallery__slide.is-active", track);
      if (active && !desktop.matches && active.dataset.index !== "0") track.scrollLeft = active.offsetLeft - track.offsetLeft;
    });
  }

  /* ---------- Silent video previews: muted, looped, only while on screen ---------- */
  function initSilentPreviews(root = document) {
    const vids = $$("video[data-silent-preview]", root);
    if (!vids.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ target: v, isIntersecting }) => {
        if (isIntersecting && !v._userPaused) { v.muted = v.muted || !v._userUnmuted; v.play().catch(() => {}); }
        else if (!isIntersecting) v.pause();
      });
    }, { threshold: 0.35 });
    vids.forEach((v) => {
      if (v._init) return;
      v._init = true;
      // Respect the customer's own pause/unmute from the native controls.
      v.addEventListener("pause", () => { if (document.visibilityState === "visible" && v.getBoundingClientRect().top < innerHeight && v.getBoundingClientRect().bottom > 0) v._userPaused = true; });
      v.addEventListener("play", () => { v._userPaused = false; });
      v.addEventListener("volumechange", () => { if (!v.muted) v._userUnmuted = true; });
      io.observe(v);
    });
  }
  initSilentPreviews();
  document.addEventListener("shopify:section:load", (e) => initSilentPreviews(e.target));

  /* ---------- Hero carousel: endless loop, one card per interval ---------- */
  function initHeroCarousels(root = document) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $$("[data-hero-carousel]", root).forEach((el) => {
      if (el._init) return;
      el._init = true;
      const track = $("[data-track]", el);
      const toggle = $("[data-toggle]", el);
      const mark = () => [...track.children].forEach((c, i) => c.classList.toggle("is-active", i === 0));
      mark();
      if (reduce || track.children.length < 2) { if (toggle) toggle.hidden = true; return; }

      const interval = Math.max(1000, Number(el.dataset.interval) || 1700);
      const slide = Math.min(700, interval * 0.45);
      let timer = null, hovered = false, userPaused = false, visible = true, busy = false;

      const step = () => {
        if (busy) return;
        const first = track.firstElementChild;
        const by = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
        busy = true;
        track.children[1].classList.add("is-active");
        first.classList.remove("is-active");
        track.style.transition = `transform ${slide}ms cubic-bezier(.2,.7,.2,1)`;
        track.style.transform = `translateX(${-by}px)`;
        setTimeout(() => {
          track.style.transition = "none";
          track.appendChild(first);
          track.style.transform = "none";
          busy = false;
        }, slide + 20);
      };
      const run = () => {
        clearInterval(timer); timer = null;
        if (!hovered && !userPaused && visible && document.visibilityState === "visible") timer = setInterval(step, interval);
      };

      el.addEventListener("mouseenter", () => { hovered = true; run(); });
      el.addEventListener("mouseleave", () => { hovered = false; run(); });
      el.addEventListener("focusin", () => { hovered = true; run(); });
      el.addEventListener("focusout", () => { hovered = false; run(); });
      document.addEventListener("visibilitychange", run);
      if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(el);
      if (toggle) toggle.addEventListener("click", () => {
        userPaused = !userPaused;
        toggle.setAttribute("aria-pressed", String(userPaused));
        $("[data-toggle-label]", toggle).textContent = userPaused ? "Play carousel" : "Pause carousel";
        run();
      });
      run();
    });
  }
  initHeroCarousels();
  document.addEventListener("shopify:section:load", (e) => initHeroCarousels(e.target));

  /* ---------- Variant picker ---------- */
  function initVariantPickers(root = document) {
    $$("[data-variant-picker]", root).forEach((picker) => {
      if (picker._init) return;
      picker._init = true;
      const section = picker.closest("[data-product-section]");
      const json = $("[data-product-json]", section);
      if (!json) return;
      const product = JSON.parse(json.textContent);
      picker.addEventListener("change", () => {
        const selected = $$("fieldset", picker).map((fs) => $("input:checked", fs)?.value);
        const variant = product.variants.find((v) => v.options.every((o, i) => o === selected[i]));
        $$("fieldset", picker).forEach((fs) => {
          const label = $("[data-selected-value]", fs);
          if (label) label.textContent = $("input:checked", fs)?.value || "";
        });
        updateVariant(section, product, variant);
      });
    });
  }

  function updateVariant(section, product, variant) {
    $$("form[data-product-form]", section).forEach((form) => {
      const input = $("input[name=id]", form);
      const button = $("[type=submit]", form);
      if (!input || !button) return;
      if (variant) input.value = variant.id;
      const available = !!variant && variant.available;
      button.disabled = !available;
      const label = $("[data-button-label]", button) || button;
      label.textContent = !variant ? theme.strings.unavailable : available ? theme.strings.addToCart : theme.strings.soldOut;
    });
    $$("[data-price]", section).forEach((el) => {
      if (!variant || variant.price == null) return;
      const cur = $("[data-price-current]", el);
      const cmp = $("[data-price-compare]", el);
      if (cur) cur.textContent = formatMoney(variant.price);
      if (cmp) {
        const show = variant.compare_at_price && variant.compare_at_price > variant.price;
        cmp.hidden = !show;
        if (show) $("s", cmp) ? ($("s", cmp).textContent = formatMoney(variant.compare_at_price)) : (cmp.textContent = formatMoney(variant.compare_at_price));
      }
    });
    if (variant) {
      const url = new URL(location.href);
      url.searchParams.set("variant", variant.id);
      history.replaceState(null, "", url);
      if (variant.featured_media) {
        const gallery = $("[data-gallery]", section);
        if (gallery) showSlide(gallery, variant.featured_media.id);
      }
    }
  }

  /* ---------- Sticky add to cart (mobile) ---------- */
  function initStickyAtc() {
    const bar = $("[data-sticky-atc]");
    const main = $("[data-main-buy]");
    if (!bar || !main) return;
    let mainVisible = true;
    let footerVisible = false;
    const update = () => {
      const show = !mainVisible && !footerVisible && !$("dialog.drawer[open]");
      bar.classList.toggle("is-visible", show);
      bar.toggleAttribute("inert", !show);
      bar.setAttribute("aria-hidden", String(!show));
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.target === main) mainVisible = en.isIntersecting || en.boundingClientRect.top > window.innerHeight;
        else footerVisible = en.isIntersecting;
      });
      update();
    });
    io.observe(main);
    const footer = $(".footer");
    if (footer) io.observe(footer);
    // For long product galleries on phones, show the bar from the start while the buy box is below the fold.
    if (bar.dataset.immediate === "true") {
      const check = () => { const r = main.getBoundingClientRect(); mainVisible = r.top < window.innerHeight && r.bottom > 0; update(); };
      window.addEventListener("scroll", check, { passive: true });
      check();
    }
    document.addEventListener("click", (e) => {
      if (!e.target.closest("[data-sticky-atc-submit]")) return;
      const form = $("form[data-product-form]", main.closest("[data-product-section]") || document);
      form?.requestSubmit();
    });
  }

  /* ---------- Related products (Shopify recommendations) ---------- */
  async function initRecommendations() {
    for (const el of $$("[data-recommendations]")) {
      try {
        const res = await fetch(el.dataset.url);
        const html = new DOMParser().parseFromString(await res.text(), "text/html");
        const fresh = $("[data-recommendations]", html);
        if (fresh && fresh.innerHTML.trim()) { el.innerHTML = fresh.innerHTML; initReveal(el); }
        else el.closest(".shopify-section")?.setAttribute("hidden", "");
      } catch (_) { el.closest(".shopify-section")?.setAttribute("hidden", ""); }
    }
  }

  /* ---------- Predictive search (Shopify Predictive Search API) ---------- */
  function initPredictiveSearch() {
    const form = $("[data-predictive-search]");
    const results = $("[data-predictive-results]");
    if (!form || !results) return;
    const input = $("input[name=q]", form);
    let controller;
    let timer;
    const render = async (q) => {
      controller?.abort();
      if (q.length < 2) { results.innerHTML = ""; input.setAttribute("aria-expanded", "false"); return; }
      controller = new AbortController();
      const url = `${form.dataset.url}?q=${encodeURIComponent(q)}&resources[type]=product,query&resources[limit]=8&resources[options][unavailable_products]=last&section_id=predictive-search`;
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(res.status);
        const html = new DOMParser().parseFromString(await res.text(), "text/html");
        const content = $("[data-predictive-content]", html);
        results.innerHTML = content ? content.outerHTML : "";
        input.setAttribute("aria-expanded", String(!!content));
      } catch (err) {
        if (err.name !== "AbortError") { results.innerHTML = ""; input.setAttribute("aria-expanded", "false"); }
      }
    };
    input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => render(input.value.trim()), 220); });
  }

  /* ---------- Parallax (hero & editorial images) ---------- */
  function initParallax() {
    const els = $$("[data-parallax]");
    if (!els.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const progress = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
        const img = el.querySelector("img");
        if (img) img.style.transform = `translate3d(0, ${(-progress * 10).toFixed(2)}%, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Collection filters ---------- */
  function initFacets() {
    $$("[data-sort-select]").forEach((select) => select.addEventListener("change", () => select.form.requestSubmit()));
    // Close other open filter panels when one opens.
    document.addEventListener("toggle", (e) => {
      if (!e.target.matches?.(".facet") || !e.target.open) return;
      $$(".facet[open]").forEach((d) => { if (d !== e.target) d.open = false; });
    }, true);
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".facet")) $$(".facet[open]").forEach((d) => { d.open = false; });
    });
  }

  /* ---------- Newsletter success → Lead event ---------- */
  function initNewsletter() {
    if ($("[data-newsletter-success]")) publish("wedra:lead", { source: "newsletter" });
  }

  /* ---------- Theme editor support ---------- */
  document.addEventListener("shopify:section:load", (e) => {
    initReveal(e.target);
    initVariantPickers(e.target);
    initGalleries(e.target);
    initHeader();
  });

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initReveal();
    initVariantPickers();
    initStickyAtc();
    initRecommendations();
    initGalleries();
    initPredictiveSearch();
    initParallax();
    initFacets();
    initNewsletter();
  });
})();
