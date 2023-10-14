import React from "react";
import {ICity} from "../models/ICity";
import {IRestaurant} from "../models/IRestaurant";
import {Restaurant} from "./Restaurant";

interface IProps {
  city: ICity;
  restaurants: IRestaurant[];
}

export const City = (props: IProps) => {
  const {city, restaurants} = props;

  return (
    <div>
      <h3 id={city.slug}>{city.name}</h3>
      <ul>
        {restaurants.map(restaurant =>
          <Restaurant
            key={restaurant.slug}
            restaurant={restaurant}/>
        )}
      </ul>
    </div>
  );
};
