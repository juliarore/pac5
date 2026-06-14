import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { StudentDTO } from '../../../models/student.dto';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-general-results',
  standalone: true,
  imports: [],
  templateUrl: './general-results.component.html',
  styleUrl: './general-results.component.scss',
})
export class GeneralResultsComponent implements OnInit {
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  private loadChart(): void {
    this.studentService.getStudents().subscribe((students: StudentDTO[]) => {
      const approvedCount = students.filter(
        (student: StudentDTO) => student.grade >= 5,
      ).length;

      const failedCount = students.filter(
        (student: StudentDTO) => student.grade < 5,
      ).length;

      this.createResultsChart(approvedCount, failedCount);
    });
  }

  private createResultsChart(approvedCount: number, failedCount: number): void {
    new Chart('resultsChart', {
      type: 'pie',

      data: {
        labels: ['Aprovats', 'Suspesos'],

        datasets: [
          {
            data: [approvedCount, failedCount],
            backgroundColor: ['#6ba76e', '#e44d4a'],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
