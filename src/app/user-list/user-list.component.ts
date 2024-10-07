import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../services/user.service';
import { loadUsers } from '../store/user.actions';
import { CreateUserComponent } from './create-user/create-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users$: Observable<User[]>;
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'consent'];
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<{ user: { users: User[] } }>,
    private toastr: ToastrService
  ) {
      this.users$ = store.select(state => state.user.users);
  }

  ngOnInit() {
    this.loadUsers();  
  }

  loadUsers() {
    this.store.dispatch(loadUsers());
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('User added successfully!', 'Success!');
      }
    });
  }
}
