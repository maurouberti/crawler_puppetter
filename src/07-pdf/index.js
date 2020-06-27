const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.fundamentus.com.br/detalhes.php?papel=VVAR3');
    await page.setViewport({
        width: 1000,
        height: 1000
    });

    await page.pdf({ path: './files/file_1.pdf', format: 'A4' });

    await browser.close();
})();
