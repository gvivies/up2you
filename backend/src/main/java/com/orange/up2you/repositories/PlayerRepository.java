package com.orange.up2you.repositories;

import com.orange.up2you.model.entities.Player;
import com.orange.up2you.model.entities.PlayerType;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlayerRepository extends CrudRepository<Player, Long> {
  List<Player> findAllByPlayerTypeOrderByName(PlayerType playerType);
}
