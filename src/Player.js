import React, { Component } from "react";

const Player = ({ stats, name, isPressed }) => {
  if (!isPressed) {
    return null;
  }

  return (
    <div>
      <h1 className="pName">{name}</h1>
      <h1 className="pId">{stats.player_id}</h1>
      <h1 className="pPoints">{stats.pts}</h1>
      <h1 className="pRebounds">{stats.reb}</h1>
      <h1 className="pAssists">{stats.ast}</h1>
    </div>
  );
};

export default Player;
