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
  // proxy: false,
  httpAgent: new HttpsProxyAgent('https://spns1ir6x6:qUyt2u5oO7d9yVpkYx@gate.smartproxy.com:7000'),
});