import axios from 'axios';
import { load } from 'cheerio';
import { axiosInstance } from '../utils/client';
import { delay, extractNumbersFromString } from '../utils/helpers';


export let errors = 0
const MAX_RETRIES = 3; // Maximum number of retries
export let REQUESTS = 0;

export const resetErrors = () => {
  errors = 0
}
export const resetRequests = () => {
  REQUESTS = 0
}

export const altScrapper = async (url: string, selector: string) => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      REQUESTS++;
      // const { data } = await axiosInstance.get(url);
      const { data } = await axios.get(`https://hello-world-raspy-waterfall-bc7b.hamedsama1122021.workers.dev/?url=${url}`, {
        timeout: 10000,
      });
      const $ = load(data);
      let result: number = NaN;

      if (selector === 'Amazon') {
        const checkIfNotExists = $('#availability .a-size-medium.a-color-price').length > 0;
        if (checkIfNotExists)
          return result;
      }

      switch (selector) {
        case 'Amazon':
          result = extractNumbersFromString($('.celwidget .a-section.a-spacing-none.aok-align-center .a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-price-whole').first().text().trim());
          break;
        case 'Noon':
          result = extractNumbersFromString($('.priceNow').first().text().trim());
          break;
      }
      // console.log(result)
      return result;
    } catch (e: any) {
      console.log(e.message)
      retries++;
      // delay(1500);
    }
  }
  errors++
}