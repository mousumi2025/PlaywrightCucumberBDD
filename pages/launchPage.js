class LaunchPage {
  constructor(page) {
    this.page = page;

    this.getStartedBtn = page.locator('text=Get Started');
    this.pageContent = page.locator('body');
  }

  async navigate() {
    await this.page.goto('https://dsportalapp.herokuapp.com/');
  }
}

module.exports = LaunchPage;
