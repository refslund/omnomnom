Om Nom Nom
==========

sfdata food trucks

Show data from this public data set:
https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat


Architecture and Design Decisions
=================================

Simplicity
- Most tradeoffs and design decisions have been made in favor of simplicity. In actual lines of codes, but also in architecture and deployment considerations.

Everything hosted in a single Node.js server.
- Lightweight, fast, scales well ("but isn't Node single threaded?" - yes, but you could eg. put a bunch of them behind a load balancer)
- Very easy routing with Express.js

No web MVC framework (such as Angular, Ember, Knockout, ..) because of limited project lifetime.

Using Twitter Bootstrap (and JQuery) for some UI controls.
Easy to use. Looks ok. Built in responsiveness.

No persistent data store
- Project is to reflect current state of sfdata data set
- Very low load => Can access data.sfgov.org directly 
- No problem with stale caches
- Very easy installation

External dependencies (Bootstrap, JQuery, ..) served from external CDNs.
- Limit size of project (KB, number of files)
- Simplicity
- Website requires internet access anyway


Production ready?
=================

Not a chance. For instance:

- [sfdata application token](https://dev.socrata.com/consumers/getting-started.html)
- [sfdata query paging](https://dev.socrata.com/docs/paging.html). Right now: A hard coded limit and no UI indication
- No Google Maps API key
- Unit and end-to-end tests
- No HTTPS (or any other security measures)
- No minification, bundling, gzipping, uglification, ..


Standing on the shoulder of giants
==================================
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com)
- [Request](https://www.npmjs.com/package/request)
- [Bootstrap](https://getbootstrap.com/)
- [Google Maps API](https://developers.google.com/maps/)
- [Stack Overflow](http://stackoverflow.com/a/17974294)
