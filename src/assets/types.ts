// one dessert in the shop, with its 4 image sizes
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  images: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

// what's actually stored in the cart: just which product and how many.
// (the name, price and pictures are looked up from the product list)
export type CartItem = {
  productId: number;
  quantity: number;
};

// a cart item joined together with its full product info,
// handy for showing the cart and the order confirmation
export type CartLine = {
  product: Product;
  quantity: number;
};
