let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

jest.setTimeout(100000);

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team", { waitUntil: 'networkidle2', timeout: 60000 });
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForNavigation();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

// Новые тесты
describe("Additional page tests", () => {

  test("Check title on the Pricing page", async () => {
    await page.goto("https://github.com/pricing", { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('h1'); 
    const title = await page.title();
    expect(title).toEqual("Pricing · Plans for every developer · GitHub");
  });

  test("Check title on the Marketplace page", async () => {
    await page.goto("https://github.com/marketplace", { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('h1'); 
    const title = await page.title();
    expect(title).toEqual("Marketplace · Tools to improve your workflow · GitHub");
  });

  test("Check title on the Explore page", async () => {
    await page.goto("https://github.com/explore", { waitUntil: 'networkidle2', timeout: 200000 });
    await page.waitForSelector('h1'); 
    const title = await page.title();
    expect(title).toEqual("Explore GitHub · GitHub");
  });
 });