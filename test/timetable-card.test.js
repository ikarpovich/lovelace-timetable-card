const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "timetable-card.js"), "utf8");

function loadInternals() {
  const context = {
    console: { info() {} },
    HTMLElement: class {},
    customElements: { define() {} },
    window: {},
  };
  vm.runInNewContext(`${source}
    globalThis.__timetableTest = {
      buildTimetableHTML,
      getVisibleDays,
      normalizeKid,
      normalizeDisplayConfig,
      TimetableCard,
    };
  `, context);
  return context.__timetableTest;
}

test("defaults to a five-day calendar", () => {
  const { getVisibleDays } = loadInternals();
  assert.deepEqual(Array.from(getVisibleDays({})), ["Mon", "Tue", "Wed", "Thu", "Fri"]);
});

test("supports five, six, and seven visible days", () => {
  const { getVisibleDays } = loadInternals();
  assert.deepEqual(Array.from(getVisibleDays({ days: 5 })), ["Mon", "Tue", "Wed", "Thu", "Fri"]);
  assert.deepEqual(Array.from(getVisibleDays({ days: 6 })), ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
  assert.deepEqual(Array.from(getVisibleDays({ days: 7 })), ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
});

test("normalizes legacy German day keys and invalid day counts", () => {
  const { normalizeKid } = loadInternals();
  const kid = normalizeKid({
    days: 4,
    schedule: {
      Mo: [{ slot: 1, subject: "Math" }],
      Di: [],
    },
  });

  assert.equal(kid.days, 5);
  assert.deepEqual(Array.from(kid.schedule.Mon), [{ slot: 1, subject: "Math" }]);
  assert.deepEqual(Array.from(kid.schedule.Tue), []);
  assert.deepEqual(Array.from(kid.schedule.Sat), []);
});

test("renders the selected number of day columns", () => {
  const { buildTimetableHTML } = loadInternals();
  const baseKid = {
    color: "#60a5fa",
    accent: "#1d4ed8",
    light: "#eff6ff",
    slots: [{ slot: 1, time: "08:00", end: "08:45" }],
    schedule: {},
  };

  for (const days of [5, 6, 7]) {
    const html = buildTimetableHTML({ ...baseKid, days }, {});
    assert.equal((html.match(/class="th-day/g) || []).length, days);
  }
});

test("hides optional display sections by default and shows enabled sections", () => {
  const { TimetableCard, normalizeDisplayConfig } = loadInternals();
  const kid = {
    days: 5,
    color: "#60a5fa",
    accent: "#1d4ed8",
    light: "#eff6ff",
    slots: [{ slot: 1, time: "08:00", end: "08:45" }],
    schedule: { Mon: [{ slot: 1, subject: "Math" }] },
  };

  function render(config) {
    const card = Object.create(TimetableCard.prototype);
    card._config = normalizeDisplayConfig(config);
    card._kids = [kid];
    card._subjects = {};
    card._activeKid = 0;
    return card._buildHTML();
  }

  const tableOnly = render({});
  assert.doesNotMatch(tableOnly, /class="legend"/);
  assert.doesNotMatch(tableOnly, /class="day-summary"/);

  const withSections = render({ show_subject_legend: true, show_day_summary: true });
  assert.match(withSections, /class="legend"/);
  assert.match(withSections, /class="day-summary"/);
});
