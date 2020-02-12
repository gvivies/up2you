package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.Task;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
@ActiveProfiles("test")
public class TaskControllerTest {

  @Autowired
  private TaskController taskController;

  @Test
  public void it_should_retrieve_tasks() {
    // Test
    List<Task> tasks = taskController.retrieveTasks();

    // Assert
    Assertions.assertThat(tasks.size()).isGreaterThan(0);
  }

  @Test
  public void it_should_retrieve_task() {
    // Test
    Task result = taskController.retrieveTask(Long.valueOf(3L));

    // Assert
    Assertions.assertThat(result.getName()).isEqualTo("Happiness management");
  }

  @Test
  public void it_should_create_new_task() {
    // Setup
    Task newTask = new Task();
    newTask.setName("Taxi");

    // Test
    Task result = taskController.saveTask(newTask);

    // Assert
    Task createdTask = taskController.retrieveTask(result.getId());
    Assertions.assertThat(createdTask.getId()).isEqualTo(result.getId());
    Assertions.assertThat(createdTask.getName()).isEqualTo("Taxi");
  }

  @Test
  public void it_should_update_existing_task() {
    // Setup
    Task toUpdate = taskController.retrieveTask(5L);
    toUpdate.setName("Sprint snapshot");

    // Test
    Task result = taskController.updateTask(toUpdate);

    // Assert
    Task updatedTask = taskController.retrieveTask(5L);
    Assertions.assertThat(updatedTask.getName()).isEqualTo("Sprint snapshot");
  }

  @Test
  public void it_should_delete_existing_task() {
    // Setup
    int nbTasksBefore = taskController.retrieveTasks().size();
    Long existingTaskId = 6L;

    // Test
    taskController.deleteTask(existingTaskId);

    // Assert
    int nbTasksAfter = taskController.retrieveTasks().size();
    Assertions.assertThat(nbTasksAfter).isEqualTo(nbTasksBefore - 1);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_retrieve_an_unknown_task() {
    Long unknownTaskId = 999L;
    taskController.retrieveTask(unknownTaskId);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_update_an_unknown_task() {
    Task unknownTask = new Task();
    unknownTask.setId(999L);
    taskController.updateTask(unknownTask);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_delete_an_unknown_task() {
    Long unknownTask = 999L;
    taskController.deleteTask(unknownTask);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_retrieve_null_id() {
    taskController.retrieveTask(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_create_null_task() {
    taskController.saveTask(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_update_null_task() {
    taskController.updateTask(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_delete_null_task() {
    taskController.deleteTask(null);
  }
}
