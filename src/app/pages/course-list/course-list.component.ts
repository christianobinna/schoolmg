import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { CourseService } from '../../services/course.service';
// Import Models
import { Course } from '../../domain/schoolmg_db/course';

// START - USED SERVICES
/**
* courseService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* courseService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Course
 * @class CourseListComponent
 */
@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private courseService: CourseService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.courseService.list();
    }

    /**
     * Select Course to remove
     *
     * @param {string} id Id of the Course to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Course
     */
    deleteItem() {
        this.courseService.remove(this.idSelected);
    }

}
