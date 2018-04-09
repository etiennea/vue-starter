/* eslint-disable */

workbox.setConfig({ debug: false });
workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.precacheAndRoute(self.__precacheManifest);
