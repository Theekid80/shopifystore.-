/* ==========================================================================
   VELARA theme JavaScript — no dependencies.
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
    if (header.classList.contains("header--overlay")) document.body.classList.add("has-overlay-header");
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
    const box = $("[data-form-error]", form) || $("[data-form-error]", form.closest("[data-product-section]") || document);
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

  /* ---------- Gallery ---------- */
  function showSlide(gallery, mediaId) {
    const slides = $$("[data-media-id]", gallery).filter((el) => el.matches(".gallery__slide"));
    const target = slides.find((s) => s.dataset.mediaId === String(mediaId));
    if (!target) return;
    slides.forEach((s) => { s.hidden = s !== target; });
    $$(".gallery__thumb", gallery).forEach((t) => t.setAttribute("aria-current", String(t.dataset.target === String(mediaId))));
  }
  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".gallery__thumb");
    if (!thumb) return;
    showSlide(thumb.closest("[data-gallery]"), thumb.dataset.target);
  });

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

  /* ---------- Build your system ---------- */
  function initBuildYourSystem() {
    $$("[data-bys]").forEach((root) => {
      const inputs = $$("input[data-bys-item]", root);
      const totalEl = $("[data-bys-total]", root);
      const list = $("[data-bys-selected]", root);
      const addBtn = $("[data-bys-add]", root);
      const countEl = $("[data-bys-count]", root);
      const compareEl = $("[data-bys-compare]", root);
      const bundlePrice = Number(root.dataset.bundlePrice || 0);
      const error = $("[data-bys-error]", root);

      const update = () => {
        const chosen = inputs.filter((i) => i.checked);
        const total = chosen.reduce((sum, i) => sum + Number(i.dataset.price), 0);
        if (totalEl) totalEl.textContent = formatMoney(total);
        if (countEl) countEl.textContent = chosen.length;
        if (list) {
          list.innerHTML = "";
          chosen.forEach((i) => {
            const li = document.createElement("li");
            li.textContent = `${i.dataset.title} — ${formatMoney(i.dataset.price)}`;
            list.appendChild(li);
          });
        }
        if (addBtn) addBtn.disabled = chosen.length === 0;
        if (compareEl && bundlePrice) {
          const diff = total - bundlePrice;
          compareEl.textContent =
            chosen.length === 0 ? "" :
            diff > 0 ? root.dataset.msgMore.replace("[amount]", formatMoney(diff)) :
            diff < 0 ? root.dataset.msgLess.replace("[amount]", formatMoney(-diff)) : "";
        }
      };
      inputs.forEach((i) => i.addEventListener("change", update));
      update();

      addBtn?.addEventListener("click", async () => {
        const items = inputs.filter((i) => i.checked).map((i) => ({ id: Number(i.value), quantity: 1, properties: { _system: "Build your own" } }));
        if (!items.length) return;
        addBtn.classList.add("is-loading");
        if (error) error.hidden = true;
        try {
          await Cart.add(items);
          publish("velara:build_system_added", { item_count: items.length });
        } catch (err) {
          if (error) { error.textContent = err.message; error.hidden = false; }
        } finally { addBtn.classList.remove("is-loading"); }
      });
    });
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
    if ($("[data-newsletter-success]")) publish("velara:lead", { source: "newsletter" });
  }

  /* ---------- Theme editor support ---------- */
  document.addEventListener("shopify:section:load", (e) => {
    initReveal(e.target);
    initVariantPickers(e.target);
    initBuildYourSystem();
    initHeader();
  });

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initReveal();
    initVariantPickers();
    initStickyAtc();
    initRecommendations();
    initBuildYourSystem();
    initFacets();
    initNewsletter();
  });
})();
