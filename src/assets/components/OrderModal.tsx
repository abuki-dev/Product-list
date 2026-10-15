import type { CartLine } from "../types";
import { formatPrice } from "../utils/formatPrice";
import iconOrderConfirmed from "../images/icon-order-confirmed.svg";

type OrderModalProps = {
  lines: CartLine[];
  onStartNew: () => void;
};

function OrderModal({ lines, onStartNew }: OrderModalProps) {
  const orderTotal = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0);

  return (
    // the dark background covers the whole page, the white card sits on top of it
    // (on phones it slides up from the bottom, on bigger screens it's centered)
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6"
    >
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-xl sm:p-10">
        <img src={iconOrderConfirmed} alt="" className="h-12 w-12" />

        <h2 id="order-title" className="mt-6 text-4xl font-bold leading-tight text-rose-900">
          Order Confirmed
        </h2>
        <p className="mt-2 text-rose-500">We hope you enjoy your food!</p>

        <div className="mt-8 rounded-lg bg-rose-50 p-4 sm:p-6">
          <ul>
            {lines.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center gap-4 border-b border-rose-100 py-4 first:pt-0"
              >
                <img
                  src={product.images.thumbnail}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-rose-900">{product.name}</p>
                  <p className="mt-1 flex gap-2 text-sm">
                    <span className="font-semibold text-red-700">{quantity}x</span>
                    <span className="text-rose-500">@ {formatPrice(product.price)}</span>
                  </p>
                </div>
                <p className="font-semibold text-rose-900">
                  {formatPrice(quantity * product.price)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-rose-900">Order Total</p>
            <p className="text-3xl font-bold text-rose-900">{formatPrice(orderTotal)}</p>
          </div>
        </div>

        <button
          onClick={onStartNew}
          autoFocus
          className="mt-8 w-full rounded-full bg-red-700 py-4 font-semibold text-white hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default OrderModal;
