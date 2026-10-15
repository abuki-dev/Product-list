import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import OrderModal from "../components/OrderModal";
import { products } from "./products";
import type { CartItem, CartLine } from "../types";

function App() {
  // the cart only remembers which product and how many of it
  const [cart, setCart] = useState<CartItem[]>([]);

  // whether the "Order Confirmed" popup is showing
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // first click on "Add to Cart": put the product in with quantity 1
  function handleAdd(id: number) {
    setCart((prev) => [...prev, { productId: id, quantity: 1 }]);
  }

  function handleIncrease(id: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  // lower the quantity by 1, and if it reaches 0 take it out of the cart
  function handleDecrease(id: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // the little x in the cart: remove the whole product no matter the quantity
  function handleRemove(id: number) {
    setCart((prev) => prev.filter((item) => item.productId !== id));
  }

  // "Start New Order": empty the cart and close the popup
  function handleStartNew() {
    setCart([]);
    setOrderConfirmed(false);
  }

  // how many of one product are in the cart (0 if none)
  function getQuantity(id: number) {
    return cart.find((item) => item.productId === id)?.quantity ?? 0;
  }

  // join each cart item with its full product info (name, price, pictures)
  const cartLines: CartLine[] = cart.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });

  return (
    <div className="min-h-screen bg-rose-50">
      <main className="mx-auto max-w-7xl px-6 py-10 lg:flex lg:items-start lg:gap-8 lg:py-20">
        <section className="flex-1">
          <h1 className="text-4xl font-bold text-rose-900">Desserts</h1>

          <ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={getQuantity(product.id)}
                onAdd={handleAdd}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}
          </ul>
        </section>

        <div className="mt-10 lg:mt-0">
          <Cart
            lines={cartLines}
            onRemove={handleRemove}
            onConfirm={() => setOrderConfirmed(true)}
          />
        </div>
      </main>

      {orderConfirmed && <OrderModal lines={cartLines} onStartNew={handleStartNew} />}
    </div>
  );
}

export default App;
