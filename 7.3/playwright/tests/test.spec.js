const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, pwd } = require("../user");

test.describe("Успешная авторизация", () => {
    test("Успешный вход с правильными данными", async ({ page }) => {
        await page.goto("https://netology.ru/?modal=sign_in");

        await page.click('button.styles_socialButton__XxhtP.styles_google__AOhMO');

        await page.waitForURL();

        const currentUrl = page.url();
        expect(currentUrl).toContain("https://accounts.google.com/");
    });
});

test.describe("Неуспешная авторизация", () => {
    test("Ошибка при вводе неверных данных", async ({ page }) => {
        await page.goto("https://netology.ru/?modal=sign_in");

        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', pwd);
        await page.click('button[type="submit"]'); 

        await expect(page.locator("[data-testid='login-error-hint']")).toContainText("Вы ввели неправильно логин или пароль.");


    });
});
