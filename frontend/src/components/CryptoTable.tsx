import { useEffect, useState } from "react";

type Coin = {
  id: string;
  symbol: string;
  name: string;
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

export const CryptoTable = () => {
  const getCoins = () => {
    let url = "https://api.coingecko.com/api/v3/coins/";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => setCoins(data));
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [coins, setCoins] = useState<Coin[]>([]);
  useEffect(getCoins, []);

  return (
    <>
      <table className="table-auto text-sm text-gray-600 dark:text-gray-600">
        <thead>
          <tr className="pd-3">
            <th className="border border-slate-600 px-5 py-4">Logo</th>
            <th className="border border-slate-600 px-5 py-4">Nombre</th>
            <th className="border border-slate-600 px-5 py-4">ID</th>
            <th className="border border-slate-600 px-5 py-4">
              Precio Actual (USD)
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, key) => (
            <tr key={key}>
              <td className="border border-slate-600 px-8 py-4">
                <img src={coin.image.thumb} alt={`${coin.name} logo`} />
              </td>
              <td className="border border-slate-600 px-5 py-4">{coin.name}</td>
              <td className="border border-slate-600 px-5 py-4">
                {coin.symbol}
              </td>
              <td className="border border-slate-600 px-5 py-4">
                {currencyFormatter.format(coin.market_data.current_price.usd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
