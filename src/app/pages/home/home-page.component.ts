import { Component, OnInit } from '@angular/core';
import { StudentDTO } from '../../models/student.dto';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  students: StudentDTO[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }
}
