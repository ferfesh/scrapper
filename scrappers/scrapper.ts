import puppeteer, { type Browser } from 'puppeteer';


export const url = 'https://www.amazon.eg/-/en/Apple-iPhone-14-Pro-128/dp/B0BDJ5CSHF/ref=sr_1_21?pf_rd_i=21832883031&pf_rd_m=A1ZVRGNO5AYLOV&pf_rd_p=2eb88713-dff6-4694-b086-70d6edf29557&pf_rd_r=KMK02S87HF1CSSH13AJN&pf_rd_s=merchandised-search-10&pf_rd_t=101&qid=1685288033&refinements=p_89%3AApple&s=electronics&sr=1-21';
export const scraper = async (url: string, selector: string) => {
  let browser: Browser | null = null;
  const timer = Date.now().toString() 
  // console.time(timer);
  try {
    // browser = await puppeteer.connect({
    //   browserWSEndpoint: 'wss://brd-customer-hl_397e8cfa-zone-scraping_browser:pv9u94nvzoz2@zproxy.lum-superproxy.io:9222'
    // })
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // const body = await page.$('body');

    // const el = await body?.$('.a-price-whole');
    const price = await page.$eval('.a-price-whole', (element) => element?.textContent?.trim());

    console.log(price)

    // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    // await delay(2000);

    // await page.goto('https://www.amazon.eg/-/en/Apple-iPhone-14-Pro-256/dp/B0BDJ27XXT/ref=d_pd_sbs_sccl_2_3/258-0517252-3961029?pd_rd_w=gfSSY&content-id=amzn1.sym.82f1bd6a-3c12-4fce-bbc7-0087ec5712fc&pf_rd_p=82f1bd6a-3c12-4fce-bbc7-0087ec5712fc&pf_rd_r=DSYMBPYFPTA0GCTPSSRM&pd_rd_wg=7ozwZ&pd_rd_r=d7085a67-ce74-4208-9ca9-21c84a3bce32&pd_rd_i=B0BDJ27XXT&psc=1')

    // const priceTwo = await page.$eval('.a-price-whole', (element) => element?.textContent?.trim());

    // console.log(priceTwo)

    // const text = await el.evaluate((e) => e?.innerHTML);
    // console.log(text)



    // const html = await page.evaluate( 
    //   () => document.querySelectorAll('.css-1gatmva .e1v1l3u10')
    // );
    // console.log(html)
    // const jobs = await page.evaluate(() => {
    //   const jobsCards = Array.from(document.querySelectorAll('.css-1gatmva .e1v1l3u10'));
    //   console.log('a7a')
    //   console.log(jobsCards)
    //   return jobsCards
    // })
    // console.log(jobs)
    // const jobNodes = document.querySelectorAll('.css-1gatmva .e1v1l3u10');
    // const jobList = [];

    // for (const node of jobNodes) {
    //   const jobTitle = node?.querySelector('.css-1buaf54')?.textContent;
    //   const company = node?.querySelector('.css-4lw6yx')?.textContent;
    //   const location = node?.querySelector('.css-1tky6f2')?.textContent;
    //   const jobUrl = node?.href;

    //   jobList.push({ jobTitle, company, location, jobUrl });
    // }

    // return jobList;
    // console.log(jobNodes)
    // });

    // console.log(jobs);

  } catch (e) {
    console.log(e)
  } finally {
    console.log('Done');
    // console.timeEnd(timer)
    // await browser?.close();
  }
};
