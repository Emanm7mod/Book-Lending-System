import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/Member/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BookDetailsComponent } from './components/Member/book-details/book-details.component';
import { ShowbookForAdminComponent } from './components/Admin/showbook-for-admin/showbook-for-admin.component';
import { AddBookComponent } from './components/Admin/add-book/add-book.component';
import { EditBookComponent } from './components/Admin/edit-book/edit-book.component';
import { MyLibraryComponent } from './components/Member/my-library/my-library.component';
import { ShowBookBorrowForAdminComponent } from './components/Admin/show-book-borrow-for-admin/show-book-borrow-for-admin.component';
import { authGuard } from './Guards/guards/auth.guard';
import { adminGuard } from './Guards/guards/admin.guard';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path:'login',component:LoginComponent},
    {path:'register',component:RegistrationComponent},

    {path:'books',component:BooksComponent,canActivate:[authGuard]},
    {path:'bookdetails/:id',component:BookDetailsComponent,canActivate:[authGuard]},
    {path:'library',component:MyLibraryComponent,canActivate:[authGuard]},

    {path:'bookforadmin',component:ShowbookForAdminComponent,canActivate:[adminGuard]},
    {path:'bookborrowedAdmin',component:ShowBookBorrowForAdminComponent,canActivate:[adminGuard]},
    {path:'addBook',component:AddBookComponent,canActivate:[adminGuard]},
    {path:'editBook/:id',component:EditBookComponent,canActivate:[adminGuard]},

    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: 'notfound' }

];
