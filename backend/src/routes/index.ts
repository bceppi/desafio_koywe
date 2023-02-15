import Router from "@koa/router";
import { isInvalidAmount, isInvalidCrypto } from "../helpers";
import fetch from "node-fetch";

export const router = new Router();

const getPriceFromBook = (asks: string[][], requiredQuantity: number) => {
  let quantityCounter = 0;
  let totalPrice = 0;
  let askPrice: number;
  let askQuantity: number;
  let diffQuantity: number;
  for (const ask of asks) {
    askPrice = parseFloat(ask[0]);
    askQuantity = parseFloat(ask[1]);
    if (quantityCounter + askQuantity > requiredQuantity) {
      diffQuantity = requiredQuantity - quantityCounter;
      totalPrice += diffQuantity * askPrice;
      quantityCounter + diffQuantity;
      return totalPrice;
    } else {
      quantityCounter += askQuantity;
      totalPrice += askQuantity * askPrice;
    }
  }
  return totalPrice;
};

const getExchangeUrl = (exchange: string, crypto: string) => {
  if (exchange == "binance") {
    return `https://api4.binance.com/api/v3/depth?symbol=${crypto.toUpperCase()}USDT`;
  } else {
    return `https://api.exchange.coinbase.com/products/${crypto.toUpperCase()}-USDT/book?level=2`;
  }
};

const getPriceFromBinance = async (crypto: string, amount: number) => {
  let url = getExchangeUrl("binance", crypto);
  let totalPrice = 0;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(` binance${data.asks}`);
      console.log(` binance: ${data.length}`);
      totalPrice = getPriceFromBook(data.asks, amount);
    });
  return totalPrice;
};

const getPriceFromCoinbase = async (crypto: string, amount: number) => {
  let url = getExchangeUrl("coinbase", crypto);
  let totalPrice = 0;
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(` coinbase: ${data.asks}`);
      totalPrice = getPriceFromBook(data.asks, amount);
    });
  return totalPrice;
};

const getPriceFromExchanges = async (crypto: string, amount: number) => {
  const [binancePrice, coinbasePrice] = await Promise.all([
    getPriceFromBinance(crypto, amount),
    getPriceFromCoinbase(crypto, amount),
  ]);
  return [binancePrice, coinbasePrice];
};

router.get("/best-available-exchange", async (ctx, next) => {
  const amount = ctx.request.query.amount as string;
  const crypto = ctx.request.query.crypto as string;
  if (!amount || !crypto) {
    ctx.body = {
      message: "Debes indicar tanto el monto como la crypto moneda.",
    };
    ctx.status = 400;
  } else {
    if (isInvalidCrypto(crypto) || isInvalidAmount(parseInt(amount))) {
      ctx.body = {
        message: "Crypto moneda inválida. Solo se acepta BTC o ETH.",
      };
      ctx.status = 400;
    } else {
      const [binancePrice, coinbasePrice] = await getPriceFromExchanges(
        crypto,
        parseInt(amount)
      );
      let usdAmount: number;
      let bestExchange: string;
      if (binancePrice <= coinbasePrice) {
        usdAmount = binancePrice;
        bestExchange = "binance";
      } else {
        usdAmount = coinbasePrice;
        bestExchange = "coinbase";
      }
      ctx.body = {
        crypto: crypto.toUpperCase(),
        amount: amount,
        usdAmount: usdAmount,
        exchange: bestExchange,
      };
    }
  }
});
