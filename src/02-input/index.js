const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.fundamentus.com.br/');
    await page.type('#completar', 'VVAR3');

    const btnSearchSelector = 'input[type="image"].botao';
    await page.waitForSelector(btnSearchSelector);
    await page.click(btnSearchSelector);

    console.log('clicked');

    await browser.close();
})()
