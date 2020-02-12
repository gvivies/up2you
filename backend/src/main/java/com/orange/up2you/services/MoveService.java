package com.orange.up2you.services;

import com.orange.up2you.model.entities.MoveCommand;
import com.orange.up2you.model.entities.Track;

public interface MoveService {
  Track move(MoveCommand moveCommand);
  void reset(Track track);
}
