// turns 6.5 into "$6.50"
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
