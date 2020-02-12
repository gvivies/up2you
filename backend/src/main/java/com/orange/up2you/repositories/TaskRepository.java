package com.orange.up2you.repositories;

import com.orange.up2you.model.entities.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}
