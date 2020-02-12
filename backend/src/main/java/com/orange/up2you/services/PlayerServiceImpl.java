package com.orange.up2you.services;

import com.orange.up2you.model.entities.Player;
import com.orange.up2you.model.entities.PlayerType;
import com.orange.up2you.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {

  private PlayerRepository playerRepository;

  @Autowired
  public PlayerServiceImpl(PlayerRepository playerRepository) {
    this.playerRepository = playerRepository;
  }

  @Override
  public List<Player> retrieveAllByType(PlayerType playerType) {
    return playerRepository.findAllByPlayerTypeOrderByName(playerType);
  }

  @Override
  public Player retrieve(Long id) throws ResourceNotFoundException {
    if (id == null) {
      throw new IllegalArgumentException("Id can not be null");
    }
    return playerRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(String.format("The player with id %d does not exist", id)));
  }

  @Override
  public Player create(Player player) {
    if (player == null) {
      throw new IllegalArgumentException("Player can not be null");
    }
    return playerRepository.save(player);
  }

  @Override
  public Player update(Player player) throws ResourceNotFoundException {
    if (player == null) {
      throw new IllegalArgumentException("Player can not be null");
    }
    retrieve(player.getId());
    return playerRepository.save(player);
  }

  @Override
  public void delete(Long id) throws ResourceNotFoundException {
    if (id == null) {
      throw new IllegalArgumentException("Player id can not be null");
    }
    try {
      playerRepository.deleteById(id);
    } catch (EmptyResultDataAccessException err) {
      throw new ResourceNotFoundException("The player with id %d does not exist");
    }
  }
}
