const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const chai = require("chai");
const expect = chai.expect;
const { navigateTo, getConfirmationMessage, bookTicket } = require("../../lib/commands.js");

setDefaultTimeout(100000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 3000});
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

Given('I navigate to the booking page', async function () {
  return await this.page.goto('https://qamid.tmweb.ru/client/index.php', { waitUntil: 'networkidle2', timeout: 200000 });
});

When('I select a movie session', async function () {
  return await this.page.click('.movie-seances__time[data-seance-id="223"]');
  await this.page.waitForSelector(selector, { timeout: 20000 }); 
  return await this.page.click(selector);
});

When('I book a free seat', async function () {
  const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
  return await this.page.waitForSelector(seatSelector);
  return await this.page.click(seatSelector);
  return await this.page.click('.acceptin-button'); 
});

When('I try to book the same seat again', async function () {
  const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken';
  return await this.page.waitForSelector(seatSelector);
  return await this.page.click(seatSelector);
});

Then('I should see a confirmation message', async function () {
  const confirmationMessage = await this.page.$eval('.acceptin-button', el => el.textContent).catch(() => null);
  expect(confirmationMessage).to.contain('Забронировать');
});

Then('I should see nothing', async function () {
  return await this.page.waitForTimeout(500);
  const confirmationMessage = await this.page.$eval('.confirmation-message', el => el.textContent).catch(() => null);
  expect(confirmationMessage).to.be.null;
});


After(async function () {
  if (this.browser) {
    await this.browser.close(); 
  }
});