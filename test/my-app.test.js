import { html, fixture, expect } from '@open-wc/testing';
import { querySelectorAllDeep, querySelectorDeep } from 'query-selector-shadow-dom';
import '../src/my-app';

describe('<my-app>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<my-app></my-app>');
    expect(el.title).to.equal('Bibliotek Front Dev Challenge');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <my-app title="different"></my-app>
    `);
    expect(el.title).to.equal('different');
  });

  it('has a default isbn', async () => {
    const el = await fixture(html`
      <my-app></my-app>
    `);
    expect(el.isbn).to.equal('9780198504467');
  });

  it('getIsbn returns isbn', async () => {
    const el = await fixture(html`
      <my-app></my-app>
    `);
    expect(el._getIsbn()).to.equal('9780198504467'); //default isbn...how to get query params in test?
  });

  it('has a default cover', async () => {
    const el = await fixture(html`
      <my-app></my-app>
    `);
    const img = querySelectorDeep('img');
    expect(img.src).to.equal('https://d1re4mvb3lawey.cloudfront.net/pg1017/cover.jpg');
  });

  it('has loading message', async () => {
    const el = await fixture(html`
      <my-app></my-app>
    `);
    const h1 = querySelectorDeep('h1', el);
    expect(h1.innerText).to.equal('Retrieving Book Info...');
  });

  it('has same isbn in json response', async () => {
    const el = await fixture(html`
      <my-app></my-app>
    `);
    await el.f;
    const h5 = querySelectorDeep('h5', el);
    expect(h5.innerText).to.equal('ISBN: ' + el.isbn);
  });

});
