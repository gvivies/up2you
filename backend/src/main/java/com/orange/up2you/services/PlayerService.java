package com.orange.up2you.services;

import com.orange.up2you.model.entities.Player;
import com.orange.up2you.model.entities.PlayerType;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

import java.util.List;

public interface PlayerService {
  List<Player> retrieveAllByType(PlayerType playerType);
  Player retrieve(Long id) throws ResourceNotFoundException;
  Player create(Player player);
  Player update(Player player) throws ResourceNotFoundException;
  void delete(Long id) throws ResourceNotFoundException;
}
