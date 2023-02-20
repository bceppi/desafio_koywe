import Router from "@koa/router";
import {
  isInvalidAmount,
  isInvalidCrypto,
  getPriceFromExchanges,
  getBestExchangeFromPrice,
} from "../helpers";

export const router = new Router();

router.get("/best-available-exchange", async (ctx, next) => {
  const amount = ctx.request.query.amount as string;
  const crypto = ctx.request.query.crypto as string;
  if (!amount || !crypto) {
    ctx.body = {
      message: "Debes indicar tanto el monto como la crypto moneda.",
    };
    ctx.status = 400;
  } else {
    if (isInvalidCrypto(crypto)) {
      ctx.body = {
        message: "Crypto moneda inválida. Solo se acepta BTC o ETH.",
      };
      ctx.status = 400;
    } else if (isInvalidAmount(parseInt(amount))) {
      ctx.body = {
        message: "Monto inválido.",
      };
      ctx.status = 400;
    } else {
      try {
        const [binancePrice, coinbasePrice] = await getPriceFromExchanges(
          crypto,
          parseInt(amount)
        );
        let { usdAmount, bestExchange } = getBestExchangeFromPrice(
          binancePrice,
          coinbasePrice
        );
        ctx.body = {
          crypto: crypto.toUpperCase(),
          amount: amount,
          usdAmount: usdAmount.toFixed(2),
          exchange: bestExchange,
        };
      } catch (e) {
        let result = "";
        if (typeof e === "string") {
          result = e.toUpperCase();
        } else if (e instanceof Error) {
          result = e.message;
        }
        ctx.body = { message: result };
      }
      ctx.status = 200;
    }
  }
});

// const isThereEnoughAsks = (asks: string[][], requiredQuantity: number) => {
//   let quantityCounter = 0;
//   let askQuantity: number;
//   for (const ask of asks) {
//     askQuantity = parseFloat(ask[1]);
//     quantityCounter += askQuantity;
//     if (quantityCounter >= requiredQuantity) {
//       return true;
//     }
//   }
//   return false;
// };
