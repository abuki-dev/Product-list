import type { Product } from "../types";

function imageSet(name: string): Product["images"] {
  const url = (size: string) =>
    new URL(`../images/image-${name}-${size}.jpg`, import.meta.url).href;

  return {
    thumbnail: url("thumbnail"),
    mobile: url("mobile"),
    tablet: url("tablet"),
    desktop: url("desktop"),
  };
}

export const products: Product[] = [
  { id: 1, name: "Waffle with Berries", category: "Waffle", price: 6.5, images: imageSet("waffle") },
  { id: 2, name: "Vanilla Bean Crème Brûlée", category: "Crème Brûlée", price: 7, images: imageSet("creme-brulee") },
  { id: 3, name: "Macaron Mix of Five", category: "Macaron", price: 8, images: imageSet("macaron") },
  { id: 4, name: "Classic Tiramisu", category: "Tiramisu", price: 5.5, images: imageSet("tiramisu") },
  { id: 5, name: "Pistachio Baklava", category: "Baklava", price: 4, images: imageSet("baklava") },
  { id: 6, name: "Lemon Meringue Pie", category: "Pie", price: 5, images: imageSet("meringue") },
  { id: 7, name: "Red Velvet Cake", category: "Cake", price: 4.5, images: imageSet("cake") },
  { id: 8, name: "Salted Caramel Brownie", category: "Brownie", price: 4.5, images: imageSet("brownie") },
  { id: 9, name: "Vanilla Panna Cotta", category: "Panna Cotta", price: 6.5, images: imageSet("panna-cotta") },
];
