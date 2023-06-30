export default function Naira(value: number) {
  return `₦${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function Cur(value: number) {
  return `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
