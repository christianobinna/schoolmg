// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { CourseService } from '../../services/course.service';
import { ExamService } from '../../services/exam.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

// Import Models
import { Course } from '../../domain/schoolmg_db/course';
import { Exam } from '../../domain/schoolmg_db/exam';
import { Teacher } from '../../domain/schoolmg_db/teacher';
import { Student } from '../../domain/schoolmg_db/student';

// START - USED SERVICES
/**
* courseService.create
*	@description CRUD ACTION create
*
* courseService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* courseService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* examService.findBy_course
*	@description CRUD ACTION findBy_course
*	@param Objectid key Id of model to search for
*
* teacherService.findBy_teacher
*	@description CRUD ACTION findBy_teacher
*	@param Objectid key Id of model to search for
*
* studentService.findBycourse
*	@description CRUD ACTION findBycourse
*	@param Objectid key Id of model to search for
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Course
 */
@Component({
    selector: 'app-course-edit',
    templateUrl: 'course-edit.component.html',
    styleUrls: ['course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Course>;
    isNew: Boolean = true;
    formValid: Boolean;

    

    externalExam__course: Exam[];
    externalTeacher__teacher: Teacher[];
    externalStudent_course: Student[];

    constructor(
        private courseService: CourseService,
        private examService: ExamService,
        private teacherService: TeacherService,
        private studentService: StudentService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
        this.externalExam__course = [];
        this.externalTeacher__teacher = [];
        this.externalStudent_course = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.courseService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

                this.examService.findBy_course(id).subscribe(list => this.externalExam__course = list);
                this.teacherService.findBy_teacher(id).subscribe(list => this.externalTeacher__teacher = list);
                this.studentService.findByCourse(id).subscribe(list => this.externalStudent_course = list);
            }
            // Get relations
        });
    }



    /**
     * Save Course
     *
     * @param {boolean} formValid Form validity check
     * @param Course item Course to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.courseService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.courseService.update(this.itemDoc, this.item);
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
