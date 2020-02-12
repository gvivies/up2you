package com.orange.up2you.services;

import com.orange.up2you.model.entities.Place;
import com.orange.up2you.model.entities.Track;
import com.orange.up2you.repositories.PlaceRepository;
import com.orange.up2you.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrackServiceImpl implements TrackService {

  private TrackRepository trackRepository;
  private PlaceRepository placeRepository;

  @Autowired
  public TrackServiceImpl(TrackRepository trackRepository, PlaceRepository placeRepository) {
    this.trackRepository = trackRepository;
    this.placeRepository = placeRepository;
  }

  @Override
  public List<Track> retrieveAll() {
    return (List<Track>) trackRepository.findAll();
  }

  @Override
  public Track retrieve(Long id) throws ResourceNotFoundException {
    if (id == null) {
      throw new IllegalArgumentException("Track id can not be null");
    }
    return trackRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(String.format("The track with id %d does not exist", id)));
  }

  @Override
  @Transactional
  public Track create(Track track) {
    if (track == null) {
      throw new IllegalArgumentException("Track can not be null");
    }
    List<Place> placesWithParentTrack = linkPlacesToParentTrack(track);
    List<Place> savedPlaces = (List<Place>) placeRepository.saveAll(placesWithParentTrack);
    track.setPlaces(savedPlaces);
    return trackRepository.save(track);
  }

  @Override
  @Transactional
  public Track update(Track track) throws ResourceNotFoundException {
    if (track == null) {
      throw new IllegalArgumentException("Task can not be null");
    }
    retrieve(track.getId());
    List<Place> placesWithParentTrack = linkPlacesToParentTrack(track);
    List<Place> savedPlaces = (List<Place>) placeRepository.saveAll(placesWithParentTrack);
    track.setPlaces(savedPlaces);
    return trackRepository.save(track);
  }

  private List<Place> linkPlacesToParentTrack(Track track) {
    return track.getPlaces().stream().map(p -> setParentTrack(p, track)).collect(Collectors.toList());
  }

  private Place setParentTrack(Place place, Track track) {
    place.setTrack(track);
    return place;
  }

  @Override
  public void delete(Long id) throws ResourceNotFoundException {
    if (id == null) {
      throw new IllegalArgumentException("Track id can not be null");
    }
    try {
      trackRepository.deleteById(id);
    } catch (EmptyResultDataAccessException err) {
      throw new ResourceNotFoundException("The track with id %d does not exist");
    }
  }
}
