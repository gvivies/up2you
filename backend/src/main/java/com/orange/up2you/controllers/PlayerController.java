package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.Player;
import com.orange.up2you.model.entities.PlayerType;
import com.orange.up2you.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class PlayerController {

  private PlayerService playerService;

  @Autowired
  public PlayerController(PlayerService playerService) {
    this.playerService = playerService;
  }

  @RequestMapping(path="/players", method = RequestMethod.GET)
  public List<Player> retrieveAllPersons() throws ResourceNotFoundException {
    return playerService.retrieveAllByType(PlayerType.PERSON);
  }

  @RequestMapping(path="/teams", method = RequestMethod.GET)
  public List<Player> retrieveAllTeams() throws ResourceNotFoundException {
    return playerService.retrieveAllByType(PlayerType.TEAM);
  }

  @RequestMapping(path = "/player/{id}", method = RequestMethod.GET)
  public Player retrievePlayer(@PathVariable Long id) throws ResourceNotFoundException {
    return playerService.retrieve(id);
  }

  @RequestMapping(path = "/player", method = RequestMethod.POST)
  public Player savePlayer(@RequestBody Player player) throws ResourceNotFoundException {
    return playerService.create(player);
  }

  @RequestMapping(path = "/player", method = RequestMethod.PUT)
  public Player updatePlayer(@RequestBody Player player) throws ResourceNotFoundException {
    return playerService.update(player);
  }

  @RequestMapping(path = "/player/{id}", method = RequestMethod.DELETE)
  public void deletePlayer(@PathVariable Long id) throws ResourceNotFoundException {
    playerService.delete(id);
  }
}
