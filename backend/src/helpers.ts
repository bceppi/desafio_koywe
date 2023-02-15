export const isInvalidCrypto = (crypto: string) => {
  return crypto.toLowerCase() != "btc" && crypto.toLowerCase() != "eth";
};

export const isInvalidAmount = (amount: number) => {
  return isNaN(amount) || amount < 0;
};
