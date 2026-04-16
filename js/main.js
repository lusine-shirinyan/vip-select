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

var SPORTSBOOK_GRID_MQ = window.matchMedia("(min-width: 768px)");
var sportsbookEqualizeTimer = null;

function equalizeSportsbookGridHeights() {
  var grid = document.getElementById("sportsbook-feature-grid");
  if (!grid) {
    return;
  }
  var cards = grid.querySelectorAll(".sportsbook__card");
  if (!cards.length) {
    return;
  }

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.minHeight = "";
  }

  if (!SPORTSBOOK_GRID_MQ.matches) {
    return;
  }

  var maxH = 0;
  for (var j = 0; j < cards.length; j++) {
    var h = cards[j].getBoundingClientRect().height;
    if (h > maxH) {
      maxH = h;
    }
  }
  if (maxH <= 0) {
    return;
  }
  for (var k = 0; k < cards.length; k++) {
    cards[k].style.minHeight = maxH + "px";
  }
}

function scheduleEqualizeSportsbookGridHeights() {
  requestAnimationFrame(function () {
    requestAnimationFrame(equalizeSportsbookGridHeights);
  });
}

function renderSportsbookFeatures() {
  var grid = document.getElementById("sportsbook-feature-grid");
  if (!grid) {
    return;
  }
  grid.innerHTML = SPORTSBOOK_FEATURES.map(function (copy) {
    return (
      '<div class="sportsbook__card" role="listitem">' +
      '<p class="sportsbook__card-text">' +
      escapeHtml(copy) +
      "</p>" +
      "</div>"
    );
  }).join("");
  scheduleEqualizeSportsbookGridHeights();
}

function renderCasinoFeatures() {
  var grid = document.getElementById("casino-feature-grid");
  if (!grid) {
    return;
  }
  grid.innerHTML = CASINO_FEATURES.map(function (item) {
    return (
      '<div class="casino__card" role="listitem">' +
      '<img class="casino__card-icon" src="' +
      escapeHtml(item.icon) +
      '" alt="" width="40" height="40" />' +
      '<p class="casino__card-text">' +
      escapeHtml(item.text) +
      "</p>" +
      "</div>"
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
      '<div class="platform-xp__card" role="listitem">' +
      '<img class="platform-xp__card-icon" src="' +
      escapeHtml(item.icon) +
      '" alt="" width="40" height="40" />' +
      '<p class="platform-xp__card-text">' +
      escapeHtml(item.text) +
      "</p>" +
      "</div>"
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
      '<div class="how-it-works__card" role="listitem" aria-label="' +
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
      "</div>"
    );
  }).join("");
}

function initVipSelect() {
  renderSportsbookFeatures();
  renderCasinoFeatures();
  renderPlatformFeatures();
  renderHowItWorks();

  function onSportsbookLayoutRefresh() {
    clearTimeout(sportsbookEqualizeTimer);
    sportsbookEqualizeTimer = setTimeout(
      scheduleEqualizeSportsbookGridHeights,
      50,
    );
  }

  window.addEventListener("resize", onSportsbookLayoutRefresh);
  if (typeof SPORTSBOOK_GRID_MQ.addEventListener === "function") {
    SPORTSBOOK_GRID_MQ.addEventListener(
      "change",
      scheduleEqualizeSportsbookGridHeights,
    );
  } else if (typeof SPORTSBOOK_GRID_MQ.addListener === "function") {
    SPORTSBOOK_GRID_MQ.addListener(scheduleEqualizeSportsbookGridHeights);
  }

  var sportsbookGrid = document.getElementById("sportsbook-feature-grid");
  if (sportsbookGrid && typeof ResizeObserver !== "undefined") {
    var ro = new ResizeObserver(onSportsbookLayoutRefresh);
    ro.observe(sportsbookGrid);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleEqualizeSportsbookGridHeights);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVipSelect);
} else {
  initVipSelect();
}
