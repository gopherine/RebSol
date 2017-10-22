import { TemplatePage } from './app.po';

describe('template App', () => {
  let page: TemplatePage;

  beforeEach(() => {
    page = new TemplatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
