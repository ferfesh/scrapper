"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./models/connect"));
const main_1 = require("./scrappers/main");
dotenv_1.default.config();
(0, connect_1.default)();
// corn.schedule('*/2 * * * *', watch, {
//   name: 'Main Job',
// });
(0, main_1.watch)();
// (async () => {
//     const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
//     console.time('timer')
//     await delay(5000);
//     await Promise.all([
//         altScrapper('https://www.amazon.eg/-/en/XO-EP21-Wired-Earphones-Microphone/dp/B09DLCDZ46/ref=sr_1_8?pf_rd_i=18018102031&pf_rd_m=A1ZVRGNO5AYLOV&pf_rd_p=95b8cc7d-ce63-49fc-bd0a-c7ae7548fdb5&pf_rd_r=Y2WYQPT417JPSGJBNKAM&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1685291620&refinements=p_4%3AXO&s=electronics&sr=1-8', 'amazon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.jumia.com.eg/ar/rexona-workout-roll-on-antiperspirant-for-men-50ml-24776844.html', 'jumia'),
//         // altScrapper('https://www.jumia.com.eg/ar/nivea-fresh-active-deodorant-roll-on-for-men-50ml-21150726.html', 'jumia'),
//         // altScrapper('https://www.amazon.eg/-/en/XO-EP21-Wired-Earphones-Microphone/dp/B09DLCDZ46/ref=sr_1_8?pf_rd_i=18018102031&pf_rd_m=A1ZVRGNO5AYLOV&pf_rd_p=95b8cc7d-ce63-49fc-bd0a-c7ae7548fdb5&pf_rd_r=Y2WYQPT417JPSGJBNKAM&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1685291620&refinements=p_4%3AXO&s=electronics&sr=1-8', 'amazon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.jumia.com.eg/ar/rexona-workout-roll-on-antiperspirant-for-men-50ml-24776844.html', 'jumia'),
//         // altScrapper('https://www.jumia.com.eg/ar/nivea-fresh-active-deodorant-roll-on-for-men-50ml-21150726.html', 'jumia'),
//         // altScrapper('https://www.amazon.eg/-/en/XO-EP21-Wired-Earphones-Microphone/dp/B09DLCDZ46/ref=sr_1_8?pf_rd_i=18018102031&pf_rd_m=A1ZVRGNO5AYLOV&pf_rd_p=95b8cc7d-ce63-49fc-bd0a-c7ae7548fdb5&pf_rd_r=Y2WYQPT417JPSGJBNKAM&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1685291620&refinements=p_4%3AXO&s=electronics&sr=1-8', 'amazon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.jumia.com.eg/ar/rexona-workout-roll-on-antiperspirant-for-men-50ml-24776844.html', 'jumia'),
//         // altScrapper('https://www.jumia.com.eg/ar/nivea-fresh-active-deodorant-roll-on-for-men-50ml-21150726.html', 'jumia'),
//         // altScrapper('https://www.amazon.eg/-/en/XO-EP21-Wired-Earphones-Microphone/dp/B09DLCDZ46/ref=sr_1_8?pf_rd_i=18018102031&pf_rd_m=A1ZVRGNO5AYLOV&pf_rd_p=95b8cc7d-ce63-49fc-bd0a-c7ae7548fdb5&pf_rd_r=Y2WYQPT417JPSGJBNKAM&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1685291620&refinements=p_4%3AXO&s=electronics&sr=1-8', 'amazon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.jumia.com.eg/ar/rexona-workout-roll-on-antiperspirant-for-men-50ml-24776844.html', 'jumia'),
//         // altScrapper('https://www.jumia.com.eg/ar/nivea-fresh-active-deodorant-roll-on-for-men-50ml-21150726.html', 'jumia'),
//         // altScrapper('https://www.amazon.eg/-/en/XO-EP21-Wired-Earphones-Microphone/dp/B09DLCDZ46/ref=sr_1_8?pf_rd_i=18018102031&pf_rd_m=A1ZVRGNO5AYLOV&pf_rd_p=95b8cc7d-ce63-49fc-bd0a-c7ae7548fdb5&pf_rd_r=Y2WYQPT417JPSGJBNKAM&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1685291620&refinements=p_4%3AXO&s=electronics&sr=1-8', 'amazon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://www.jumia.com.eg/ar/rexona-workout-roll-on-antiperspirant-for-men-50ml-24776844.html', 'jumia'),
//         // altScrapper('https://www.jumia.com.eg/ar/nivea-fresh-active-deodorant-roll-on-for-men-50ml-21150726.html', 'jumia'),
//         // altScrapper('https://www.amazon.eg/-/en/XO-EP21-Wired-Earphones-Microphone/dp/B09DLCDZ46/ref=sr_1_8?pf_rd_i=18018102031&pf_rd_m=A1ZVRGNO5AYLOV&pf_rd_p=95b8cc7d-ce63-49fc-bd0a-c7ae7548fdb5&pf_rd_r=Y2WYQPT417JPSGJBNKAM&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1685291620&refinements=p_4%3AXO&s=electronics&sr=1-8', 'amazon'),
//         // altScrapper('https://www.noon.com/egypt-ar/ae-super-soft-thermal-long-sleeve-shirt/ZCD9E77A4594E9707B88DZ/p/?o=zcd9e77a4594e9707b88dz-1', 'noon'),
//         // altScrapper('https://elsindbadstore.com/en/hood-wall-mounted-60-cm-cwb-6441-xn.html', 'hatly'),
//     ])
//     console.timeEnd('timer')
//     console.log(errors)
// })();
