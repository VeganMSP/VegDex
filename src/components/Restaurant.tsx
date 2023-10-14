import React from "react";
import {IRestaurant} from "../models/IRestaurant";

export const Restaurant = (props: {restaurant: IRestaurant}) => {
    const {restaurant} = props;

    let restaurant_name;
    if (restaurant.website === "") {
      restaurant_name = restaurant.name;
    } else {
      restaurant_name = <RestaurantLink
        key={restaurant.slug}
        restaurant={restaurant}/>;
    }

    return (
      <li key={restaurant.name}>
        {restaurant_name} - {restaurant.description}
      </li>
    );
  };

export const RestaurantLink = (props: {restaurant: IRestaurant}): JSX.Element => {
  const {name, website, all_vegan} = props.restaurant;

  if (all_vegan && website === "") {
    return (
      <strong>{name}</strong>
    );
  } else if (!all_vegan && website !== "") {
    return (
      <a href={website}>{name}</a>
    );
  } else if (all_vegan && website !== "") {
    return (
      <a href={website}><strong>{name}</strong></a>
    );
  } else {
    return (<>
      {name}
    </>);
  }
};