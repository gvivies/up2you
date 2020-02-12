import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Player, PlayerType, Task} from '../../core/generated/model';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TaskRepository} from '../../core/services/task-repository';
import {Operation} from '../../core/state-management/operation';
import {Action} from '../../core/state-management/action';
import {Store} from '../../core/state-management/store.service';
import {Dispatcher} from '../../core/state-management/dispatcher.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private taskRepository: TaskRepository,
              private store: Store,
              private dispatcher: Dispatcher) { }

  buildFormGroup() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    });
  }

  getTaskFromFormGroup(formGroup: FormGroup) {
    const task = new Task();
    task.id = formGroup.controls.id.value;
    task.name = formGroup.controls.name.value;
    return task;
  }

  update$(task: Task): Observable<Task> {
      return this.taskRepository.update$(task).pipe(
        tap(t => this.updateInState(t))
      );
  }

  create$(task: Task): Observable<Task> {
    return this.taskRepository.create$(task).pipe(
      tap(t => this.insertIntoState(t))
    );
  }

  delete$(task: Task): Observable<any> {
    return this.taskRepository.delete$(task).pipe(
      tap(t => this.removeFromState(task))
    );
  }

  private insertIntoState(task: Task) {
    this.modifyState(task, true);
  }

  private updateInState(task: Task) {
    this.modifyState(task, false);
  }

  private modifyState(task: Task, isNew: boolean) {
    const tasks = this.store.getTasks();
    if (isNew) {
      tasks.push(task);
    } else {
      const indexToUpdate = tasks.findIndex(t => t.id === task.id);
      tasks[indexToUpdate] = task;
    }
    this.dispatcher.dispatch({ operation: Operation.SET_TASKS, data: tasks} as Action);
  }

  private removeFromState(task: Task) {
    const tasks = this.store.getTasks();
    const indexToRemove = tasks.findIndex(t => t.id === task.id);
    tasks.splice(indexToRemove, 1);
    this.dispatcher.dispatch({ operation: Operation.SET_TASKS, data: tasks} as Action);
  }
}
