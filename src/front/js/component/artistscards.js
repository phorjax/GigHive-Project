import React from "react";

export const Artistcard = (props) => {
  return (
    <div className="card" style={{ minWidth: "18rem" }}>
      <img
        className="card-img-top"
        src="https://thorntons-investments.co.uk/wp-content/uploads/2017/08/400x200.png"
        alt="Card image cap"
      ></img>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.name}</h5>
        <p>{props.genre}</p>
        <p>{props.performance_type}</p>
      </div>
    </div>
  );
};
