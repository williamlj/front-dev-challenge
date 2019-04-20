<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

# Front End Dev Challenge

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Notes


I've never used lit-element/lit-html so this was interesting. I did encounter a CORS issue with the JSON for the
default book (at https://d1re4mvb3lawey.cloudfront.net/9780198504467/index.json), so instead of downloading the JSON I proxied it with <code>cors-anywhere</code> (it runs on 0.0.0.0:3030 in <code>node_modules/owc-dev-server.js</code>). I thought I might need to proxy for all the books (to show switching ISBN's) but it turns out Bibliotek's book JSON works without it :)

In order to test switching the ISBN I downloaded the library JSON from Bibliotek to display a list of books
in "My Library" (accessing that file requires being logged in). Clicking on those fetches the relevant JSON from https://bibliotech.education/books/ISBN/index.json by loading the page with a query param (would be nicer to make it part of the path though).

Nesting templates is interesting (and more than one way to do it so need to investigate best practices there) and also the directives are useful. I used <code>until</code> and <code>repeat</code> (I tried both just a simple <code>.map</code> on the returned arrays, and <code>repeat</code> for fun; not necessary here but from the docs it has advantages when things get larger with more complex DOM updates).

Testing is interesting with most things in shadow DOM. I installed <code>query-selector-shadow-dom</code> (again, for fun as I'd never used it) instead of querying with <code>.shadowRoot</code>.

Other than the docs listed, not a lot of info online yet (and most of it seems to be around Angular).
