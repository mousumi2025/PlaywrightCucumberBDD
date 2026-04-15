const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LaunchPage = require('../../pages/launchPage');

let launchPage;

Given('the user has browser open', async function () {
  launchPage = new LaunchPage(this.page);
});

When('the user enters correct dsAlgo portal URL', async function () {
  await launchPage.navigate();
});

Then('the user should be able to land on dsAlgo portal', async function () {
  await expect(this.page).toHaveURL(/dsportalapp/);
});

Then('user should see 1 button in launch page', async function () {
  await expect(launchPage.getStartedBtn).toBeVisible();
});

Then('button should be in enabled state', async function () {
  await expect(launchPage.getStartedBtn).toBeEnabled();
});

Then('page title should be {string}', async function (title) {
  await expect(this.page).toHaveTitle(title);
});

Then('user should see launch page content', async function () {
  await expect(launchPage.pageContent).toContainText(
    'Preparing for the Interviews'
  );
});
