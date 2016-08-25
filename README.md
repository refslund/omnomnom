Om Nom Nom
==========

Simple website that lets users search for food trucks in San Francisco.
Uses the online open data from [SF OpenData](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat).

Drag and resize the circle overlay on the map to define the search area.

The user interface is very minimalistic. More search options could be added by repeating the same current example.
UI style is basic Bootstrap, but adjusted slightly to match the Google Maps styling.


Architecture and Design Decisions
=================================

Simplicity
- Most tradeoffs and design decisions have been made in favor of simplicity. In actual lines of codes, but also in architecture and deployment considerations.

Everything hosted in a single Node.js server.
This is a choice based mainly on convenience. The frontend could be hosted separately.
- Lightweight, fast, scales well ("but isn't Node single threaded?" - yes, but you could eg. put a bunch of them behind a load balancer)
- Very easy routing with Express.js

No web MVC framework (such as Angular) because of limited project lifetime.

Using Twitter Bootstrap (and JQuery) for some UI controls.
Easy to use. Looks ok. Built in responsiveness.

No persistent data store - Searches are performed online against data.sfgov.org
- Project is to reflect current state of sfdata data set
- Very low load => Can access data.sfgov.org directly 
- No problem with stale caches
- Very easy installation

External dependencies (Bootstrap, JQuery, ..) served from external CDNs.
- Limit size of project (KB, number of files)
- Simplicity
- Website requires internet access anyway

Hosted on Heroku
- Out-of-the-box support for Node.js applications
- Excellent integration with Github.


Production ready?
=================

Not a chance. For instance:

- No [sfdata application token](https://dev.socrata.com/consumers/getting-started.html)
- No [sfdata query paging](https://dev.socrata.com/docs/paging.html). Right now: A hard coded limit and no UI indication when that limit is reached
- No unit or end-to-end tests
- No HTTPS (or any other security measures)
- No minification, bundling, gzipping, uglification, ..
- Use of standard Google Maps API key


Standing on the shoulder of giants
==================================

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com)
- [Request](https://www.npmjs.com/package/request)
- [Bootstrap](https://getbootstrap.com/)
- [Google Maps API](https://developers.google.com/maps/)
- [Stack Overflow](http://stackoverflow.com/a/17974294)
