const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let commands;

const initCommands = async () => {
  commands = await import('../../lib/commands.js');
};

let page;

(async () => {
  await initCommands();
})();

const BASE_URL = 'https://qamid.tmweb.ru/client/index.php';

Before(async function () {
  const browser = await puppeteer.launch({ headless: true });
  this.page = await browser.newPage();
  await commands.init(this.page);
});

Given('I navigate to the ticket booking page', async function () {
  return await commands.navigateTo(BASE_URL, { waitUntil: 'page-header__title', timeout: 200000 });
});


When('I book a standard seat', { timeout: 100000 }, async function () {
  const timeSelector = '.movie-seances__time[data-seance-id="223"]';
  const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
  return await commands.bookTicket(timeSelector, seatSelector);
});

When('I try to book a seat that is already taken', { timeout: 100000 }, async function () {
  const timeSelector = '.movie-seances__time[data-seance-id="223"]';
  const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken';
  return await commands.bookTicket(timeSelector, seatSelector);
});

Then('I should see a confirmation message', async function () {
  const message = await commands.getConfirmationMessage();
  const { expect } = await import('chai');
  expect(message).contain('Забронировать');
  return "pending";
});

Then('I should not see a confirmation message', async function () {
  const confirmationMessage = await this.page.$eval('.confirmation-message', el => el.textContent).catch(() => null);
  const { expect } = await import('chai');
  expect(confirmationMessage).to.be.null;
  return "pending";
});

After(async function () {
  await this.page.close();
});
