'use client';

import clsx from 'clsx';
import { useCurrency } from './cart/currency-context';

const Price = ({
  amount,
  className,
  currencyCode = "JPY",
  currencyCodeClassName,
  convertCurrency = false,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  convertCurrency?: boolean;
} & React.ComponentProps<"p">) => {
  const { selectedCurrency, convertAmount } = useCurrency();

  const displayAmount = convertCurrency
    ? convertAmount(amount, currencyCode)
    : amount;

  const displayCurrency = convertCurrency
    ? selectedCurrency.code
    : currencyCode;

  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: displayCurrency,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(displayAmount))}`}
      <span
        className={clsx("ml-1 inline", currencyCodeClassName)}
      >{`${displayCurrency}`}</span>
    </p>
  );
};

export default Price;
