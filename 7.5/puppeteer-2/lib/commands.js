
const puppeteer = require('puppeteer');

let page;

const init = async (newPage) => {
  page = newPage;
};

const navigateTo = async (url) => {
//await page.goto(url);
  await page.goto(url, { waitUntil: 'networkidle2' });
};

const bookTicket = async (seatSelector) => {
  await page.waitForSelector(seatSelector);
  await page.click(seatSelector);
  await page.click('.acceptin-button'); 
};

const getConfirmationMessage = async () => {
  return await page.$eval('.acceptin-button', el => el.textContent);
};

module.exports = {
  init,
  navigateTo,
  bookTicket,
  getConfirmationMessage,
};