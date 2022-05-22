// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { ExamService } from '../../services/exam.service';
import { TeacherService } from '../../services/teacher.service';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';

// Import Models
import { Exam } from '../../domain/schoolmg_db/exam';
import { Course } from '../../domain/schoolmg_db/course';
import { Student } from '../../domain/schoolmg_db/student';
import { Teacher } from '../../domain/schoolmg_db/teacher';

// START - USED SERVICES
/**
* examService.create
*	@description CRUD ACTION create
*
* examService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* examService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* teacherService.list
*	@description CRUD ACTION list
*
* courseService.list
*	@description CRUD ACTION list
*
* studentService.list
*	@description CRUD ACTION list
*
* examService.validate
*	@description This Api is used to validate the exam
*	@param String id id of thexam
*	@returns Boolean
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Exam
 */
@Component({
    selector: 'app-exam-edit',
    templateUrl: 'exam-edit.component.html',
    styleUrls: ['exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Exam>;
    isNew: Boolean = true;
    formValid: Boolean;

    
    list_course: Course[];
    
    list_student: Student[];
    
    list_teacher: Teacher[];
    


    constructor(
        private examService: ExamService,
        private teacherService: TeacherService,
        private courseService: CourseService,
        private studentService: StudentService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.examService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
            this.courseService.list().subscribe(list => this.list_course = list);
            this.studentService.list().subscribe(list => this.list_student = list);
            this.teacherService.list().subscribe(list => this.list_teacher = list);
        });
    }



    /**
     * Save Exam
     *
     * @param {boolean} formValid Form validity check
     * @param Exam item Exam to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.examService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.examService.update(this.itemDoc, this.item);
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
