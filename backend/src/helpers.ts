import fetch from "node-fetch";

export const isInvalidCrypto = (crypto: string) => {
  return crypto.toLowerCase() != "btc" && crypto.toLowerCase() != "eth";
};

export const isInvalidAmount = (amount: number) => {
  return isNaN(amount) || amount < 0;
};

export const getExchangeUrl = (exchange: string, crypto: string) => {
  if (exchange == "binance") {
    return `https://api4.binance.com/api/v3/depth?symbol=${crypto.toUpperCase()}USDT`;
  } else {
    return `https://api.exchange.coinbase.com/products/${crypto.toUpperCase()}-USDT/book?level=2`;
  }
};

export const getPriceFromExchanges = async (crypto: string, amount: number) => {
  const [binancePrice, coinbasePrice] = await Promise.all([
    getPriceFromBinance(crypto, amount),
    getPriceFromCoinbase(crypto, amount),
  ]);
  return [binancePrice, coinbasePrice];
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
      totalPrice = getPriceFromBook(data.asks, amount);
    });
  return totalPrice;
};

export const getPriceFromCoinbase = async (crypto: string, amount: number) => {
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
      totalPrice = getPriceFromBook(data.asks, amount);
    });
  return totalPrice;
};

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
      quantityCounter += diffQuantity;
      return totalPrice;
    } else {
      quantityCounter += askQuantity;
      totalPrice += askQuantity * askPrice;
    }
  }
  if (quantityCounter < requiredQuantity) {
    throw new Error(
      "No existen suficientes opciones de venta para el monto solicitado."
    );
  }
  return totalPrice;
};

export const getBestExchangeFromPrice = (
  binancePrice: number,
  coinbasePrice: number
) => {
  let usdAmount: number;
  let bestExchange: string;
  if (binancePrice <= coinbasePrice) {
    usdAmount = binancePrice;
    bestExchange = "binance";
  } else {
    usdAmount = coinbasePrice;
    bestExchange = "coinbase";
  }
  return { usdAmount: usdAmount, bestExchange: bestExchange };
};
