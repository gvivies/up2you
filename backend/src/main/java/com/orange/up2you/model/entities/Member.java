package com.orange.up2you.model.entities;

public class Member extends Player {

  @Override
  public PlayerType getPlayerType() {
    return PlayerType.PERSON;
  }
}
