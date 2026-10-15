import type { Product } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { MinusIcon, PlusIcon } from "./Icons";
import iconAddToCart from "../images/icon-add-to-cart.svg";

type ProductCardProps = {
  product: Product;
  quantity: number; // 0 means it's not in the cart yet
  onAdd: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
};

function ProductCard({ product, quantity, onAdd, onIncrease, onDecrease }: ProductCardProps) {
  const { id, name, category, price, images } = product;
  const inCart = quantity > 0;

  return (
    <li>
      <div className="relative">
        {/* the browser picks the right picture size for the screen */}
        <picture>
          <source media="(min-width: 1024px)" srcSet={images.desktop} />
          <source media="(min-width: 640px)" srcSet={images.tablet} />
          <img
            src={images.mobile}
            alt={name}
            className={`w-full rounded-lg border-2 ${
              inCart ? "border-red-700" : "border-transparent"
            }`}
          />
        </picture>

        {inCart ? (
          <div className="absolute -bottom-5 left-1/2 flex w-40 -translate-x-1/2 items-center justify-between rounded-full bg-red-700 px-3 py-3 text-sm font-semibold text-white">
            <button
              onClick={() => onDecrease(id)}
              aria-label={`Decrease quantity of ${name}`}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-white hover:bg-white hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MinusIcon />
            </button>

            <span aria-live="polite">{quantity}</span>

            <button
              onClick={() => onIncrease(id)}
              aria-label={`Increase quantity of ${name}`}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-white hover:bg-white hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <PlusIcon />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onAdd(id)}
            className="absolute -bottom-5 left-1/2 flex w-40 -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-rose-400 bg-white py-3 text-sm font-semibold text-rose-900 hover:border-red-700 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            <img src={iconAddToCart} alt="" />
            Add to Cart
          </button>
        )}
      </div>

      <p className="mt-9 text-sm text-rose-500">{category}</p>
      <h2 className="font-semibold text-rose-900">{name}</h2>
      <p className="font-semibold text-red-700">{formatPrice(price)}</p>
    </li>
  );
}

export default ProductCard;
