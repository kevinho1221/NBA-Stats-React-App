import React from "react";

const suggestions = ({ sugg1, sugg2, sugg3, sugg4, sugg5 }) => {
  return (
    <div>
      <h1>
        {sugg1.first_name} {sugg1.last_name}
      </h1>
      <h1>
        {sugg2.first_name} {sugg2.last_name}
      </h1>
      <h1>
        {sugg3.first_name} {sugg3.last_name}
      </h1>
      <h1>
        {sugg4.first_name} {sugg4.last_name}
      </h1>
      <h1>
        {sugg5.first_name} {sugg5.last_name}
      </h1>
    </div>
  );
};

export default suggestions;
