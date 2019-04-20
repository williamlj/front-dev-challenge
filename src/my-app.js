import { LitElement, html, css } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { repeat } from 'lit-html/directives/repeat';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import './library-template.js';

class MyApp extends LitElement {
  static get properties() {
    return {
      title: { type: String }
    };
  }

  constructor() {
    super();
    this.title = 'Bibliotek Front Dev Challenge';
    this.coverUrl = 'https://d1re4mvb3lawey.cloudfront.net/ISBN/cover.jpg';
    this._getIsbn();
    this._fetchBook();
  }

  static get styles() {
    return [
      css`
        :host {
          text-align: center;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: #1a2b42;
        }

        header {
          margin: auto;
          font-family: 'Roboto', sans-serif;
        }

        h3 {
            color: rgb(168, 168, 168);
        }

        a {
          color: #217ff9;
        }

        .app-footer {
          color: #a8a8a8;
          font-size: calc(10px + 0.5vmin);
        }

        ul  {
          text-align: left;
          font-family: 'Roboto', sans-serif;
        }
      `,
    ];
  }



  render() {
    return html`
      <header class="app-header">
        <h6>${this.title}</h6>
        <img src="${ this.coverUrl.replace('ISBN', (this.isbn === '9780198504467' ? 'pg1017' : this.isbn)) }" />
        ${this.bookRequest}
      </header>
      <div class="app-footer">
        <my-library></my-library>
      </div>
    `;
  }

  _getIsbn() {
    return this.isbn = (new URLSearchParams(window.location.search).get('isbn')) || '9780198504467'; //acttual isbn is 9780198504467
  }

  _fetchBook() {
    this.bookRequest = html`
      ${until(
        this.f = fetch( (this.isbn !== '9780198504467' ? ('https://bibliotech.education/books/' + this.isbn)  : ('http://0.0.0.0:3030/https://d1re4mvb3lawey.cloudfront.net/9780198504467')) + '/index.json',
        {mode: 'cors'})
          .then(res => res.json() ||  (() => {throw Error(res.statusText)})())
          .then(bookjson => {
            return html`
            <h2>${bookjson.title}</h2>
            <h4>Contributors: ${bookjson.contributors.map(name => html`<a>${name}</a>`)}</h4>
            <h5>ISBN: ${bookjson.isbn}</h5>
              <h3 class="toc">Table of Contents</h3>
              <ul>
              ${repeat(
                bookjson.toc,
                book => book.file,
                (book) =>
                  book.title ? html`<li>${unsafeHTML(book.title)}</li>` : ''
              )}
              </ul>
            `;
          })
          .catch(error => {
            return html`
            <h1>There was an error retrieving your book. Please check the ISBN.</h1>
            `}),
        html`
          <h1>Retrieving Book Info...</h1>
        `
      )}
    `;
  }

}

customElements.define('my-app', MyApp);
