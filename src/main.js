// DEMO: the inquiry form is mocked. Nothing leaves the browser: the entry is kept in this browser's localStorage,
// and the admin page reads it back. No request to any server.
const KEY = "showroomDemoInquiries";
const form = document.getElementById("inq");
const msg = document.getElementById("msg");

function say(text, kind) {
  msg.textContent = text;
  msg.className = "msg " + (kind || "");
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  say("", "");
  const f = new FormData(form);
  if (String(f.get("website") || "") !== "") return; // the hidden field: a bot
  const entry = {
    at: new Date().toISOString(),
    name: String(f.get("name") || "").trim().slice(0, 80),
    phone: String(f.get("phone") || "").trim().slice(0, 20),
    segment: String(f.get("segment") || "unsure"),
    message: String(f.get("message") || "").trim().slice(0, 500),
  };
  if (entry.name.length < 2) return say("נא למלא שם מלא.", "err");
  if (!/^[0-9+\-\s()]{7,20}$/.test(entry.phone)) return say("נא למלא מספר טלפון תקין.", "err");
  if (f.get("consent") !== "on") return say("נא לאשר שיחזרו אליכם בטלפון.", "err");
  try {
    localStorage.setItem(KEY, JSON.stringify([entry, ...load()].slice(0, 50)));
  } catch {
    return say("הדפדפן לא מאפשר לשמור את הדמו כאן.", "err");
  }
  form.reset();
  say("תודה, קיבלנו. זה דמו: הפנייה נשמרת בדפדפן הזה בלבד ואפשר לראות אותה בעמוד הפניות.", "ok");
});
