// Presmerovanie na anglickú verziu podľa jazyka prehliadača alebo voľby používateľa.
// Musí bežať v <head> ešte pred vykreslením stránky.
(function () {
  try {
    if (/bot|crawl|spider|slurp|facebookexternalhit|preview/i.test(navigator.userAgent)) return;
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'sk' || q === 'en') localStorage.setItem('lt-lang', q);
    var pref = localStorage.getItem('lt-lang');
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    var slavic = langs.some(function (l) { return /^(sk|cs)(-|_|$)/i.test(l); });
    if (pref === 'en' || (!pref && !slavic)) location.replace('en/' + location.search + location.hash);
  } catch (e) { /* bez úložiska ostane slovenčina */ }
})();
