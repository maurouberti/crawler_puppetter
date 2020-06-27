const puppeteer = require('puppeteer');

(async() => {


    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.fundamentus.com.br/detalhes.php?papel=VVAR3');

    await page.screenshot({ path: './files/image_1.png' });


    await page.setViewport({
        width: 1000,
        height: 1000
    });
    await page.screenshot({ path: './files/image_2.png' });


    const imgSelector = 'img';
    const el = await page.evaluate((imgSelector) => {
        const img = document.getElementsByTagName(imgSelector)[0];
        const { x, y, width, height } = img.getBoundingClientRect();
        return { x, y, width, height };
    }, imgSelector);

    await page.screenshot({ path: './files/image_3.png', clip: {
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height
    }});

    await browser.close();
})()
