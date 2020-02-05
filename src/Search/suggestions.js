import React, { Component } from "react";

const suggestions = ({
  sugg1,
  sugg2,
  sugg3,
  sugg4,
  sugg5,
  isOpen,
  handler
}) => {
  if (!isOpen) return null;

  return (
    <div className="allSugg">
      <div className="suggTop" onClick={handler}>
        {sugg1.first_name} {sugg1.last_name}
      </div>
      <div className="suggTopMid" onClick={handler}>
        {sugg2.first_name} {sugg2.last_name}
      </div>
      <div className="suggMid" onClick={handler}>
        {sugg3.first_name} {sugg3.last_name}
      </div>
      <div className="suggBotMid" onClick={handler}>
        {sugg4.first_name} {sugg4.last_name}
      </div>
      <div className="suggBot" onClick={handler}>
        {sugg5.first_name} {sugg5.last_name}
      </div>
    </div>
  );
};

export default suggestions;
