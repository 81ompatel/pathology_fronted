import { TestOrder } from './test-order.model';

export interface ResultEntry {
  id?: number;
  testOrderId: number;
  testOrder?: TestOrder;
  resultValue?: string;
  technicianNotes?: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt?: string;
  updatedAt?: string;
}
