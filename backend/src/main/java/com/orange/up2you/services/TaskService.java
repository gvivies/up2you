package com.orange.up2you.services;

import com.orange.up2you.model.entities.Task;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import java.util.List;

public interface TaskService {
  List<Task> retrieveAll();
  Task retrieve(Long id) throws ResourceNotFoundException;
  Task create(Task task);
  Task update(Task task) throws ResourceNotFoundException;
  void delete(Long id) throws ResourceNotFoundException;
}
