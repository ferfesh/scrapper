import axios from 'axios';
import { load } from 'cheerio';
import { axiosInstance } from '../utils/client';
import { extractNumbersFromString } from '../utils/helpers';


export let errors = 0
const MAX_RETRIES = 3; // Maximum number of retries

export const altScrapper = async (url: string, selector: string) => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const { data } = await axiosInstance.get(url);
      const $ = load(data);
      let result: number = -1;
      switch (selector) {
        case 'amazon':
          result = extractNumbersFromString($('.a-price-whole').first().text().trim());
          break;
        case 'noon':
          result = extractNumbersFromString($('.priceNow').first().text().trim());
          break;
        case 'jumia':
          result = extractNumbersFromString($('.-b.-ltr.-tal.-fs24').first().text().trim());
          break;
      }
      console.log(result)
      return result;
    } catch (e) {
      retries++;
    }
  }
  errors++
}