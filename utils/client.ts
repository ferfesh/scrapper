import axios from "axios";
import { HttpsProxyAgent } from 'https-proxy-agent'


// Proxy configuration
const proxyHost = 'zproxy.lum-superproxy.io';
const proxyPort = 9222;
const proxyAuth = 'brd-customer-hl_397e8cfa-zone-scraping_browser:pv9u94nvzoz2';
const proxyPassword = 'pv9u94nvzoz2';

// Proxy configuration
// const proxyConfig = {
//   host: proxyHost,
//   port: proxyPort,
//   auth: {
//     username: proxyAuth,
//     password: proxyPassword
//   }
// };

// Axios instance with proxy configuration
export const axiosInstance = axios.create({
  // headers: {
  //   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42'
  // },
  proxy: false,
  httpsAgent: new HttpsProxyAgent('http://spns1ir6x6:qUyt2u5oO7d9yVpkYx@eg.smartproxy.com:20000'),
  timeout: 10000,
});