import React from "react";

const Player = ({ stats, name }) => {
  return (
    <div>
      <h1 className="pname">{name}</h1>
      <h1>{stats.player_id}</h1>
      <h1>{stats.pts}</h1>
      <h1>{stats.reb}</h1>
      <h1>{stats.ast}</h1>
    </div>
  );
};

export default Player;
