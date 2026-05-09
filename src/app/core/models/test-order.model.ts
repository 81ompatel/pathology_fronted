import { TestMaster } from './test-master.model';

export interface TestOrder {
  id?: number;
  orderNumber?: string;
  patientName: string;
  phoneNumber: string;
  testMasterId?: number;
  testMaster?: TestMaster;
  orderDate?: string;
}
