package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.Track;
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
public class TrackControllerTest {

  @Autowired
  private TrackController trackController;

  @Test
  public void it_should_retrieve_track() {
    // Test
    Track result = trackController.retrieveTrack(Long.valueOf(2L));

    // Assert
    Assertions.assertThat(result.getDescription()).isEqualTo("Track #2");
  }

  @Test
  public void it_should_create_new_track() {
    // Setup
    Track newTrack = new Track();
    newTrack.setDescription("New track");

    // Test
    Track result = trackController.saveTrack(newTrack);

    // Assert
    Track createdTrack = trackController.retrieveTrack(result.getId());
    Assertions.assertThat(createdTrack.getId()).isEqualTo(result.getId());
    Assertions.assertThat(createdTrack.getDescription()).isEqualTo("New track");
  }

  @Test
  public void it_should_update_existing_track() {
    // Setup
    Track toUpdate = trackController.retrieveTrack(2L);
    toUpdate.setDescription("Updated track");

    // Test
    Track result = trackController.updateTrack(toUpdate);

    // Assert
    Track updatedTrack = trackController.retrieveTrack(2L);
    Assertions.assertThat(updatedTrack.getDescription()).isEqualTo("Updated track");
  }

  @Test
  public void it_should_delete_existing_track() {
    // Setup
    int nbTracksBefore = trackController.retrieveTracks().size();
    Long existingTrackId = 1L;

    // Test
    trackController.deleteTrack(existingTrackId);

    // Assert
    int nbTracksAfter = trackController.retrieveTracks().size();
    Assertions.assertThat(nbTracksAfter).isEqualTo(nbTracksBefore - 1);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_retrieve_an_unknown_track() {
    Long unknownTrackId = 999L;
    trackController.retrieveTrack(unknownTrackId);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_update_an_unknown_track() {
    Track unknownTrack = new Track();
    unknownTrack.setId(999L);
    trackController.updateTrack(unknownTrack);
  }

  @Test(expected = ResourceNotFoundException.class)
  public void it_should_throw_resource_not_found_exception_if_attempt_to_delete_an_unknown_track() {
    Long unknownTrack = 999L;
    trackController.deleteTrack(unknownTrack);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_retrieve_null_id() {
    trackController.retrieveTrack(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_create_null_track() {
    trackController.saveTrack(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_update_null_track() {
    trackController.updateTrack(null);
  }

  @Test(expected = IllegalArgumentException.class)
  public void it_should_throw_illegal_argument_exception_if_attempt_to_delete_null_track() {
    trackController.updateTrack(null);
  }
}
