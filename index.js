const puppeteer = require("puppeteer");

(async () => {
    try {
        //Launch Headless Browser
        const browser = await puppeteer.launch({ headless: false });
        const [page] = await browser.pages();

        //Navigate to https://example.com website
        await page.goto('https://example.com');

        //Wait for loading all elements of https://www.iana.org/domains/example page.
        await page.waitForSelector('a[href="https://www.iana.org/domains/example"]');
        //Click link and wait for navigating to another page perfectly.
        await Promise.all([
            page.click('a[href="https://www.iana.org/domains/example"]'),
            page.waitForNavigation()
        ]);

        await page.waitForSelector('div.navigation a');
        await Promise.all([
            page.click('div.navigation a'),
            page.waitForNavigation()
        ]);

        //scroll to bottom of screen
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
        await new Promise(resolve => setTimeout(resolve, 2000));

        //scroll to top of screen
        await page.evaluate(() => {
            window.scrollTo(document.body.scrollHeight, 0);
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        //close the headless browser
        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();