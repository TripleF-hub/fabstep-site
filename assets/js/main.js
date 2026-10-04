/* ==========================================================================
   FabStep — animations de la page (JavaScript facultatif, aucune dépendance)
   Sans JavaScript, la page reste complète : tout est visible, rien n'est caché.
   Si l'utilisateur a activé « Réduire les animations », on affiche l'état final.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Active les états « avant animation » définis dans le CSS (html.js …)
  root.classList.add("js");

  // Format des nombres selon la langue de la page (<html lang="fr"> ou "en")
  var locale = root.lang === "en" ? "en-US" : "fr-FR";

  /* ---------- 1. Compteurs qui défilent jusqu'à leur valeur ---------- */
  function format(value, decimals) {
    return value.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var duration = 1400;
    var start = null;

    function step(time) {
      if (start === null) start = time;
      var t = Math.min((time - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3); // départ rapide, arrivée douce
      el.textContent = format(target * eased, decimals);
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  // Les compteurs situés plus bas que l'écran partent de 0 (ceux déjà visibles gardent leur valeur)
  if (!reduced) {
    counters.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.textContent = format(0, parseInt(el.getAttribute("data-decimals") || "0", 10));
        el.setAttribute("data-pending", "");
      }
    });
  }

  /* ---------- 2. Apparition des blocs au défilement ---------- */
  var blocks = document.querySelectorAll("[data-reveal]");

  function reveal(el) {
    el.classList.add("is-in");
    Array.prototype.forEach.call(el.querySelectorAll("[data-count][data-pending]"), function (c) {
      c.removeAttribute("data-pending");
      countUp(c);
    });
  }

  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(blocks, reveal);
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    Array.prototype.forEach.call(blocks, function (el) {
      observer.observe(el);
    });
  }

  /* ---------- 3. Hero : les appareils s'inclinent en 3D avec la souris (ordinateur uniquement) ----------
     Toute la zone du hero réagit ; le reflet de l'écran s'allume pendant le survol. */
  var hero = document.querySelector(".hero");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hero && finePointer && !reduced) {
    var frame = null;
    hero.addEventListener("pointermove", function (event) {
      var box = hero.getBoundingClientRect();
      var x = (event.clientX - box.left) / box.width - 0.5;  // de -0,5 à 0,5
      var y = (event.clientY - box.top) / box.height - 0.5;
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(function () {
        // Modification via le CSSOM : autorisée par la politique de sécurité (CSP)
        hero.style.setProperty("--tx", x.toFixed(3));
        hero.style.setProperty("--ty", y.toFixed(3));
      });
    });
    hero.addEventListener("pointerenter", function () {
      hero.style.setProperty("--glare", "1");
    });
    hero.addEventListener("pointerleave", function () {
      hero.style.setProperty("--tx", "0");
      hero.style.setProperty("--ty", "0");
      hero.style.setProperty("--glare", "0");
    });
  }

  /* ---------- 4. Écrans de montre vivants : pas, cœur, chrono, distance, calories ----------
     Chaque valeur n'avance que lorsque sa montre est visible à l'écran. */
  var liveEls = Array.prototype.slice.call(document.querySelectorAll("[data-live]"));

  if (liveEls.length && !reduced && "IntersectionObserver" in window) {
    // Période de mise à jour de chaque type, en « tics » de 250 ms
    var every = { steps: 3, bpm: 8, chrono: 4, dist: 28, kcal: 12 };
    var values = new WeakMap();
    liveEls.forEach(function (el) {
      values.set(el, parseFloat(el.getAttribute("data-start")) || 0);
    });

    var screens = document.querySelectorAll(".watch-screen");
    var screenObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-live", entry.isIntersecting);
      });
    });
    Array.prototype.forEach.call(screens, function (el) {
      screenObserver.observe(el);
    });

    var render = {
      steps: function (v) { return format(v, 0); },
      bpm: function (v) { return format(v, 0); },
      chrono: function (v) { return Math.floor(v / 60) + ":" + String(v % 60).padStart(2, "0"); },
      dist: function (v) { return v.toFixed(2); }, // la montre affiche un point décimal
      kcal: function (v) { return format(v, 0); }
    };

    var next = {
      steps: function (v) { return v + (Math.random() < 0.3 ? 2 : 1); },
      bpm: function (v) { // petite variation réaliste, bornée entre 82 et 90
        var n = v + Math.round(Math.random() * 2 - 1);
        return Math.min(90, Math.max(82, n));
      },
      chrono: function (v) { return v + 1; },
      dist: function (v) { return Math.round((v + 0.01) * 100) / 100; },
      kcal: function (v) { return v + 1; }
    };

    var tick = 0;
    window.setInterval(function () {
      tick += 1;
      liveEls.forEach(function (el) {
        var type = el.getAttribute("data-live");
        if (!every[type] || tick % every[type] !== 0) return;
        if (!el.closest(".watch-screen.is-live")) return;
        var v = next[type](values.get(el));
        values.set(el, v);
        el.textContent = render[type](v);
      });
    }, 250);
  }

  /* ---------- 5. En-tête : fond plus marqué dès qu'on défile ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
