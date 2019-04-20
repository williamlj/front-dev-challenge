<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

# Front End Dev Challenge

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Notes


I've never used lit-element/lit-html so this was interesting. I did encounter a CORS issue with the JSON for the
default book, so instead of downloading the JSON I proxied it with cors-anywhere.


In order to test switching the ISBN I also downloaded the library JSON from Bibliotek to display a list of book
in "My Library". Clicking on those fetches the relevant JSON from https://bibliotech.education/books/ISBN/index.json.
