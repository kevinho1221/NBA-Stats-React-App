import React, { Component } from "react";

const Player = ({ stats, name, isPressed }) => {
  if (!isPressed) {
    return null;
  }
  var roundedfgm = "";
  var roundedftm = "";
  var roundedthrees = Number(stats.fg3m).toFixed(1);
  var roundedpts = Number(stats.pts).toFixed(1);
  var roundedreb = Number(stats.reb).toFixed(1);
  var roundedast = Number(stats.ast).toFixed(1);
  var roundedstl = Number(stats.stl).toFixed(1);
  var roundedblk = Number(stats.blk).toFixed(1);
  var roundedturnover = Number(stats.turnover).toFixed(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (stats.player_id == "Categories") {
    roundedfgm = "FG%";
    roundedftm = "FT%";
    roundedthrees = "3PTM";
    roundedpts = "Points";
    roundedreb = "Rebounds";
    roundedast = "Assists";
    roundedstl = "Steals";
    roundedblk = "Blocks";
    roundedturnover = "Turnovers";
    return (
      <div>
        <h1 className="pName">{name}</h1>
        <h1 className="pFGM">{roundedfgm}</h1>
        <h1 className="pFTM">{roundedftm}</h1>
        <h1 className="pThrees">{roundedthrees}</h1>
        <h1 className="pPoints">{roundedpts}</h1>
        <h1 className="pRebounds">{roundedreb}</h1>
        <h1 className="pAssists">{roundedast}</h1>
        <h1 className="pSteals">{roundedstl}</h1>
        <h1 className="pBlocks">{roundedblk}</h1>
        <h1 className="pTurnover">{roundedturnover}</h1>
        <div>
          <button className="to-top-button" onClick={scrollToTop}>
            Back to Top
          </button>
        </div>
      </div>
    );
  } else {
    const fgm = stats.fgm / stats.fga;
    const ftm = stats.ftm / stats.fta;
    roundedfgm = fgm.toFixed(3);
    roundedftm = ftm.toFixed(3);
    return (
      <div>
        <h1 className="pName">{name}</h1>
        <h1 className="pFGM">{roundedfgm}</h1>
        <h1 className="pFTM">{roundedftm}</h1>
        <h1 className="pThrees">{roundedthrees}</h1>
        <h1 className="pPoints">{roundedpts}</h1>
        <h1 className="pRebounds">{roundedreb}</h1>
        <h1 className="pAssists">{roundedast}</h1>
        <h1 className="pSteals">{roundedstl}</h1>
        <h1 className="pBlocks">{roundedblk}</h1>
        <h1 className="pTurnover">{roundedturnover}</h1>
      </div>
    );
  }
};

export default Player;
