package com.orange.up2you.controllers;

import com.orange.up2you.model.entities.MoveCommand;
import com.orange.up2you.model.entities.Track;
import com.orange.up2you.services.MoveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/")
public class MovementController {

  private MoveService moveService;

  @Autowired
  public MovementController(MoveService moveService) {
    this.moveService = moveService;
  }

  @RequestMapping(path = "move", method = RequestMethod.POST)
  @ResponseBody
  public Track move(@RequestBody MoveCommand moveCommand) {
    return moveService.move(moveCommand);
  }

}
