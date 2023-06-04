import Product, { IProduct } from "@/models/product";
import { altScrapper, errors, resetErrors } from "./alt";
import { sendTelegramMessage } from "@/utils/telegram";
import { delay } from "@/utils/helpers";


interface IScannedProduct {
  productId: IProduct['_id'];
  price: number;
}


function splitArray(array: any, size: number) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}


export const watch = async () => {
  const date = new Date();

  console.log(`This task is running every minute - ${date.getHours()}:${date.getMinutes()}`);

  console.time(`${date.getHours()}:${date.getMinutes()}`)
  // get all products that are active
  const p = await Product.find({ status: 1 }).populate('owner');
  const products = splitArray(p, 20);


  const promises = []
  const fetchedScannedProducts: IScannedProduct[] = [];

  for (const productsArr of products) {
    for (const product of productsArr) {
      const pricePromise = altScrapper(product.url, product.website);
      const scannedProductPromise = pricePromise.then(price => {
        return {
          productId: product._id,
          price: price as number
        };
      });
      promises.push(scannedProductPromise);
      await delay(1000);
    }
    const data = await Promise.all(promises);
    fetchedScannedProducts.push(...data)
    await delay(5000)
  }

  // initiate a promise for each product
  // const scannedProducts: Promise<IScannedProduct>[] = [];
  // for (const product of products) {
  //   const pricePromise = altScrapper(product.url, product.website);
  //   const scannedProductPromise = pricePromise.then(price => {
  //     return {
  //       productId: product._id,
  //       price: price as number
  //     };
  //   });
  //   scannedProducts.push(scannedProductPromise);
  // }

  // // wait for all promises to resolve
  // const fetchedScannedProducts = await Promise.all(scannedProducts);






  // create a map of products for easy access to product data in O(1)
  const productsMap = new Map();
  for (const product of p) {
    productsMap.set(product._id, product);
  }

  // compare the prices and send a message if the price is lower than the previous price
  for (const el of fetchedScannedProducts) {
    if (el?.price && el?.price <= productsMap.get(el.productId)?.price) {
      const product = productsMap.get(el.productId);
      sendTelegramMessage(product?.owner?.telegramToken, product?.owner?.telegramChatId, {
        currentPrice: el.price,
        previousPrice: product?.price as number,
        url: product?.url as string
      })
    }
  }

  console.timeEnd(`${date.getHours()}:${date.getMinutes()}`)


  console.log('Success', p.length - errors);
  console.log('errors', errors);
  resetErrors()
  delay(10000).then(() => watch())
}
//25