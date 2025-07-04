"use client";

import clsx from "clsx";
import { useProduct, useUpdateURL } from "@/components/product/product-context";
import { ProductOption, ProductVariant } from "@/lib/shopify/types";
import styles from "./variantSelector.module.scss";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

  return (
    <div className={styles.sizeSelection}>
      {options.map((option) => (
        <form key={option.id}>
          <div className={styles.sizeButtons}>
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();

              // Base option params on current selectedOptions so we can preserve any other param state.
              const optionParams = { ...state, [optionNameLowerCase]: value };

              // Filter out invalid options and check if the option combination is available for sale.
              const filtered = Object.entries(optionParams).filter(
                ([key, value]) =>
                  options.find(
                    (option) =>
                      option.name.toLowerCase() === key &&
                      option.values.includes(value)
                  )
              );
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) =>
                    combination[key] === value && combination.availableForSale
                )
              );

              // The option is active if it's in the selected options.
              const isActive = state[optionNameLowerCase] === value;

              return (
                <button
                  formAction={() => {
                    const newState = updateOption(optionNameLowerCase, value);
                    updateURL(newState);
                  }}
                  key={value}
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                  title={`${option.name} ${value}${
                    !isAvailableForSale ? " (Out of Stock)" : ""
                  }`}
                  className={clsx(styles.sizeButton, {
                    [styles.selected]: isActive,
                    [styles.disabled]: !isAvailableForSale,
                  })}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </form>
      ))}
    </div>
  );
}
