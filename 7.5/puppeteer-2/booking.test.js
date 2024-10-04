const puppeteer = require('puppeteer');
const commands = require('./lib/commands');

let page;

const BASE_URL = 'https://qamid.tmweb.ru/client/index.php';

beforeAll(async () => {
  page = await browser.newPage();
  await commands.init(page);
});

afterAll(async () => {
  await page.close();
});

jest.setTimeout(100000);




describe('Ticket Booking Tests', () => {
  beforeEach(async () => {
    await commands.navigateTo(BASE_URL, { waitUntil: 'page-header__title', timeout: 200000 });
  });

  test('Happy Path: Successful ticket booking', async () => {
    const timeSelector = '.movie-seances__time[data-seance-id="223"]';
    const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
    
    await commands.bookTicket(timeSelector, seatSelector);

    const message = await commands.getConfirmationMessage();
    expect(message).toContain('Забронировать');
  });

  test('Happy Path: Booking another ticket', async () => {
    const timeSelector = '.movie-seances__time[data-seance-id="223"]';
    const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)';
    
    await commands.bookTicket(timeSelector, seatSelector);

    const message = await commands.getConfirmationMessage();
    expect(message).toContain('Забронировать');
  });

  test('Sad Path: Trying to book an already booked ticket', async () => {
    const timeSelector = '.movie-seances__time[data-seance-id="223"]';
    const seatSelector = '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken';
    
    await commands.bookTicket(timeSelector, seatSelector);

    const confirmationMessage = await page.$eval('.confirmation-message', el => el.textContent).catch(() => null);
    expect(confirmationMessage).toBe(null);
  });
});