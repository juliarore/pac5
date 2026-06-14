import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';
import { StudentDTO } from '../../../models/student.dto';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss',
})
export class GenderComponent implements OnInit {
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  private loadChart(): void {
    this.studentService.getStudents().subscribe((students: StudentDTO[]) => {
      const maleCount = students.filter(
        (student: StudentDTO) => student.gender === 'Home',
      ).length;

      const femaleCount = students.filter(
        (student: StudentDTO) => student.gender === 'Dona',
      ).length;

      this.createGenderChart(maleCount, femaleCount);
    });
  }

  private createGenderChart(maleCount: number, femaleCount: number): void {
    new Chart('genderChart', {
      type: 'pie',
      data: {
        labels: ['Homes', 'Dones'],
        datasets: [
          {
            data: [maleCount, femaleCount],
            backgroundColor: ['#57a5e6', '#df7a9b'],
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
