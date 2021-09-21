# JCIaas - Jérôme Coupé's Insults as a Service

Jérôme Coupé is internationally recognized for his insults and colorful nicknames. This webservice is an humble tribute to him made as part of the "Dynamic Web 1" course at the IAD Louvain-la-Neuve.

The webservice is available at https://iad-dw1-jco-quotes.glitch.me/

## Technical details

An Airtable table (https://airtable.com/shrfoB2fcjJhqDd2G) stores a collection of curated words. This words are then fetched server side via the Airtable's API, randomized and served in JSON via a small Express application.

The application is hosted on https://glitch.com.

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
