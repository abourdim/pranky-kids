/*!
 * Workshop DIY Navigator
 * Prev/Next buttons + keyboard arrows
 * Works on file:// and GitHub Pages (no directory listing, no fetch)
 */
(() => {
  "use strict";

  const HOME = "workshop-diy-index.html";
  const PAGES = [
  "workshop-diy-100.html",
  "workshop-diy-advent.html",
  "workshop-diy-ambient-screen.html",
  "workshop-diy-app-demo-reel.html",
  "workshop-diy-app-match.html",
  "workshop-diy-app-store.html",
  "workshop-diy-arcade.html",
  "workshop-diy-awards.html",
  "workshop-diy-bingo.html",
  "workshop-diy-bio-gen.html",
  "workshop-diy-blueprints.html",
  "workshop-diy-boot-sequence.html",
  "workshop-diy-breaking-news.html",
  "workshop-diy-bug-or-feature.html",
  "workshop-diy-bugchelor.html",
  "workshop-diy-card-collection.html",
  "workshop-diy-cereal-box.html",
  "workshop-diy-classified-dossier.html",
  "workshop-diy-comic.html",
  "workshop-diy-compatibility.html",
  "workshop-diy-conspiracy.html",
  "workshop-diy-cookbook.html",
  "workshop-diy-court-trial.html",
  "workshop-diy-creepypasta.html",
  "workshop-diy-crossword.html",
  "workshop-diy-ctf-quiz.html",
  "workshop-diy-departures.html",
  "workshop-diy-detention.html",
  "workshop-diy-diary.html",
  "workshop-diy-discord-chat.html",
  "workshop-diy-dungeon.html",
  "workshop-diy-elevator-pitch.html",
  "workshop-diy-emergency-alert.html",
  "workshop-diy-escape-room.html",
  "workshop-diy-festival.html",
  "workshop-diy-forensic-report.html",
  "workshop-diy-fortune-cookie.html",
  "workshop-diy-gacha.html",
  "workshop-diy-genius-ideas-lab.html",
  "workshop-diy-genius-video-animation.html",
  "workshop-diy-genius-video.html",
  "workshop-diy-github-profile.html",
  "workshop-diy-hacker-news.html",
  "workshop-diy-hacker-presentation.html",
  "workshop-diy-hacker-terminal.html",
  "workshop-diy-haiku.html",
  "workshop-diy-horoscope.html",
  "workshop-diy-ikea-manual.html",
  "workshop-diy-in-memoriam.html",
  "workshop-diy-infomercial.html",
  "workshop-diy-iphone.html",
  "workshop-diy-jeopardy.html",
  "workshop-diy-kanban.html",
  "workshop-diy-license-plates.html",
  "workshop-diy-linkedin.html",
  "workshop-diy-live-monitor.html",
  "workshop-diy-loading-screens.html",
  "workshop-diy-mad-libs.html",
  "workshop-diy-maps-reviews.html",
  "workshop-diy-master-hub.html",
  "workshop-diy-metro-map.html",
  "workshop-diy-monopoly.html",
  "workshop-diy-movie-credits.html",
  "workshop-diy-museum.html",
  "workshop-diy-music-player.html",
  "workshop-diy-nasa-control.html",
  "workshop-diy-network-map.html",
  "workshop-diy-newspaper.html",
  "workshop-diy-os-desktop.html",
  "workshop-diy-ouija.html",
  "workshop-diy-paper.html",
  "workshop-diy-passport.html",
  "workshop-diy-periodic-table.html",
  "workshop-diy-pizza-menu.html",
  "workshop-diy-pokedex.html",
  "workshop-diy-police-report.html",
  "workshop-diy-ransom-note.html",
  "workshop-diy-rap-battle.html",
  "workshop-diy-real-estate.html",
  "workshop-diy-receipt.html",
  "workshop-diy-reddit.html",
  "workshop-diy-report-card.html",
  "workshop-diy-roadmap-video-fr.html",
  "workshop-diy-safety-card-v2.html",
  "workshop-diy-safety-card.html",
  "workshop-diy-scoreboard.html",
  "workshop-diy-scp-file.html",
  "workshop-diy-shark-tank.html",
  "workshop-diy-skill-tree.html",
  "workshop-diy-slot-machine.html",
  "workshop-diy-social-media-kit.html",
  "workshop-diy-space-mission.html",
  "workshop-diy-sticker-sheet.html",
  "workshop-diy-stock-market.html",
  "workshop-diy-superlatives.html",
  "workshop-diy-synth-visualizer.html",
  "workshop-diy-tamagotchi.html",
  "workshop-diy-testimonials.html",
  "workshop-diy-text-adventure.html",
  "workshop-diy-therapy.html",
  "workshop-diy-tiktok.html",
  "workshop-diy-timeline.html",
  "workshop-diy-tinder.html",
  "workshop-diy-trial.html",
  "workshop-diy-ultimate-video.html",
  "workshop-diy-video-concept-preview.html",
  "workshop-diy-vscode.html",
  "workshop-diy-wanted-wall.html",
  "workshop-diy-warranty.html",
  "workshop-diy-weather.html",
  "workshop-diy-wedding.html",
  "workshop-diy-wikipedia.html",
  "workshop-diy-wrapped-2025.html",
  "workshop-diy-yearbook.html",
  "workshop-diy-zodiac.html"
];

  const current = (location.pathname.split("/").pop() || HOME);

  function indexOfCurrent() {
    if (current === HOME) return -1;
    return PAGES.indexOf(current);
  }

  function goTo(name) {
    if (!name) return;
    location.href = name;
  }

  function makeEl(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, String(v));
    }
    for (const c of children) el.appendChild(c);
    return el;
  }

  function ensureStyles() {
    const hasCss = [...document.styleSheets].some(ss => (ss.href || "").includes("nav.css"));
    if (hasCss) return;
    const style = document.createElement("style");
    style.textContent = `
      .wdynav{position:fixed;left:0;right:0;bottom:0;z-index:2147483647;
        font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
        padding:10px 12px; display:flex; gap:10px; align-items:center; justify-content:space-between;
        background:rgba(20,20,20,.86); backdrop-filter:saturate(180%) blur(10px);
        color:#fff; box-shadow:0 -8px 24px rgba(0,0,0,.25);}
      .wdynav .group{display:flex; gap:8px; align-items:center;}
      .wdynav a,.wdynav button{appearance:none;border:1px solid rgba(255,255,255,.22);
        background:rgba(255,255,255,.08); color:#fff; border-radius:10px; padding:8px 10px;
        text-decoration:none; font-size:14px; line-height:1; cursor:pointer;}
      .wdynav a:hover,.wdynav button:hover{background:rgba(255,255,255,.14);}
      .wdynav a[aria-disabled="true"],.wdynav button:disabled{opacity:.45;cursor:not-allowed;}
      .wdynav .meta{opacity:.9;font-size:13px; white-space:nowrap;}
      .wdynav .kbd{opacity:.85;font-size:12px;border:1px solid rgba(255,255,255,.22);border-bottom-width:2px;
        padding:2px 6px;border-radius:8px;}
      body{padding-bottom:56px;}
    `;
    document.head.appendChild(style);
  }

  function buildNav() {
    ensureStyles();

    const idx = indexOfCurrent();
    const hasDeck = PAGES.length > 0;

    const prevName = (idx > 0) ? PAGES[idx - 1] : null;
    const nextName =
      (idx >= 0 && idx < PAGES.length - 1) ? PAGES[idx + 1] :
      (idx === -1 ? (hasDeck ? PAGES[0] : null) : null);

    const prev = makeEl("a", {
      href: prevName || "#",
      class: "btn prev",
      "aria-disabled": prevName ? "false" : "true",
      onclick: (e) => {
        if (!prevName) { e.preventDefault(); }
      }
    }, [makeEl("span", {text: "◀ Prev"})]);

    const home = makeEl("a", { href: HOME, class: "btn home" }, [makeEl("span", {text: "Home"})]);

    const next = makeEl("a", {
      href: nextName || "#",
      class: "btn next",
      "aria-disabled": nextName ? "false" : "true",
      onclick: (e) => {
        if (!nextName) { e.preventDefault(); }
      }
    }, [makeEl("span", {text: "Next ▶"})]);

    let counterText = "No pages";
    if (hasDeck) {
      counterText = (idx === -1) ? ("0 / " + PAGES.length) : ((idx + 1) + " / " + PAGES.length);
    }

    const meta = makeEl("div", { class: "meta" }, [
      makeEl("span", { text: counterText }),
      makeEl("span", { text: "  " }),
      makeEl("span", { class: "kbd", text: "←" }),
      makeEl("span", { text: " " }),
      makeEl("span", { class: "kbd", text: "→" }),
      makeEl("span", { text: "  " }),
      makeEl("span", { class: "kbd", text: "H" }),
      makeEl("span", { text: " " }),
      makeEl("span", { class: "kbd", text: "N" }),
    ]);

    const left = makeEl("div", { class: "group" }, [prev, next]);
    const right = makeEl("div", { class: "group" }, [home, meta]);

    const bar = makeEl("div", { class: "wdynav", role: "navigation", "aria-label": "Workshop navigation" }, [left, right]);
    document.body.appendChild(bar);

    document.addEventListener("keydown", (e) => {
      const t = e.target;
      const isTyping = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (isTyping) return;

      if (e.key === "ArrowLeft") {
        if (prevName) { e.preventDefault(); goTo(prevName); }
      } else if (e.key === "ArrowRight" || e.key === " ") {
        if (nextName) { e.preventDefault(); goTo(nextName); }
      } else if (e.key.toLowerCase() === "h") {
        e.preventDefault(); goTo(HOME);
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        bar.style.display = (bar.style.display === "none") ? "" : "none";
      }
    });
  }

  function onReady(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  onReady(() => {
    if (document.body) buildNav();
  });
})();
