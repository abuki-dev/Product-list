
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


export type CartItem = {
  productId: number;
  quantity: number;
};


export type CartLine = {
  product: Product;
  quantity: number;
};
