import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import cors from 'cors';
import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS,
} from '../../graphql/graphql.queries';
//import { from } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  error: any;

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  addTodo() {
    // apollo graphql query to add todo
    this.apollo
      .mutate({
        mutation: ADD_TODO,
        variables: {
          title: this.todoForm.value.title,
          description: this.todoForm.value.description,
        },
        refetchQueries: [
          {
            query: GET_TODOS,
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.todos = data.addTodo;
          this.todoForm.reset();
        },
        (error) => {
          this.error = error;
        }
      );
  }

  deleteTodo(id: number) {
    // apollo graphql query to delete todo
    this.apollo
      .mutate({
        mutation: DELETE_TODO,
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: GET_TODOS,
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.todos = data.deleteTodo;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    //console.log('hai', GET_TODOS);
    this.apollo
      .watchQuery({
        query: GET_TODOS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        // console.log('data', data.tasks);
        // console.log('error', this.error);
        this.todos = data.tasks;
        this.error = error;
      });
  }
}
