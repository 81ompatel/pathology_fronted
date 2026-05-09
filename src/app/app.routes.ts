import { Routes } from '@angular/router';
import { TestMasterComponent } from './features/test-master/components/test-master.component';
import { TestOrderComponent } from './features/test-order/components/test-order.component';
import { ResultEntryComponent } from './features/result-entry/components/result-entry.component';

export const routes: Routes = [
  { path: '', redirectTo: 'test-master', pathMatch: 'full' },
  { path: 'test-master', component: TestMasterComponent },
  { path: 'test-order', component: TestOrderComponent },
  { path: 'result-entry', component: ResultEntryComponent }
];
