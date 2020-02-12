package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.Direction;
import com.orange.up2you.model.entities.MoveCommand;
import com.orange.up2you.model.entities.Track;
import com.orange.up2you.services.TrackService;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@ActiveProfiles("test")
public class MovementControllerTest {

  @Autowired
  private MovementController controller;

  @Autowired
  private TrackService trackService;

  @Test
  public void it_should_advance_if_new_position_lower_than_the_end() {
    // Setup
    Track trackWith6peopleAndPositionedAtStart = new Track();
    trackWith6peopleAndPositionedAtStart.setId(1L);
    MoveCommand moveCommand = new MoveCommand();
    moveCommand.setNbRanks(3);
    moveCommand.setDirection(Direction.FORWARD);
    moveCommand.setTrack(trackWith6peopleAndPositionedAtStart);

    // Test
    Track result = controller.move(moveCommand);

    // Assert
    Assertions.assertThat(result.getCurrentPosition()).isEqualTo(4);
  }

  @Test
  public void it_should_restart_from_the_origin_if_new_position_greater_than_the_end() {
    // Setup
    Track trackWith6peopleAndPositionedAtStart = new Track();
    trackWith6peopleAndPositionedAtStart.setId(1L);
    MoveCommand moveCommand = new MoveCommand();
    moveCommand.setNbRanks(8);
    moveCommand.setDirection(Direction.FORWARD);
    moveCommand.setTrack(trackWith6peopleAndPositionedAtStart);

    // Test
    Track result = controller.move(moveCommand);

    // Assert
    Assertions.assertThat(result.getCurrentPosition()).isEqualTo(3);
  }

  @Test
  public void it_should_step_back_if_new_position_greater_than_the_origin() {
    // Setup
    Track trackWith5TeamsPositionedAtTheEnd = new Track();
    trackWith5TeamsPositionedAtTheEnd.setId(2L);
    MoveCommand moveCommand = new MoveCommand();
    moveCommand.setNbRanks(3);
    moveCommand.setDirection(Direction.BACK);
    moveCommand.setTrack(trackWith5TeamsPositionedAtTheEnd);

    // Test
    Track result = controller.move(moveCommand);

    // Assert
    Assertions.assertThat(result.getCurrentPosition()).isEqualTo(2);
  }

  @Test
  public void it_should_resume_from_the_end_if_new_position_lower_than_the_origin() {
    // Setup
    Track trackWith6peopleAndPositionedAtStart = new Track();
    trackWith6peopleAndPositionedAtStart.setId(1L);
    MoveCommand moveCommand = new MoveCommand();
    moveCommand.setNbRanks(3);
    moveCommand.setDirection(Direction.BACK);
    moveCommand.setTrack(trackWith6peopleAndPositionedAtStart);

    // Test
    Track result = controller.move(moveCommand);

    // Assert
    Assertions.assertThat(result.getCurrentPosition()).isEqualTo(4);
  }
}
