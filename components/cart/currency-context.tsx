'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to CAD
};

const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1 }, // Base
  { code: "USD", symbol: "$", name: "US Dollar", rate: 0.7256 }, // 1 CAD = 0.7256 USD
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.6208 }, // 1 CAD = 0.6208 EUR
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.5344 }, // 1 CAD = 0.5344 GBP
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 106.3 }, // 1 CAD = 106.3 JPY
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.112 }, // 1 CAD = 1.112 AUD
];

type CurrencyContextType = {
  selectedCurrency: Currency;
  currencies: Currency[];
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: string, fromCurrency: string) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);

  // Load saved currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const currency = SUPPORTED_CURRENCIES.find(c => c.code === savedCurrency);
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, []);

  const setCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency.code);
  };

  const convertAmount = (amount: string, fromCurrency: string): string => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return amount;

    // Convert from the original currency to CAD first
    const fromCurrencyData = SUPPORTED_CURRENCIES.find(c => c.code === fromCurrency);
    const fromRate = fromCurrencyData?.rate || 1;
    const cadAmount = numAmount / fromRate;

    // Then convert from CAD to the selected currency
    const convertedAmount = cadAmount * selectedCurrency.rate;
    return convertedAmount.toFixed(2);
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        currencies: SUPPORTED_CURRENCIES,
        setCurrency,
        convertAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
