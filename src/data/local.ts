import type {DishType} from '@/types';

export type Fulfillment = 'delivery' | 'pickup';
export type DemoOrder = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  mode: Fulfillment;
  payment: string;
  items: DishType[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
};
const key = 'nabe-demo-orders-v1';
export function readOrders(): DemoOrder[] {
  try {
    const data = JSON.parse(
      localStorage.getItem(key) ?? '[]',
    );
    return Array.isArray(data)
      ? data.filter(
          (order) =>
            order &&
            typeof order.id === 'string' &&
            Array.isArray(order.items) &&
            typeof order.total === 'number',
        )
      : [];
  } catch {
    return [];
  }
}
export function saveOrder(order: DemoOrder) {
  localStorage.setItem(
    key,
    JSON.stringify([order, ...readOrders()].slice(0, 30)),
  );
}
export const deliveryFee = (
  subtotal: number,
  mode: Fulfillment,
) => (mode === 'pickup' || subtotal >= 999 ? 0 : 49);
export const displayDate = (date: string) =>
  new Date(date).toLocaleString('th-TH', {
    timeZone: 'Asia/Bangkok',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
