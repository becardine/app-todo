import { Component, DoCheck } from '@angular/core';

//interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  taskList: Array<TaskList> = JSON.parse(localStorage.getItem('list') || '[]')

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage()
  }

  setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false })
  }

  deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1)
  }

  deleteAllTaskList() {
    const confirm = window.confirm('Você realmente deseja deletar tudo?')
    if(confirm) {
      this.taskList = []
    }
  }

  validationInput(event: string, index: number) {
    if(!event.length) {
      const confirm = window.confirm('Task está vazia. Deseja deletar?')

      if(confirm) {
        this.deleteItemTaskList(index)
      }
    }
  }

  setLocalStorage() {
    if(this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked) )
      localStorage.setItem('list', JSON.stringify(this.taskList))
    }
  }

}
