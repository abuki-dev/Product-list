import type { CartLine } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { RemoveIcon } from "./Icons";
import illustrationEmptyCart from "../images/illustration-empty-cart.svg";
import iconCarbonNeutral from "../images/icon-carbon-neutral.svg";

type CartProps = {
  lines: CartLine[];
  onRemove: (id: number) => void;
  onConfirm: () => void;
};

function Cart({ lines, onRemove, onConfirm }: CartProps) {

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const orderTotal = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0);

  return (
    <aside className="rounded-xl bg-white p-6 lg:w-96 lg:shrink-0">
      <h2 className="text-2xl font-bold text-red-700">Your Cart ({itemCount})</h2>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center py-8">
          <img src={illustrationEmptyCart} alt="" className="h-32 w-32" />
          <p className="mt-4 text-sm font-semibold text-rose-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <ul className="mt-6">
            {lines.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 border-b border-rose-100 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-rose-900">{product.name}</p>
                  <p className="mt-2 flex gap-2 text-sm">
                    <span className="font-semibold text-red-700">{quantity}x</span>
                    <span className="text-rose-500">@ {formatPrice(product.price)}</span>
                    <span className="font-semibold text-rose-500">
                      {formatPrice(quantity * product.price)}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => onRemove(product.id)}
                  aria-label={`Remove ${product.name} from cart`}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rose-300 text-rose-300 hover:border-rose-900 hover:text-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                >
                  <RemoveIcon />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-rose-900">Order Total</p>
            <p className="text-3xl font-bold text-rose-900">{formatPrice(orderTotal)}</p>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-rose-50 p-4 text-sm text-rose-900">
            <img src={iconCarbonNeutral} alt="" />
            <span>
              This is a <strong className="font-semibold">carbon-neutral</strong> delivery
            </span>
          </p>

          <button
            onClick={onConfirm}
            className="mt-6 w-full rounded-full bg-red-700 py-4 font-semibold text-white hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
}

export default Cart;
