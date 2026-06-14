import { Component, OnInit } from '@angular/core';
import { StudentDTO } from '../../../models/student.dto';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-resume-data',
  standalone: true,
  imports: [],
  templateUrl: './resume-data.component.html',
  styleUrl: './resume-data.component.scss',
})
export class ResumeDataComponent implements OnInit {
  totalStudents = 0;
  totalApproved = 0;
  totalFailed = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students: StudentDTO[]) => {
      this.totalStudents = students.length;

      this.totalApproved = students.filter(
        (student: StudentDTO) => student.grade >= 5,
      ).length;

      this.totalFailed = students.filter(
        (student: StudentDTO) => student.grade < 5,
      ).length;
    });
  }
}
