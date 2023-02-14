import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import fetch from "node-fetch";

const app = new Koa();
const router = new Router();

let PORT = 3000;

const isInvalidCrypto = (crypto) => {
  return crypto.toLowerCase() != "btc" && crypto.toLowerCase() != "eth";
};

const isInvalidAmount = (amount) => {
  return isNaN(amount) || parseInt(amount) < 0;
};

const getBinanceOrderBook = (crypto, amount) => {
  const url = `https://api4.binance.com/api/v3/depth`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

router.get("/best-available-exchange", (ctx, next) => {
  const { amount, crypto } = ctx.request.query;
  if (!amount || !crypto) {
    ctx.body = {
      message: "Debes indicar tanto el monto como la crypto moneda.",
    };
    ctx.status = 400;
  } else {
    if (isInvalidCrypto(crypto) || isInvalidAmount(amount)) {
      ctx.body = {
        message: "Crypto moneda inválida. Solo se acepta BTC o ETH.",
      };
      ctx.status = 400;
    } else {
      // recibo amount y crypto
      // pregunto a ambos exchanges
      getBinanceOrderBook(amount, crypto);
      // retorno best exchange
      // y el monto
      ctx.body = {
        crypto: crypto.toUpperCase(),
        amount: amount,
        usdAmount: 43240000,
        exchange: "coinbase",
      };
    }
  }
});

app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, (err) => {
  if (err) {
    return console.error("Failed", err);
  }
  console.log(`Listening on port ${PORT}`);
  return app;
});
