package com.orange.up2you.model.entities;


import javax.persistence.*;

@Entity
public class Place {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  private Player player;

  private int position;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "track_id", nullable = true)
  private Track track;

  public Player getPlayer() {
    return player;
  }

  public void setPlayer(Player player) {
    this.player = player;
  }

  public int getPosition() {
    return position;
  }

  public void setPosition(int position) {
    this.position = position;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Track getTrack() {
    Track trackLight = new Track();
    trackLight.setId(track.getId());
    return trackLight;
  }

  public void setTrack(Track track) {
    this.track = track;
  }
}


