import { useEffect, useState } from "react";
import { Coin } from "./Landing";
import Fuse from "fuse.js";

interface TableProps {
  coins: Coin[];
  currencyFormatter: Intl.NumberFormat;
}

export const CryptoTable: React.FC<TableProps> = ({
  coins,
  currencyFormatter,
}) => {
  const [searchResults, setSearchResults] = useState<Coin[]>(coins);

  const searchOptions = {
    threshold: 0.3,
    keys: ["name", "symbol"],
  };

  const fuse = new Fuse(coins, searchOptions);

  useEffect(() => setSearchResults(coins), [coins]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setSearchResults(coins);
    } else {
      setSearchResults(
        fuse.search(e.target.value).map((result) => result.item)
      );
    }
  };

  return (
    <div className="hidden md:block">
      <div>
        <div className="flex">
          <h2 className="self-start mt-5 mb-1 text-xl font-bold leading-none tracking-tight text-gray-700 md:text-l">
            Tabla de precios
          </h2>
        </div>
        <div className="flex">
          <p className="text-gray-600 mb-2">
            Observa el precio actual de las principales crypto monedas del
            mercado.
          </p>
        </div>
      </div>
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
          placeholder="Buscar..."
          onChange={handleOnChange}
        />
      </div>
      <div className="border rounded-lg">
        <table className="table-auto text-sm text-gray-600 dark:text-gray-600 w-full">
          <thead>
            <tr className="pd-3">
              <th className="border-r border-b px-5 py-4 ">Logo</th>
              <th className="border-r border-b px-5 py-4 ">Nombre</th>
              <th className="border-r border-b px-5 py-4">ID</th>
              <th className="border-r border-b px-5 py-4 ">
                Precio Actual (USD)
              </th>
            </tr>
          </thead>
          <tbody>
            <Rows coins={searchResults} currencyFormatter={currencyFormatter} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Rows: React.FC<{
  coins: Coin[];
  currencyFormatter: Intl.NumberFormat;
}> = ({ coins, currencyFormatter }) => {
  return (
    <>
      {coins.map((coin, key) => (
        <tr key={key} className="">
          <td className="border-r border-b py-4 ">
            <img
              className="mx-auto"
              src={coin.image.thumb}
              alt={`${coin.name} logo`}
            />
          </td>
          <td className="border-r border-b px-5 py-4 ">{coin.name}</td>
          <td className="border-r border-b px-5 py-4 ">{coin.symbol}</td>
          <td className="border-b px-5 py-4 ">
            {currencyFormatter.format(coin.market_data.current_price.usd)}
          </td>
        </tr>
      ))}
    </>
  );
};
