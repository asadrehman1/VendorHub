import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./VehicleCard.css"

const VehicleCard = ({ vehicle }) => {
  const options = {
    value: vehicle?.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="vehicleCard" to={`/vehicle/${vehicle?._id}`}>
      <img src={vehicle?.images[0]?.url} alt={vehicle?.model} />
      <p>{vehicle.model}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="vehicleCardSpan">
          {" "}
          ({vehicle?.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`Capacity: ${vehicle?.capacity}`}</span>
    </Link>
  );
};

export default VehicleCard;
