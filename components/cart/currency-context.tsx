'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to CAD
};

// Static fallback rates (base: JPY) - Updated December 2025
const FALLBACK_CURRENCIES: Currency[] = [
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 1 }, // Base
  { code: "USD", symbol: "$", name: "US Dollar", rate: 0.0064 }, // 1 JPY = 0.0064 USD
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.0061 }, // 1 JPY = 0.0061 EUR
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.0051 }, // 1 JPY = 0.0051 GBP
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 0.0089 }, // 1 JPY = 0.0089 CAD
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 0.0099 }, // 1 JPY = 0.0099 AUD
];

const SUPPORTED_CURRENCIES: Currency[] = [...FALLBACK_CURRENCIES];

type CurrencyContextType = {
  selectedCurrency: Currency;
  currencies: Currency[];
  setCurrency: (currency: Currency) => void;
  convertAmount: (amount: string, fromCurrency: string) => string;
  isLoadingRates: boolean;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]);
  const [currencies, setCurrencies] = useState<Currency[]>(SUPPORTED_CURRENCIES);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);

  // Fetch real-time exchange rates from Frankfurter API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoadingRates(true);
      try {
        // Frankfurter API uses EUR as base, so we'll fetch rates and convert to JPY base
        const response = await fetch('https://api.frankfurter.app/latest?from=JPY');

        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }

        const data = await response.json();

        // Update currencies with real-time rates
        const updatedCurrencies: Currency[] = [
          { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 1 },
          { code: "USD", symbol: "$", name: "US Dollar", rate: data.rates.USD || FALLBACK_CURRENCIES[1].rate },
          { code: "EUR", symbol: "€", name: "Euro", rate: data.rates.EUR || FALLBACK_CURRENCIES[2].rate },
          { code: "GBP", symbol: "£", name: "British Pound", rate: data.rates.GBP || FALLBACK_CURRENCIES[3].rate },
          { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: data.rates.CAD || FALLBACK_CURRENCIES[4].rate },
          { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: data.rates.AUD || FALLBACK_CURRENCIES[5].rate },
        ];

        setCurrencies(updatedCurrencies);

        // Update selected currency with new rate if it exists
        const updatedSelectedCurrency = updatedCurrencies.find(c => c.code === selectedCurrency.code);
        if (updatedSelectedCurrency) {
          setSelectedCurrency(updatedSelectedCurrency);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates, using fallback rates:', error);
        // Keep using fallback rates
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchExchangeRates();

    // Refresh rates every 24 hours
    const interval = setInterval(fetchExchangeRates, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Load saved currency from localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    if (savedCurrency) {
      const currency = currencies.find(c => c.code === savedCurrency);
      if (currency) {
        setSelectedCurrency(currency);
      }
    } else {
      // If no saved currency, ensure we're using JPY from the current currencies state
      const jpyCurrency = currencies.find(c => c.code === 'JPY');
      if (jpyCurrency) {
        setSelectedCurrency(jpyCurrency);
      }
    }
  }, [currencies]);

  const setCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency.code);
  };

  const convertAmount = (amount: string, fromCurrency: string): string => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return amount;

    // Convert from the original currency to JPY first
    const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
    const fromRate = fromCurrencyData?.rate || 1;
    const jpyAmount = numAmount / fromRate;

    // Then convert from JPY to the selected currency
    const convertedAmount = jpyAmount * selectedCurrency.rate;
    return convertedAmount.toFixed(2);
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        currencies,
        setCurrency,
        convertAmount,
        isLoadingRates,
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
