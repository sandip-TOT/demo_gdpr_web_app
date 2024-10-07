import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, createUser, createUserSuccess, createUserFailure } from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {    
    constructor(private actions$: Actions, private userService: UserService) {
    }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map(users => loadUsersSuccess({ users })),
                    catchError(error => [loadUsersFailure({ error })])
                )
            )
        ),
        { functional: true }
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createUser),
            mergeMap(action =>
                this.userService.createUser(action.user).pipe(
                    map(user => createUserSuccess({ user })),
                    catchError(error => [createUserFailure({ error })])
                )
            )
        ),
        { functional: true }
    );
}
