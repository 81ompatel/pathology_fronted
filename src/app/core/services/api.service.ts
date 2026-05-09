import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestMaster } from '../models/test-master.model';
import { TestOrder } from '../models/test-order.model';
import { ResultEntry } from '../models/result-entry.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  // Test Master
  getTests(page: number = 0, size: number = 10, search?: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get(`${this.baseUrl}/tests`, { params });
  }

  createTest(test: TestMaster): Observable<TestMaster> {
    return this.http.post<TestMaster>(`${this.baseUrl}/tests`, test);
  }

  // Test Order
  getTodaysOrders(): Observable<TestOrder[]> {
    return this.http.get<TestOrder[]>(`${this.baseUrl}/orders/today`);
  }

  createOrder(order: TestOrder): Observable<TestOrder> {
    return this.http.post<TestOrder>(`${this.baseUrl}/orders`, order);
  }

  // Result Entry
  getPendingReports(): Observable<ResultEntry[]> {
    return this.http.get<ResultEntry[]>(`${this.baseUrl}/results/pending`);
  }

  getCompletedReports(): Observable<ResultEntry[]> {
    return this.http.get<ResultEntry[]>(`${this.baseUrl}/results/completed`);
  }

  saveResult(result: ResultEntry): Observable<ResultEntry> {
    return this.http.put<ResultEntry>(`${this.baseUrl}/results`, result);
  }
}
