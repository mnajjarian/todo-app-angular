import { Component } from "@angular/core";
import {
  trigger,
  animate,
  style,
  transition,
  keyframes
} from "@angular/animations";

interface Todo {
  id: number;
  value: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("moveInLeft", [
      transition("void => *", [
        style({ transform: "translateX(300px)" }),
        animate(
          200,
          keyframes([
            style({ transform: "translateX(300px)" }),
            style({ transform: "translateX(0)" })
          ])
        )
      ]),
      transition("*=>void", [
        style({ transform: "translateX(0px)" }),
        animate(
          100,
          keyframes([
            style({ transform: "translateX(0px)" }),
            style({ transform: "translateX(300px)" })
          ])
        )
      ])
    ])
  ]
})
export class AppComponent {
  todoArray: Todo[] = [];

  buildTodo = (value: string): Todo => {
    const getId = this.todoArray.map(todo => todo.id).sort((a, b) => b + a);
    return {
      id: !this.todoArray.length ? 1 : getId[getId.length - 1] + 1,
      value: value
    };
  };

  addTodo(value: string) {
    if (value) {
      const todo = this.buildTodo(value);
      this.todoArray.push(todo);
    }
  }

  deleteItem(todoId: number) {
    console.log("delete item");
    this.todoArray = this.todoArray.filter(todo => todo.id !== todoId);
  }

  todoSubmit(value: { todo: string }) {
    const todo = this.buildTodo(value.todo);
    if (value.todo) {
      this.todoArray.push(todo);
      console.log(value);
    }
  }
}
