import { html, fixture, expect } from '@open-wc/testing';
import { querySelectorAllDeep, querySelectorDeep } from 'query-selector-shadow-dom';
import '../src/library-template';

describe('<my-library>', () => {

  it('has loading message', async () => {
    const el = await fixture(html`
      <my-library></my-library>
    `);
    const h1 = querySelectorDeep('h1', el);
    expect(h1.innerText).to.equal('Retrieving Library Info...');
  });

  it('loads library json and renders unordered list', async () => {
    const el = await fixture(html`
      <my-library></my-library>
    `);
    await el.f;
    const booklist = querySelectorAllDeep('li', el);
    expect(booklist.length).to.be.at.least(10);
  });

});
