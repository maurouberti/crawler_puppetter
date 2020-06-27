const puppeteer = require('puppeteer');

module.exports = (async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.fundamentus.com.br/');
    await page.type('#completar', 'VVAR3');

    const btnSearchSelector = 'input[type="image"].botao';
    await page.waitForSelector(btnSearchSelector);
    await page.click(btnSearchSelector);

    console.log('clicked');

    // label
    const listOfLabelSelector = 'td.label';
    await page.waitForSelector(listOfLabelSelector);
    const labels = await page.evaluate((listOfLabelSelector) => {
        const values = Array.from(document.querySelectorAll(listOfLabelSelector)); // DOM to Array
        return values.map(value => 'c_'+value.textContent.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ""));
    }, listOfLabelSelector);
    
    // data
    const listOfDataSelector = 'td.data';
    await page.waitForSelector(listOfDataSelector);
    const datas = await page.evaluate((listOfDataSelector) => {
        const values = Array.from(document.querySelectorAll(listOfDataSelector)); // DOM to Array
        return values.map(value => value.textContent.replace(/[\.%]/g, '').trim().replace(',', '.'));
    }, listOfDataSelector);
    
    await browser.close();

    // array combine
    var values = {};
    labels.forEach((label, index) => {
        if (label != '') values[label] = datas[index];
    });

    console.log(values)

    return values;
})()
