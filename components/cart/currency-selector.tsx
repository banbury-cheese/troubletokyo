import { useState } from 'react';
import { useCurrency } from './currency-context';
import styles from './currency-selector.module.scss';

export default function CurrencySelector() {
  const { selectedCurrency, currencies, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.currencySelector}>
      <button
        className={styles.currencyButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select currency"
      >
        <span className={styles.currencySymbol}>{selectedCurrency.symbol}</span>
        <span className={styles.currencyCode}>{selectedCurrency.code}</span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className={styles.currencyDropdown}>
          {currencies.map((currency) => (
            <button
              key={currency.code}
              className={`${styles.currencyOption} ${
                currency.code === selectedCurrency.code ? styles.selected : ''
              }`}
              onClick={() => {
                setCurrency(currency);
                setIsOpen(false);
              }}
            >
              <span className={styles.currencySymbol}>{currency.symbol}</span>
              <span className={styles.currencyDetails}>
                <span className={styles.currencyCode}>{currency.code}</span>
                {/* <span className={styles.currencyName}>{currency.name}</span> */}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
