const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const StackPage = require('../../pages/stackPage');
const data = require('../../test-data/stackData.json');
const loginData = require('../../test-data/loginData.json');

let stackPage;

Given('User is on Stack page', async function () {
  stackPage = new StackPage(this.page);
  const currentUrl = this.page.url();
  if (!currentUrl.includes('/stack')) {
    // Navigate to Stack page via dropdown
    await stackPage.selectFromDropdown('Stack');
    await expect(this.page).toHaveURL(/\/stack\//, { timeout: 10000 });
  }
});

Given('User is on Operations in Stack page', async function () {
  stackPage = new StackPage(this.page);
  const currentUrl = this.page.url();
  if (!currentUrl.includes('operations-in-stack')) {
    // First go to Stack page if not there
    if (!currentUrl.includes('/stack')) {
      await stackPage.selectFromDropdown('Stack');
      await expect(this.page).toHaveURL(/\/stack\//, { timeout: 10000 });
    }
    // Then navigate to Operations in Stack
    await stackPage.clickLink('Operations in Stack');
    await expect(this.page).toHaveURL(/operations-in-stack/, { timeout: 10000 });
  }
});

Given('User is on Implementation page', async function () {
  stackPage = new StackPage(this.page);
  const currentUrl = this.page.url();
  if (!currentUrl.includes('implementation')) {
    // Navigate via Operations page first
    if (!currentUrl.includes('operations-in-stack')) {
      if (!currentUrl.includes('/stack')) {
        await stackPage.selectFromDropdown('Stack');
        await expect(this.page).toHaveURL(/\/stack\//, { timeout: 10000 });
      }
      await stackPage.clickLink('Operations in Stack');
      await expect(this.page).toHaveURL(/operations-in-stack/, { timeout: 10000 });
    }
    // Then navigate to Implementation
    await stackPage.clickLink('Implementation');
    await expect(this.page).toHaveURL(/implementation/, { timeout: 10000 });
  }
});

Given('User is on Try Editor page', async function () {
  stackPage = new StackPage(this.page);
  const currentUrl = this.page.url();
  
  // If already on Try Editor page, we're done
  if (currentUrl.includes('tryEditor')) {
    return;
  }
  
  // Otherwise, navigate there starting from current position or Stack page
  if (!currentUrl.includes('/stack')) {
    await stackPage.selectFromDropdown('Stack');
    await expect(this.page).toHaveURL(/\/stack\//, { timeout: 1000 });
  }
  
  // Go to Operations in Stack page
  if (!currentUrl.includes('operations-in-stack')) {
    await this.page.locator("text=Operations in Stack").click();
    await expect(this.page).toHaveURL(/operations-in-stack/, { timeout: 1000 });
  }
  
  // Click Try Here button
  await stackPage.clickTryHere();
  
  // Verify we're on Try Editor page
  await expect(this.page).toHaveURL(/tryEditor/, { timeout: 1500 });
});
// ACTIONS

When('User selects {string} from Data Structures dropdown', async function (option) {
  stackPage = new StackPage(this.page);
  await stackPage.selectFromDropdown(option);
});

When('User clicks "Try here" button', async function () {
  await stackPage.clickTryHere();
});

When('User clicks "Operations in Stack" link', async function () {
  await stackPage.clickLink('Operations in Stack');
});

When('User clicks "Implementation" link', async function () {
  await stackPage.clickLink('Implementation');
});

When('User clicks "Application" link', async function () {
  await stackPage.clickLink('Application');
});

When('User clicks browser back button', async function () {
  await this.page.goBack();
});
// RUN CODE

When('User runs code {string} in stack', async function (type) {
  const code = data.code[type];
  await stackPage.runCode(code);
});

When('User clicks Run button without code in stack', async function () {
  await stackPage.runCode('');
});
// VALIDATIONS

Then('User should be redirected to Stack page', async function () {
  await expect(this.page).toHaveURL(/stack/);
});

Then('User should be redirected to Operations in Stack page', async function () {
  await expect(this.page).toHaveURL(/operations-in-stack/);
});

Then('User should be redirected to Implementation page', async function () {
  await expect(this.page).toHaveURL(/implementation/);
});

Then('User should be redirected to Try Editor page', async function () {
  await expect(this.page).toHaveURL(/tryEditor/);
});

Then('Error alert should be displayed in stack', async function () {
  this.page.on('dialog', async dialog => {
    await dialog.accept();
  });
});

Then('Output should be displayed in stack', async function () {
  const output = this.page.locator('#output');
  await expect(output).toBeVisible();
});

Given('User is on Application page', async function () {
  stackPage = new StackPage(this.page);
  const currentUrl = this.page.url();
  if (!currentUrl.includes('applications')) {
    // Navigate to Implementation page first if needed
    if (!currentUrl.includes('implementation')) {
      if (!currentUrl.includes('operations-in-stack')) {
        if (!currentUrl.includes('/stack')) {
          await stackPage.selectFromDropdown('Stack');
          await expect(this.page).toHaveURL(/\/stack\//, { timeout: 10000 });
        }
        await stackPage.clickLink('Operations in Stack');
        await expect(this.page).toHaveURL(/operations-in-stack/, { timeout: 10000 });
      }
      await stackPage.clickLink('Implementation');
      await expect(this.page).toHaveURL(/implementation/, { timeout: 10000 });
    }
    // Then navigate to Application
    await stackPage.clickLink('Application');
    await expect(this.page).toHaveURL(/applications/, { timeout: 10000 });
  }
});

Given('User is on Practice page', async function () {
  stackPage = new StackPage(this.page);
  const currentUrl = this.page.url();
  if (!currentUrl.includes('practice')) {
    // Navigate to Application page first if needed
    if (!currentUrl.includes('applications')) {
      if (!currentUrl.includes('implementation')) {
        if (!currentUrl.includes('operations-in-stack')) {
          if (!currentUrl.includes('/stack')) {
            await stackPage.selectFromDropdown('Stack');
            await expect(this.page).toHaveURL(/\/stack\//, { timeout: 10000 });
          }
          await stackPage.clickLink('Operations in Stack');
          await expect(this.page).toHaveURL(/operations-in-stack/, { timeout: 10000 });
        }
        await stackPage.clickLink('Implementation');
        await expect(this.page).toHaveURL(/implementation/, { timeout: 10000 });
      }
      await stackPage.clickLink('Application');
      await expect(this.page).toHaveURL(/applications/, { timeout: 10000 });
    }
    // Then navigate to Practice Questions
    await this.page.locator('text=Practice Questions').click();
    await expect(this.page).toHaveURL(/practice/, { timeout: 10000 });
  }
});

Then('User should be redirected to Application page', async function () {
  await expect(this.page).toHaveURL(/applications/);
});

Then('User should be redirected to Practice page', async function () {
  await expect(this.page.locator('text=Practice Questions')).toBeVisible();
});

Then('User should be on Home page after action', async function () {
  await expect(this.page).toHaveURL(/home/);
});

When('User clicks "Practice Questions" link', async function () {
  await this.page.locator('text=Practice Questions').click();
});

When('User clicks "Sign out" link', async function () {
  await this.page.locator('text=Sign out').click();
});

When('User runs stack code {string}', (s) => {
  // Write code here that turns the phrase above into concrete actions
})
When('User runs stack code {string}', (s) => {
  // Write code here that turns the phrase above into concrete actions
})
