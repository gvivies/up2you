package com.orange.up2you.services;

import com.orange.up2you.model.entities.Direction;
import com.orange.up2you.model.entities.MoveCommand;
import com.orange.up2you.model.entities.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MoveServiceImpl implements MoveService {

  private final static int FIRST_POSITION = 0;

  private TrackService trackService;

  @Autowired
  public MoveServiceImpl(TrackService trackService) {
    this.trackService = trackService;
  }

  @Override
  public Track move(MoveCommand moveCommand) {
    Track trackToMove = trackService.retrieve(moveCommand.getTrack().getId());

    int positionAfterMove = Direction.FORWARD.equals(moveCommand.getDirection())
      ? moveForward(trackToMove, moveCommand.getNbRanks())
      : moveBackward(trackToMove, moveCommand.getNbRanks());
    trackToMove.setCurrentPosition(positionAfterMove);

    return trackService.update(trackToMove);
  }

  @Override
  public void reset(Track track) {

  }

  private int moveForward(Track trackToMove, int nbRanks) {
    int trackLength = trackToMove.getPlaces().size();
    int newPosition;
    if (trackToMove.getCurrentPosition() + nbRanks <= trackLength) {
      newPosition = trackToMove.getCurrentPosition() + nbRanks;
    } else {
      newPosition = (trackToMove.getCurrentPosition() + nbRanks) - trackLength;
    }
    return newPosition;
  }

  private int moveBackward(Track trackToMove, int nbRanks) {
    int trackLength = trackToMove.getPlaces().size();
    int newPosition;
    if (trackToMove.getCurrentPosition() - nbRanks >= FIRST_POSITION) {
      newPosition = trackToMove.getCurrentPosition() - nbRanks;
    } else {
      newPosition = trackLength + (trackToMove.getCurrentPosition() - nbRanks);
    }
    return newPosition;
  }
}
