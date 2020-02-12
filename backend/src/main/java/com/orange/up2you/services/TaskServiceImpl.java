package com.orange.up2you.services;

import com.orange.up2you.model.entities.Task;
import com.orange.up2you.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

  private TaskRepository taskRepository;

  @Autowired
  public TaskServiceImpl(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @Override
  public List<Task> retrieveAll() {
    return (List<Task> ) taskRepository.findAll();
  }

  @Override
  public Task retrieve(Long id) throws ResourceNotFoundException {
    if (id == null) {
      throw new IllegalArgumentException("Task id can not be null");
    }
    return taskRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(String.format("The task with id %d does not exist", id)));
  }

  @Override
  public Task create(Task task) {
    if (task == null) {
      throw new IllegalArgumentException("Task can not be null");
    }
    return taskRepository.save(task);
  }

  @Override
  public Task update(Task task) throws ResourceNotFoundException {
    if (task == null) {
      throw new IllegalArgumentException("Task can not be null");
    }
    retrieve(task.getId());
    return taskRepository.save(task);
  }

  @Override
  public void delete(Long id) throws ResourceNotFoundException {
    if (id == null) {
      throw new IllegalArgumentException("Task id can not be null");
    }
    try {
      taskRepository.deleteById(id);
    } catch (EmptyResultDataAccessException err) {
      throw new ResourceNotFoundException("The task with id %d does not exist");
    }
  }
}
