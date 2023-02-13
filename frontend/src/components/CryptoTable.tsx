import { useEffect, useState } from "react";

type Coin = {
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

export const CryptoTable = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filter, setFilter] = useState<string>("");

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

  useEffect(getCoins, []);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase());
  };

  return (
    <div className="md:w-[768px]">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Koywe Crypto Market
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Here at Koywe we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>

      <div className="hidden md:block">
        <div className="relative border rounded-lg text-gray-600 focus-within:text-gray-400 mb-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button className="p-1 focus:outline-none focus:shadow-outline">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="py-2 text-sm rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
            placeholder="Search..."
            onChange={handleOnChange}
          />
        </div>
        <table className="table-auto text-sm text-gray-600 dark:text-gray-600 w-full">
          <thead>
            <tr className="pd-3">
              <th className="border border-slate-600 px-5 py-4 ">Logo</th>
              <th className="border border-slate-600 px-5 py-4 ">Nombre</th>
              <th className="border border-slate-600 px-5 py-4">ID</th>
              <th className="border border-slate-600 px-5 py-4 ">
                Precio Actual (USD)
              </th>
            </tr>
          </thead>
          <tbody>
            {coins
              .filter(
                (coin) =>
                  coin.lower_name.includes(filter) ||
                  coin.symbol.includes(filter)
              )
              .map((coin, key) => (
                <tr key={key}>
                  <td className="border border-slate-600 py-4">
                    <img
                      className="mx-auto"
                      src={coin.image.thumb}
                      alt={`${coin.name} logo`}
                    />
                  </td>
                  <td className="border border-slate-600 px-5 py-4">
                    {coin.name}
                  </td>
                  <td className="border border-slate-600 px-5 py-4">
                    {coin.symbol}
                  </td>
                  <td className="border border-slate-600 px-5 py-4">
                    {currencyFormatter.format(
                      coin.market_data.current_price.usd
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
