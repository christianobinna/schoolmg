// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { StudentService } from '../../services/student.service';
import { ExamService } from '../../services/exam.service';
import { CourseService } from '../../services/course.service';

// Import Models
import { Student } from '../../domain/schoolmg_db/student';
import { Exam } from '../../domain/schoolmg_db/exam';
import { Course } from '../../domain/schoolmg_db/course';

// START - USED SERVICES
/**
* studentService.create
*	@description CRUD ACTION create
*
* studentService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* studentService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* examService.findBy_student
*	@description CRUD ACTION findBy_student
*	@param Objectid key Id of model to search for
*
* courseService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Student
 */
@Component({
    selector: 'app-student-edit',
    templateUrl: 'student-edit.component.html',
    styleUrls: ['student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Student>;
    isNew: Boolean = true;
    formValid: Boolean;

    
    listCourse: Course[];
    

    externalExam__student: Exam[];

    constructor(
        private studentService: StudentService,
        private examService: ExamService,
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
        this.externalExam__student = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.studentService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

                this.examService.findBy_student(id).subscribe(list => this.externalExam__student = list);
            }
            // Get relations
            this.courseService.list().subscribe(list => this.listCourse = list);
        });
    }


    /**
     * Check if an Course is in  course
     *
     * @param {string} id Id of Course to search
     * @returns {boolean} True if it is found
     */
    containCourse(id: string): boolean {
        if (!this.item.course) return false;
        return this.item.course.indexOf(id) !== -1;
    }

    /**
     * Add Course from Student
     *
     * @param {string} id Id of Course to add in this.item.course array
     */
    addCourse(id: string) {
        if (!this.item.course)
            this.item.course = [];
        this.item.course.push(id);
    }

    /**
     * Remove an Course from a Student
     *
     * @param {number} index Index of Course in this.item.course array
     */
    removeCourse(index: number) {
        this.item.course.splice(index, 1);
    }

    /**
     * Save Student
     *
     * @param {boolean} formValid Form validity check
     * @param Student item Student to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.studentService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.studentService.update(this.itemDoc, this.item);
            }
            this.goBack();
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }

}
