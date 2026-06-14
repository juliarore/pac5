import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { StudentDTO } from '../../models/student.dto';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [ScrollingModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
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

  trackByStudentId(index: number, student: StudentDTO): number {
    return student.id;
  }
}
