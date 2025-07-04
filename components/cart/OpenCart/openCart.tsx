import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import styles from "./openCart.module.scss";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className={clsx(styles.openCartContainer, className)}>
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 512 512"
        version="1.1"
        className={styles.openCartIcon}
      >
        <title>shopping-cart-filled</title>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="icon" fill="#fff" transform="translate(42.666667, 85.333333)">
            <path
              d="M7.10542736e-15,-1.42108547e-14 L70.3622093,-1.42108547e-14 L89.7493333,85.3333333 L378.389061,85.3333333 L337.246204,277.333333 L89.6377907,277.333333 L36.288,42.6666667 L7.10542736e-15,42.6666667 L7.10542736e-15,-1.42108547e-14 Z M138.666667,384 C156.339779,384 170.666667,369.673112 170.666667,352 C170.666667,334.326888 156.339779,320 138.666667,320 C120.993555,320 106.666667,334.326888 106.666667,352 C106.666667,369.673112 120.993555,384 138.666667,384 Z M288,384 C305.673112,384 320,369.673112 320,352 C320,334.326888 305.673112,320 288,320 C270.326888,320 256,334.326888 256,352 C256,369.673112 270.326888,384 288,384 Z"
              id="Combined-Shape"
            ></path>
          </g>
        </g>
      </svg>
      {quantity ? (
        <div className={styles.openCartQuantity}>
          <p>{quantity}</p>
        </div>
      ) : null}
    </div>
  );
}
