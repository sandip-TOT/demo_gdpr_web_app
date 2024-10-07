import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUser } from '../../store/user.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private store: Store, 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>
  ) {
      this.userForm = this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          dateOfBirth: ['', Validators.required],
          consent: [false, Validators.requiredTrue]
      });
  }

  onSubmit() {
      if (this.userForm.valid) {
          this.store.dispatch(createUser({ user: this.userForm.value }));
          this.userForm.reset();
          this.dialogRef.close(true);
      } else {
          Swal.fire({
            title: "Consent required!",
            text: "You must fill in all fields and give consent.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "OK",
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-danger ms-2 px-4',
                },
            });
      }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
