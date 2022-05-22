// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { TeacherService } from '../../services/teacher.service';
import { ExamService } from '../../services/exam.service';
import { CourseService } from '../../services/course.service';

// Import Models
import { Teacher } from '../../domain/schoolmg_db/teacher';
import { Exam } from '../../domain/schoolmg_db/exam';
import { Course } from '../../domain/schoolmg_db/course';

// START - USED SERVICES
/**
* teacherService.create
*	@description CRUD ACTION create
*
* teacherService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* teacherService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* examService.findBy_teacher
*	@description CRUD ACTION findBy_teacher
*	@param Objectid key Id of model to search for
*
* courseService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Teacher
 */
@Component({
    selector: 'app-teacher-edit',
    templateUrl: 'teacher-edit.component.html',
    styleUrls: ['teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Teacher>;
    isNew: Boolean = true;
    formValid: Boolean;

    
    list_teacher: Course[];
    

    externalExam__teacher: Exam[];

    constructor(
        private teacherService: TeacherService,
        private examService: ExamService,
        private courseService: CourseService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
        this.externalExam__teacher = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.teacherService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

                this.examService.findBy_teacher(id).subscribe(list => this.externalExam__teacher = list);
            }
            // Get relations
            this.courseService.list().subscribe(list => this.list_teacher = list);
        });
    }


    /**
     * Check if an Course is in  _teacher
     *
     * @param {string} id Id of Course to search
     * @returns {boolean} True if it is found
     */
    containCourse(id: string): boolean {
        if (!this.item._teacher) return false;
        return this.item._teacher.indexOf(id) !== -1;
    }

    /**
     * Add Course from Teacher
     *
     * @param {string} id Id of Course to add in this.item._teacher array
     */
    addCourse(id: string) {
        if (!this.item._teacher)
            this.item._teacher = [];
        this.item._teacher.push(id);
    }

    /**
     * Remove an Course from a Teacher
     *
     * @param {number} index Index of Course in this.item._teacher array
     */
    removeCourse(index: number) {
        this.item._teacher.splice(index, 1);
    }

    /**
     * Save Teacher
     *
     * @param {boolean} formValid Form validity check
     * @param Teacher item Teacher to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.teacherService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.teacherService.update(this.itemDoc, this.item);
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
