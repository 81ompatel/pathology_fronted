import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { TestMaster } from '../../../core/models/test-master.model';
import { TestOrder } from '../../../core/models/test-order.model';

@Component({
  selector: 'app-test-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test-order.component.html',
  styleUrls: ['./test-order.component.css']
})
export class TestOrderComponent implements OnInit {
  orderForm: FormGroup;
  tests: TestMaster[] = [];
  todaysOrders: TestOrder[] = [];
  message: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.orderForm = this.fb.group({
      patientName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      testMasterId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTests();
    this.loadTodaysOrders();
  }

  loadTests() {
    this.apiService.getTests(0, 1000).subscribe({
      next: (res) => this.tests = res.content,
      error: (err) => console.error(err)
    });
  }

  loadTodaysOrders() {
    this.apiService.getTodaysOrders().subscribe({
      next: (res) => this.todaysOrders = res,
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.apiService.createOrder(this.orderForm.value).subscribe({
        next: (res) => {
          this.message = 'Order created successfully!';
          this.orderForm.reset();
          this.loadTodaysOrders();
          setTimeout(() => this.message = '', 3000);
        },
        error: (err) => {
          this.message = 'Error creating order.';
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }
}
