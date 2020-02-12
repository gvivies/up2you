package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.Track;
import com.orange.up2you.services.TaskService;
import com.orange.up2you.services.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class TrackController {

  private TrackService trackService;

  @Autowired
  public TrackController(TrackService trackService) {
    this.trackService = trackService;
  }

  @RequestMapping(path = "/tracks", method = RequestMethod.GET)
  public List<Track> retrieveTracks() throws ResourceNotFoundException {
    return trackService.retrieveAll();
  }

  @RequestMapping(path = "/track/{id}", method = RequestMethod.GET)
  public Track retrieveTrack(@PathVariable Long id) throws ResourceNotFoundException {
    return trackService.retrieve(id);
  }

  @RequestMapping(path = "/track", method = RequestMethod.POST)
  public Track saveTrack(@RequestBody Track track) throws ResourceNotFoundException {
    return trackService.create(track);
  }

  @RequestMapping(path = "/track", method = RequestMethod.PUT)
  public Track updateTrack(@RequestBody Track track) throws ResourceNotFoundException {
    return trackService.update(track);
  }

  @RequestMapping(path = "/track/{id}", method = RequestMethod.DELETE)
  public void deleteTrack(@PathVariable Long id) throws ResourceNotFoundException {
    trackService.delete(id);
  }
}
