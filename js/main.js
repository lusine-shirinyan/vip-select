var SPORTSBOOK_FEATURES = [
  "Live betting across all major sports",
  "Pre-game and in-play markets",
  "Broad market coverage",
  "Fast navigation between events",
];

var CASINO_FEATURES = [
  {
    icon: "public/icons/live.svg",
    text: "Live casino tables",
  },
  {
    icon: "public/icons/roulette.svg",
    text: "Blackjack, roulette, baccarat",
  },
  {
    icon: "public/icons/slot.svg",
    text: "Slot games",
  },
  {
    icon: "public/icons/lightning.svg",
    text: "Instant play experience",
  },
];

var PLATFORM_FEATURES = [
  {
    icon: "public/icons/lightning.svg",
    text: "Unified experience across all products",
  },
  {
    icon: "public/icons/lightning.svg",
    text: "Immediate access to all markets",
  },
  {
    icon: "public/icons/lightning.svg",
    text: "No unnecessary steps",
  },
  {
    icon: "public/icons/lightning.svg",
    text: "Consistent interface across devices",
  },
];

var HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Create Your Account",
    description: "Get access to the platform in seconds.",
  },
  {
    step: "02",
    title: "Explore the Platform",
    description: "Browse sportsbook events and casino games in one place.",
  },
  {
    step: "03",
    title: "Start Playing",
    description: "Move seamlessly between products with no delays.",
  },
];

function escapeHtml(text) {
  var div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderSportsbookFeatures() {
  var grid = document.getElementById("sportsbook-feature-grid");
  if (!grid) {
    return;
  }
  grid.innerHTML = SPORTSBOOK_FEATURES.map(function (copy) {
    return (
      '<article class="sportsbook__card" role="listitem">' +
      '<p class="sportsbook__card-text">' +
      escapeHtml(copy) +
      "</p>" +
      "</article>"
    );
  }).join("");
}

function renderCasinoFeatures() {
  var grid = document.getElementById("casino-feature-grid");
  if (!grid) {
    return;
  }
  grid.innerHTML = CASINO_FEATURES.map(function (item) {
    return (
      '<article class="casino__card" role="listitem">' +
      '<img class="casino__card-icon" src="' +
      escapeHtml(item.icon) +
      '" alt="" width="40" height="40" />' +
      '<p class="casino__card-text">' +
      escapeHtml(item.text) +
      "</p>" +
      "</article>"
    );
  }).join("");
}

function renderPlatformFeatures() {
  var grid = document.getElementById("platform-feature-grid");
  if (!grid) {
    return;
  }
  grid.innerHTML = PLATFORM_FEATURES.map(function (item) {
    return (
      '<article class="platform-xp__card" role="listitem">' +
      '<img class="platform-xp__card-icon" src="' +
      escapeHtml(item.icon) +
      '" alt="" width="40" height="40" />' +
      '<p class="platform-xp__card-text">' +
      escapeHtml(item.text) +
      "</p>" +
      "</article>"
    );
  }).join("");
}

function renderHowItWorks() {
  var grid = document.getElementById("how-it-works-grid");
  if (!grid) {
    return;
  }
  grid.innerHTML = HOW_IT_WORKS_STEPS.map(function (item, index) {
    var label = "Step " + String(index + 1) + ": " + item.title;
    return (
      '<article class="how-it-works__card" role="listitem" aria-label="' +
      escapeHtml(label) +
      '">' +
      '<p class="how-it-works__step">' +
      escapeHtml(item.step) +
      "</p>" +
      '<h3 class="how-it-works__card-heading">' +
      escapeHtml(item.title) +
      "</h3>" +
      '<p class="how-it-works__card-text">' +
      escapeHtml(item.description) +
      "</p>" +
      "</article>"
    );
  }).join("");
}

function initVipSelect() {
  renderSportsbookFeatures();
  renderCasinoFeatures();
  renderPlatformFeatures();
  renderHowItWorks();

  var yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("site-header-menu-toggle");
  var menu = document.getElementById("site-header-menu");

  if (!header || !toggle || !menu) {
    return;
  }

  var mq = window.matchMedia("(min-width: 768px)");

  function syncMenuInert() {
    if (mq.matches) {
      menu.removeAttribute("inert");
    } else if (header.classList.contains("site-header--menu-open")) {
      menu.removeAttribute("inert");
    } else {
      menu.setAttribute("inert", "");
    }
  }

  function setOpen(open) {
    header.classList.toggle("site-header--menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    syncMenuInert();
    if (!mq.matches) {
      document.body.style.overflow = open ? "hidden" : "";
    } else {
      document.body.style.overflow = "";
    }
  }

  function closeIfDesktop() {
    if (mq.matches) {
      setOpen(false);
    } else {
      syncMenuInert();
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("site-header--menu-open"));
  });

  var menuWrapper = menu.parentElement;

  document.addEventListener("click", function (e) {
    if (mq.matches || !header.classList.contains("site-header--menu-open")) {
      return;
    }
    if (toggle.contains(e.target)) {
      return;
    }
    if (menuWrapper && menuWrapper.contains(e.target)) {
      return;
    }
    setOpen(false);
  });

  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", closeIfDesktop);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(closeIfDesktop);
  }

  closeIfDesktop();

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setOpen(false);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVipSelect);
} else {
  initVipSelect();
}
