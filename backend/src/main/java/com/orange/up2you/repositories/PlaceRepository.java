package com.orange.up2you.repositories;

import com.orange.up2you.model.entities.Place;
import com.orange.up2you.model.entities.Track;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlaceRepository extends CrudRepository<Place, Long> {
  List<Place> findAllByTrackIsOrderByPosition(Track track);
}
