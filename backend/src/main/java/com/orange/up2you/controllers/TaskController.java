package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.Task;
import com.orange.up2you.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class TaskController {

  private TaskService taskService;

  @Autowired
  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  @RequestMapping(path = "/tasks", method = RequestMethod.GET)
  public List<Task> retrieveTasks() throws ResourceNotFoundException {
    return taskService.retrieveAll();
  }

  @RequestMapping(path = "/task/{id}", method = RequestMethod.GET)
  public Task retrieveTask(@PathVariable Long id) throws ResourceNotFoundException {
    return taskService.retrieve(id);
  }

  @RequestMapping(path = "/task", method = RequestMethod.POST)
  public Task saveTask(@RequestBody Task task) throws ResourceNotFoundException {
    return taskService.create(task);
  }

  @RequestMapping(path = "/task", method = RequestMethod.PUT)
  public Task updateTask(@RequestBody Task task) throws ResourceNotFoundException {
    return taskService.update(task);
  }

  @RequestMapping(path = "/task/{id}", method = RequestMethod.DELETE)
  public void deleteTask(@PathVariable Long id) throws ResourceNotFoundException {
    taskService.delete(id);
  }
}
