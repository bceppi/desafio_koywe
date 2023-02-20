import { FC, useEffect, useState } from "react";
import { Coin } from "./Landing";

interface CalculatorProps {
  coins: Coin[];
  currencyFormatter: Intl.NumberFormat;
}

export const Calculator: FC<CalculatorProps> = ({
  coins,
  currencyFormatter,
}): JSX.Element => {
  const [currencyAmount, setCurrencyAmount] = useState<number | undefined>(1);
  const [currencyCurrentPrice, setCurrencyCurrentPrice] = useState<number>(1);
  const [currentPrice, setCurrentPrice] = useState<String>("");

  const getCurrentBTCPrice = () => {
    coins.forEach((coin) => {
      if (coin.symbol === "btc") {
        let usdPrice = coin.market_data.current_price.usd;
        setCurrencyCurrentPrice(usdPrice);
        setCurrentPrice(currencyFormatter.format(usdPrice));
      }
    });
  };

  useEffect(getCurrentBTCPrice, [coins]);

  const handleCurrencyAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) {
      setCurrencyAmount(undefined);
      setCurrentPrice(currencyFormatter.format(0));
    } else {
      let { value, min, max } = e.target;
      let currentAmount = Math.max(
        Number(min),
        Math.min(Number(max), Number(value))
      );

      setCurrencyAmount(currentAmount);
      setCurrentPrice(
        currencyFormatter.format(currentAmount * currencyCurrentPrice)
      );
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let target = e.target as HTMLSelectElement;
    let options = target.options;
    let selected = target.selectedIndex;
    let price = options[selected].getAttribute("data-currentprice");
    setCurrencyAmount(1);
    if (price) {
      let floatPrice = parseFloat(price);
      setCurrencyCurrentPrice(floatPrice);
      setCurrentPrice(currencyFormatter.format(floatPrice));
    }
  };

  return (
    <>
      <div>
        <div className="flex">
          <h2 className="self-start mb-1 text-xl font-bold leading-none tracking-tight text-gray-700 md:text-l lg:text-l">
            Calculadora de precios
          </h2>
        </div>
        <div className="flex">
          <p className="self-start text-left text-sm md:text-base text-gray-600 mb-2">
            Obtén el precio actual de cualquier crypto moneda.
          </p>
        </div>
      </div>
      <div className="border pt-4 pb-3 px-3 rounded-lg mb-2">
        <div className="flex flex-wrap">
          <div className="flex mb-1">
            <p className="mr-1 my-auto text-sm font-medium text-gray-500">
              Una cantidad de{" "}
            </p>
            <div className="mr-1 my-auto">
              <input
                className="border-b text-sm text-violet-600 font-medium focus:outline-none"
                type="number"
                value={currencyAmount}
                onChange={handleCurrencyAmountChange}
                max="9999999"
                min={0}
              />
            </div>
          </div>
          <div className="flex mb-1">
            <p className="mr-1 my-auto text-sm font-medium text-gray-500">
              monedas
            </p>
            <div className="mr-1 my-auto">
              <select
                className="border-b text-sm font-medium text-violet-600 focus:outline-none w-full"
                onChange={handleCurrencyChange}
              >
                {coins.map((coin, key) => (
                  <option
                    key={key}
                    value={coin.symbol}
                    data-currentprice={coin.market_data.current_price.usd}
                  >
                    {coin.symbol.toUpperCase()} - {coin.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex mb-1">
            <p className="mr-1 my-auto text-sm font-medium text-gray-500">
              tiene un precio actual de{" "}
            </p>
            <p className="mr-1 my-auto text-sm font-medium border-b ">
              {currentPrice}
            </p>
            <p className="my-auto text-sm font-medium text-gray-500">USD</p>
          </div>
        </div>
      </div>
    </>
  );
};
