package com.orange.up2you.model.entities;

public class MoveCommand {
  private Track track;
  private Direction direction;
  private int nbRanks;

  public Track getTrack() {
    return track;
  }

  public void setTrack(Track track) {
    this.track = track;
  }

  public Direction getDirection() {
    return direction;
  }

  public void setDirection(Direction direction) {
    this.direction = direction;
  }

  public int getNbRanks() {
    return nbRanks;
  }

  public void setNbRanks(int nbRanks) {
    this.nbRanks = nbRanks;
  }
}
