import { useEffect, useState } from "react";
import { Calculator } from "./Calculator";
import { CryptoTable } from "./CryptoTable";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  lower_name: string;
  image: Image;
  market_data: MarketData;
};

type Image = {
  thumb: string;
};

type MarketData = {
  current_price: Price;
};

type Price = {
  usd: number;
};

export const Landing = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  const getCoins = () => {
    let url = "https://api.coingecko.com/api/v3/coins/";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data: Coin[]) => {
        setCoins(
          data.map((coin) => ({ ...coin, lower_name: coin.name.toLowerCase() }))
        );
      });
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(getCoins, []);

  return (
    <div className="md:w-[768px]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Koywe
      </h1>
      <p className="mb-6 text-sm font-normal text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
        Building the next generation of payments.
      </p>
      <Calculator coins={coins} currencyFormatter={currencyFormatter} />
      <CryptoTable coins={coins} currencyFormatter={currencyFormatter} />
    </div>
  );
};
