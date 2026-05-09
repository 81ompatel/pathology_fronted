import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ResultEntry } from '../../../core/models/result-entry.model';

@Component({
  selector: 'app-result-entry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './result-entry.component.html',
  styleUrls: ['./result-entry.component.css']
})
export class ResultEntryComponent implements OnInit {
  resultForm: FormGroup;
  pendingReports: ResultEntry[] = [];
  completedReports: ResultEntry[] = [];
  selectedResult: ResultEntry | null = null;
  message: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.resultForm = this.fb.group({
      resultValue: ['', Validators.required],
      technicianNotes: [''],
      status: ['COMPLETED', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPendingReports();
    this.loadCompletedReports();
  }

  loadPendingReports() {
    this.apiService.getPendingReports().subscribe({
      next: (res) => this.pendingReports = res,
      error: (err) => console.error(err)
    });
  }

  loadCompletedReports() {
    this.apiService.getCompletedReports().subscribe({
      next: (res) => this.completedReports = res,
      error: (err) => console.error(err)
    });
  }

  selectReport(report: ResultEntry) {
    this.selectedResult = report;
    this.resultForm.patchValue({
      resultValue: report.resultValue || '',
      technicianNotes: report.technicianNotes || '',
      status: 'COMPLETED'
    });
  }

  onSubmit() {
    if (this.resultForm.valid && this.selectedResult?.testOrder?.id) {
      const payload: ResultEntry = {
        testOrderId: this.selectedResult.testOrder.id,
        ...this.resultForm.value
      };

      this.apiService.saveResult(payload).subscribe({
        next: (res) => {
          this.message = 'Result saved successfully!';
          this.selectedResult = null;
          this.resultForm.reset();
          this.loadPendingReports();
          this.loadCompletedReports();
          setTimeout(() => this.message = '', 3000);
        },
        error: (err) => {
          this.message = 'Error saving result.';
          setTimeout(() => this.message = '', 3000);
        }
      });
    }
  }
}
