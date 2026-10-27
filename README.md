# showroom-demo-1

A static demo page. Fake data only.

- The inquiry form is mocked in the browser: an entry is kept in this browser's localStorage and shown on the admin page. Nothing is sent anywhere.
- The admin page ("פניות") reads that local list. "טעינת דוגמאות" adds three invented entries.
- The page is marked `noindex`. No cookies, no tracking, no request to another site. The font (Heebo, OFL) is served from this site.

Build: `npm install` then `npm run build`; the output is in `dist/`.
