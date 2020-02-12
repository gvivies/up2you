package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.Player;
import com.orange.up2you.model.entities.PlayerType;
import com.orange.up2you.services.PlayerService;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_CLASS)
@ActiveProfiles("test")
public class PlayerControllerTest {

  @Autowired
  private PlayerController controller;

  @Test
  public void it_should_retrieve_people() {
    // Test
    int personCount = controller.retrieveAllPersons().size();

    // Assert
    Assertions.assertThat(personCount).isEqualTo(6);
  }

  @Test
  public void it_should_retrieve_teams() {
    // Test
    int teamCount = controller.retrieveAllTeams().size();

    // Assert
    Assertions.assertThat(teamCount).isGreaterThan(0);
    Assertions.assertThat(teamCount).isNotEqualTo(6);
  }

  @Test
  public void it_should_retrieve_player() {
    // Test
    Player result = controller.retrievePlayer(Long.valueOf(3L));

    // Assert
    Assertions.assertThat(result.getName()).isEqualTo("Georges");
  }

  @Test
  public void it_should_create_new_player() {
    // Setup
    Player newPlayer = new Player();
    newPlayer.setName("Newbie");

    // Test
    Player result = controller.savePlayer(newPlayer);

    // Assert
    Player createdPlayer = controller.retrievePlayer(result.getId());
    Assertions.assertThat(createdPlayer.getId()).isEqualTo(result.getId());
    Assertions.assertThat(createdPlayer.getName()).isEqualTo("Newbie");
  }

  @Test
  public void it_should_update_existing_player() {
    // Setup
    Player toUpdate = controller.retrievePlayer(5L);
    toUpdate.setName("Steve's brother");

    // Test
    Player result = controller.updatePlayer(toUpdate);

    // Assert
    Player updatedPlayer = controller.retrievePlayer(5L);
    Assertions.assertThat(updatedPlayer.getName()).isEqualTo("Steve's brother");
  }

  @Test
  public void it_should_delete_existing_player() {
    // Setup
    int nbPlayersBefore = controller.retrieveAllTeams().size();
    Long existingPlayerIdThatCanBeDeleted = 12L;

    // Test
    controller.deletePlayer(existingPlayerIdThatCanBeDeleted);

    // Assert
    int nbPlayersAfter = controller.retrieveAllTeams().size();
    Assertions.assertThat(nbPlayersAfter).isEqualTo(nbPlayersBefore - 1);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_retrieve_an_unknown_player() {
    // Setup
    Long unknownPlayerId = 999L;

    // Test
    controller.retrievePlayer(unknownPlayerId);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_update_an_unknown_player() {
    Player unknownPlayer = new Player();
    unknownPlayer.setId(999L);
    controller.updatePlayer(unknownPlayer);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_delete_an_unknown_player() {
    // Setup
    Long unknownPlayerId = 999L;

    // Test
    controller.deletePlayer(unknownPlayerId);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_retrieve_null_id() {
    controller.retrievePlayer(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_create_null_player() {
    controller.savePlayer(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_update_null_player() {
    controller.updatePlayer(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_delete_null_player() {
    controller.deletePlayer(null);
  }
}
