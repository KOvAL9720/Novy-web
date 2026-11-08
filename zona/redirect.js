'use strict';
// Klientska zóna už neexistuje – kto má starý odkaz, ide do appky.
try { navigator.serviceWorker && navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { if (/\/zona\//.test(r.scope)) r.unregister(); }); }); } catch (e) { /* ok */ }
location.replace('../app/');
