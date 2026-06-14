import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Observable, catchError, map, of } from 'rxjs';
import { StudentDTO } from '../models/student.dto';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private csvUrl = 'assets/students.csv';

  constructor(
    private papa: Papa,
    private http: HttpClient,
  ) {}

  getStudents(): Observable<StudentDTO[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map((data) => {
        const parsedData = this.papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        });

        const students: StudentDTO[] = parsedData.data.map((item: any) => ({
          id: Number(item.id),
          name: item.nom,
          gender: item.sexe,
          grade: Number(item.nota),
          absences: Number(item.absencies),
        }));

        return students;
      }),
      catchError((error) => {
        console.error('Error loading CSV file:', error);
        return of([]);
      }),
    );
  }
}
