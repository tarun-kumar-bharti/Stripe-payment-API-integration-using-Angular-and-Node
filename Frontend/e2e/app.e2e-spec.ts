import { MyangularappPage } from './app.po';

describe('myangularapp App', function() {
  let page: MyangularappPage;

  beforeEach(() => {
    page = new MyangularappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
