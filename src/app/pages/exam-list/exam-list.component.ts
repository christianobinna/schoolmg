import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Import Services
import { ExamService } from '../../services/exam.service';
// Import Models
import { Exam } from '../../domain/schoolmg_db/exam';

// START - USED SERVICES
/**
* examService.delete
*	@description CRUD ACTION delete
*	@param ObjectId id Id
*
* examService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component shows a list of Exam
 * @class ExamListComponent
 */
@Component({
    selector: 'app-exam-list',
    templateUrl: './exam-list.component.html',
    styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
    list: Observable<any[]>;
    search: any = {};
    idSelected: string;
    constructor(
        private examService: ExamService,
    ) { }

    /**
     * Init
     */
    ngOnInit(): void {
        this.list = this.examService.list();
    }

    /**
     * Select Exam to remove
     *
     * @param {string} id Id of the Exam to remove
     */
    selectId(id: string) {
        this.idSelected = id;
    }

    /**
     * Remove selected Exam
     */
    deleteItem() {
        this.examService.remove(this.idSelected);
    }

}
