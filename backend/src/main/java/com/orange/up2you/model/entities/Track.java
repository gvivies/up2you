package com.orange.up2you.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.orange.up2you.common.utils.CustomDateAndTimeDeserializer;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.*;

@Entity
public class Track {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String Description;

  @Enumerated(EnumType.STRING)
  private PlayerType type;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = CustomDateAndTimeDeserializer.SERIALIZED_FORMAT)
  @JsonDeserialize(using= CustomDateAndTimeDeserializer.class)
  private ZonedDateTime lastMoved;

  @OneToOne
  private Task task;

  @OneToMany(mappedBy = "track", cascade = CascadeType.ALL, orphanRemoval = true)
  @LazyCollection(LazyCollectionOption.FALSE)
  private List<Place> places = new ArrayList<>();

  private int currentPosition = 1;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public ZonedDateTime getLastMoved() {
    return lastMoved;
  }

  public void setLastMoved(ZonedDateTime lastMoved) {
    this.lastMoved = lastMoved;
  }

  public Task getTask() {
    return task;
  }

  public void setTask(Task task) {
    this.task = task;
  }

  public int getCurrentPosition() {
    return currentPosition;
  }

  public void setCurrentPosition(int currentPosition) {
    this.currentPosition = currentPosition;
  }

  public String getDescription() {
    return Description;
  }

  public void setDescription(String description) {
    Description = description;
  }

  public List<Place> getPlaces() {
    return places;
  }

  public void setPlaces(List<Place> places) {
    this.places = places;
  }

  public PlayerType getType() {
    return type;
  }

  public void setType(PlayerType type) {
    this.type = type;
  }
}
