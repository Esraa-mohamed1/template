import { Order, Transaction, CartItem } from '../types';

export const createOrder = (items: CartItem[], total: number): Order => {
  return {
    id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    total: total,
    status: 'Processing',
    items: [...items]
  };
};

export const createTransaction = (orderId: string, amount: number, method: string): Transaction => {
  return {
    id: 'TRX-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderId: orderId,
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    amount: amount,
    method: method,
    status: 'Successful'
  };
};
