
const puppeteer = require('puppeteer');

let page;

const init = async (newPage) => {
  page = newPage;
};

const navigateTo = async (url) => {
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

const bookTicket = async (seatSelector) => {
  await page.waitForSelector(seatSelector, { timeout: 100000 });
  await page.click(seatSelector);
  await page.waitForSelector('.acceptin-button');
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