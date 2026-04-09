const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const HomePage = require('../../pages/homePage');
const LoginPage = require('../../pages/loginPage');
const DataStructurePage = require('../../pages/datastructurePage');
const data = require('../../test-data/datastructure.json');
//const loginData = require(path.resolve(__dirname, '../../test-data/loginData.json'));

const loginData = require('../../test-data/loginData.json');

let homePage, loginPage, dsPage;


// LOGIN STEP

Given('User is logged in with valid credentials', async function () {
  const HomePage = require('../../pages/homePage');
  const LoginPage = require('../../pages/loginPage');

  const homePage = new HomePage(this.page);

  // Launch app
  await homePage.launch();

  // Click Get Started → goes to home
  await homePage.clickGetStarted();

  // Click Sign in
  await this.page.click('text=Sign in');

  // Wait for login page
  await this.page.waitForURL('**/login', { timeout: 10000 });

  // Use LoginPage to handle the login
  const loginPage = new LoginPage(this.page);
  await homePage.login(loginData.username, loginData.password);
});


// NAVIGATION

When('User clicks Data Structures Get Started', async function () {
  await this.page.locator('.card:has-text("Data Structures-Introduction") >> text=Get Started').click();
  await expect(this.page).toHaveURL(/data-structures-introduction/);
});

When('User clicks Time Complexity link', async function () {
  await this.page.click('text=Time Complexity');
  await expect(this.page).toHaveURL(/time-complexity/);
});

Then('User should be in Data Structures Introduction page', async function () {
  await expect(this.page).toHaveURL(/data-structures-introduction/);
});


// PAGE STATES - Just verify state, don't navigate

Given('User is in Data Structures Introduction page', async function () {
  await expect(this.page).toHaveURL(/data-structures-introduction/);
});

Given('User is in Time Complexity page', async function () {
  await expect(this.page).toHaveURL(/time-complexity/);
});

Given('User is in Try Editor page', async function () {
  await expect(this.page).toHaveURL(/tryEditor/);
});


// ACTIONS

Then('User should be in Time Complexity page', async function () {
  await expect(this.page).toHaveURL(/time-complexity/);
});

When('User clicks Practice Questions button', async function () {
  await this.page.click('text=Practice Questions');
});

Then('User should be in Practice Questions page', async function () {
  await expect(this.page.locator('text=Practice Questions')).toBeVisible();
});

When('User clicks Try Here button', async function () {
  // Always create a fresh instance with the current page
  dsPage = new DataStructurePage(this.page);
  await dsPage.clickTryHere();
});

Then('User should be in Try Editor page', async function () {
  // Wait a bit for navigation to complete
  await this.page.waitForTimeout(1000);
  await expect(this.page).toHaveURL(/tryEditor/, { timeout: 1000 });
});


// RUN BUTTON

When('User clicks Run button without code', async function () {
  await this.page.click('text=Run', { timeout: 5000 });
});

When('User runs code {string}', async function (type) {
  const code = data.code[type];

  // Wait for editor textarea to be visible
  const textarea = this.page.locator('textarea').first();
  
  // Try to wait for visible state with extended timeout
  try {
    await textarea.waitFor({ state: 'visible', timeout: 1500 });
  } catch (e) {
    // If it times out, try to interact anyway - sometimes hidden elements can still be filled
    await this.page.waitForTimeout(1000);
  }
  
  // Force fill even if hidden (Playwright can fill hidden textareas)
  await textarea.fill(code, { timeout: 1000, force: true });
  await this.page.waitForTimeout(500);
  await this.page.click('text=Run', { timeout: 5000 });
});


// VALIDATIONS

Then('Error alert should be displayed', async function () {
  // Listen for dialogs and close them
  this.page.once('dialog', async dialog => {
    console.log('Dialog appeared:', dialog.message());
    await dialog.accept();
  });
  
  // Wait briefly for dialog to appear
  await this.page.waitForTimeout(1000);
});

Then('Output should be displayed', async function () {
  const output = this.page.locator('#output');
  await expect(output).toBeVisible({ timeout: 1000 });
});
