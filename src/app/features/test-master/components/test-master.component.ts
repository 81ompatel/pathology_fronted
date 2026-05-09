import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { TestMaster } from '../../../core/models/test-master.model';

@Component({
  selector: 'app-test-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test-master.component.html',
  styleUrls: ['./test-master.component.css']
})
export class TestMasterComponent implements OnInit {
  testForm: FormGroup;
  tests: TestMaster[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  message: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.testForm = this.fb.group({
      testName: ['', Validators.required],
      testCode: ['', Validators.required],
      sampleType: ['', Validators.required],
      normalRange: [''],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(search?: string) {
    this.loading = true;
    this.apiService.getTests(0, 100, search).subscribe({
      next: (res) => {
        this.tests = res.content;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.loadTests(this.searchQuery);
  }

  onSubmit() {
    if (this.testForm.valid) {
      this.apiService.createTest(this.testForm.value).subscribe({
        next: (res) => {
          this.message = 'Test created successfully!';
          this.testForm.reset();
          this.loadTests();
          setTimeout(() => this.message = '', 3000);
        },
        error: (err) => {
          this.message = 'Error creating test. It might already exist.';
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }
}
