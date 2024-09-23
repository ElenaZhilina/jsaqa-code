const {test, expect} = require("@playwright/test");
const {chromium} = require("playwright");
const {email, pwd, pass} = require("../user");

test.describe("Успешная авторизация", () => {
    test("Успешный вход с правильными данными", async ({ page }) => {
        await page.goto("https://netology.ru/?modal=sign_in");
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', pwd);
        await page.click('button[type="submit"]');      
        await page.waitForURL();
        const currentUrl = page.url();
        expect(currentUrl).toContain("/profile");
        
        browser.close();
    });
});

test.describe("Неуспешная авторизация", () => {
    test("Ошибка при вводе неверных данных", async ({ page }) => {
        await page.goto("https://netology.ru/?modal=sign_in");
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', pwd);
        await page.click('button[type="submit"]');     

        await expect(page.locator("[data-testid='login-error-hint']")).toContainText("Вы ввели неправильно логин или пароль");

        browser.close();
    });
});
