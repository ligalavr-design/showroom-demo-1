// DEMO admin view. It reads the entries this browser kept; there is no server, no password and no real data.
const KEY = "showroomDemoInquiries";
const SEGMENTS = {
  "led-indoor": "מסכי LED לפנים",
  "led-outdoor": "מסכי LED לחוץ",
  lcd: "מסכי LCD",
  touch: "מסכי מגע אינטראקטיביים",
  ads: "מסכי פרסום (שילוט דיגיטלי) עם אפליקציה",
  unsure: "עוד לא בטוח",
};
const SAMPLES = [
  { name: "דוגמה: משה לוי", phone: "050-0000001", segment: "led-indoor", message: "דוגמה בלבד. מחפש מסך לחדר ישיבות.", minutesAgo: 20 },
  { name: "דוגמה: דנה שרון", phone: "050-0000002", segment: "touch", message: "דוגמה בלבד. מסך מגע אינטראקטיבי לכיתה.", minutesAgo: 140 },
  { name: "דוגמה: יוסי אברהם", phone: "050-0000003", segment: "ads", message: "", minutesAgo: 1500 },
];

const rows = document.getElementById("rows");
const count = document.getElementById("count");

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
}
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text; // textContent only: an entry can never become markup
  return n;
}
function when(iso) {
  return new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", dateStyle: "short", timeStyle: "short" }).format(new Date(iso));
}

function render() {
  const items = load().sort((a, b) => (a.at < b.at ? 1 : -1));
  count.textContent = items.length ? `${items.length} פניות, החדשה ראשונה` : "אין פניות עדיין. שלחו אחת מהטופס, או טענו דוגמאות.";
  rows.replaceChildren(
    ...items.map((it) => {
      const row = el("article", "row");
      row.append(el("div", "when", when(it.at)), el("div", "who", it.name), el("div", "tel", it.phone), el("span", "seg", SEGMENTS[it.segment] || it.segment));
      if (it.message) row.append(el("div", "txt", it.message));
      return row;
    }),
  );
}

document.getElementById("samples").addEventListener("click", () => {
  const now = Date.now();
  save([...SAMPLES.map((s) => ({ at: new Date(now - s.minutesAgo * 60000).toISOString(), name: s.name, phone: s.phone, segment: s.segment, message: s.message })), ...load()]);
  render();
});
document.getElementById("clear").addEventListener("click", () => {
  localStorage.removeItem(KEY);
  render();
});
render();
