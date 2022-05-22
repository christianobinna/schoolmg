// DEPENDENCIES
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SECURITY
import { AuthGuard } from './security/auth.guard';

/**
 * WEB APP ROUTES
 */
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    /* START MY VIEWS */

    { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'courses/:id', loadChildren: './pages/course-edit/course-edit.module#CourseEditModule', canActivate: [AuthGuard] },
    { path: 'courses', loadChildren: './pages/course-list/course-list.module#CourseListModule', canActivate: [AuthGuard] },
    { path: 'exams/:id', loadChildren: './pages/exam-edit/exam-edit.module#ExamEditModule', canActivate: [AuthGuard] },
    { path: 'exams', loadChildren: './pages/exam-list/exam-list.module#ExamListModule', canActivate: [AuthGuard] },
    { path: 'students/:id', loadChildren: './pages/student-edit/student-edit.module#StudentEditModule', canActivate: [AuthGuard] },
    { path: 'students', loadChildren: './pages/student-list/student-list.module#StudentListModule', canActivate: [AuthGuard] },
    { path: 'teachers/:id', loadChildren: './pages/teacher-edit/teacher-edit.module#TeacherEditModule', canActivate: [AuthGuard] },
    { path: 'teachers', loadChildren: './pages/teacher-list/teacher-list.module#TeacherListModule', canActivate: [AuthGuard] },

 /* END MY VIEWS */

    // SECURITY
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' }
];

/**
 * ROUTING MODULE
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
