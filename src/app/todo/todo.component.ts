import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  trigger,
  animate,
  style,
  transition,
  keyframes
} from '@angular/animations';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Todo {
  id?: string;
  value?: string;
  completed?: boolean;
  createdAt: firestore.Timestamp;
  userId?: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('moveInLeft', [
      transition('void => *', [
        style({ transform: 'translateX(300px)' }),
        animate(
          200,
          keyframes([
            style({ transform: 'translateX(300px)' }),
            style({ transform: 'translateX(0)' })
          ])
        )
      ]),
      transition('*=>void', [
        style({ transform: 'translateX(0px)' }),
        animate(
          100,
          keyframes([
            style({ transform: 'translateX(0px)' }),
            style({ transform: 'translateX(300px)' })
          ])
        )
      ])
    ])
  ]
})

export class TodoComponent {
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth, public authService: AuthService) {
    this.todoCollectionRef = this.db.collection<Todo>('todo-list');

    this.todo$ = this.db
      .collection<Todo>('todo-list')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data =
              a.payload.doc.data() as Todo;
            const id = a.payload.doc.id;
            return { id, ...data };
          }).filter(todo => todo.userId === afAuth.auth.currentUser.uid)
        )
      );
  }

  addTodo(value: string) {
    if (value) {
      this.todoCollectionRef.add({
        value,
        createdAt: firestore.Timestamp.now(),
        completed: false,
        userId: this.afAuth.auth.currentUser.uid
      });
    }
  }

  deleteItem(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).delete();
  }

  updateItem(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).update({ completed: !todo.completed });
  }

}
