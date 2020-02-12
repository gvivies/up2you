package com.orange.up2you.services;

import com.orange.up2you.model.entities.Track;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import java.util.List;

public interface TrackService {
  List<Track> retrieveAll();
  Track retrieve(Long id) throws ResourceNotFoundException;
  Track create(Track track);
  Track update(Track track) throws ResourceNotFoundException;
  void delete(Long id) throws ResourceNotFoundException;
}
