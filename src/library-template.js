import { LitElement, html, css } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import { repeat } from 'lit-html/directives/repeat.js';



class MyLibrary extends LitElement {

  static get properties() {
    return {};
  }

  constructor() {
    super();
    this.coverUrl = 'https://d1re4mvb3lawey.cloudfront.net/ISBN/cover.jpg';
    this._fetchBooks();
  }

  static get styles() {
    return [
      css`
      :host {
        display: inline-block;
              overflow: hidden;
              position: relative;
      }

      li {
        top: 0;
        margin: 10px;
        transition: all 0.25s ease-in-out;
        -webkit-transition: all 0.25s ease-in-out;
      }

      li:hover {
          box-shadow: 0 17px 30px 0 rgba(0, 0, 0, 0.19), 0 12px 15px 0 rgba(0, 0, 0, 0.24);
          position: relative;
          top: -5px;
      }

      .sizedImgDiv {
        position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;
      }
      li.book a {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 50px;
        background-color: rgba(255,255,255,.5);
      }

      #img {
        display: block;
              width: var(--iron-image-width, auto);
              height: var(--iron-image-height, auto);
      }

      :host([sizing]) #sizedImgDiv {
        display: block;
      }

      :host([sizing]) #img {
        display: none;
      }

      #placeholder {
        position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0px;
              left: 0px;

              background-color: inherit;
              opacity: 1;

              ;
      }

      #placeholder.faded-out {
        transition: opacity 0.5s linear;
              opacity: 0;
      }

      #carousel {
        margin-left: 12px;
        display: var(--layout-horizontal_-_display);
        -ms-flex-direction: var(--layout-horizontal_-_-ms-flex-direction);
        -webkit-flex-direction: var(--layout-horizontal_-_-webkit-flex-direction);
        flex-direction: var(--layout-horizontal_-_flex-direction);
      }

      .book {
        display: inline-block;
        position: relative;
        cursor: pointer;
        width: 180px;
        max-width: 180px;
        max-height: 243px;
        height: 243px;
        background: white;
        padding: 0;
        border-radius: 3px;
        overflow: hidden;
        position: relative;
      }
      .book-content {
          display: block;
          position: absolute;
          padding: 12px;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.87);
      }
      .book-content div {
          color: #000;
          display: block;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      }

      `,
    ];
  }


  render() {
    return html`
        <div id="mylibrary">${this.libraryRequest}</div>
    `;
  }

  _fetchBooks() {
    this.libraryRequest = html`
      ${until(
        this.f = fetch('http://localhost:8080/src/library.json',
        {mode: 'cors'})
          .then(res => res.json() ||  (() => {throw Error(res.statusText)})())
          .then(booksjson => {
            return html`
              <h2>My Library</h2>
              <div>
              <ul id="carousel">
              ${repeat(
                booksjson.panes[0].Books,
                book => book.isbn,
                (book) =>
                  book.meta.title ? html`
                  <li class="book">
                    <a id="isbn_${book.isbn}" href="/src?isbn=${book.isbn}">
                    <div class="sizedImgDiv" role="img" aria-label="cover.jpg" style="background-image: url(&quot;${this.coverUrl.replace('ISBN', book.isbn)}&quot;); background-size: cover; background-position: center center; background-repeat: no-repeat;"></div>
                        <div class="book-content">
                          <div class="title">${book.meta.title}</div>
                          <div class="authors">${book.meta.contributors}</div>
                        </div>
                      </a>
                  </li>
                  ` : ''
              )}
              </ul>
              </div>
            `;
          })
          .catch(error => {
            return html`
            <h1>There was an error retrieving your library.</h1>
            `}),
        html`
          <h1>Retrieving Library Info...</h1>
        `
      )}
    `;
  }
}

customElements.define('my-library', MyLibrary);
