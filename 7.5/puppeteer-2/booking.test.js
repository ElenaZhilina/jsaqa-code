
let browser;
let page;

const puppeteer = require('puppeteer');
const commands = require('./lib/commands');

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await commands.init(page);
});

afterAll(async () => {
  await browser.close();
});

jest.setTimeout(100000);

const BASE_URL = 'https://qamid.tmweb.ru/client/index.php';


describe('Ticket Booking Tests', () => {
  beforeAll(async () => {
    await commands.navigateTo(BASE_URL, { waitUntil: 'page-header__title', timeout: 200000 });
  });

  test('Happy Path: Successful ticket booking', async () => {
    await page.click('.movie-seances__time[data-seance-id="223"]'); 
    const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
    await commands.bookTicket(seatSelector); 

    const message = await commands.getConfirmationMessage();
    expect(message).toContain('Забронировать');
  });

  test('Happy Path: Booking another ticket', async () => {
    await commands.navigateTo(BASE_URL, { waitUntil: 'page-header__title', timeout: 300000 });
    await page.click('.movie-seances__time[data-seance-id="223"]'); 
    const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
    await commands.bookTicket(seatSelector); 

    const message = await commands.getConfirmationMessage();
    expect(message).toContain('Забронировать');
  });

  test('Sad Path: Trying to book an already booked ticket', async () => {
    await commands.navigateTo(BASE_URL, { timeout: 300000 });
    await page.click('.movie-seances__time[data-seance-id="223"]'); 
    const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken';
    await commands.bookTicket(seatSelector); 

    const confirmationMessage = await page.$eval('.confirmation-message', el => el.textContent).catch(() => null);
    expect(confirmationMessage).toBe(null);
  });
});
