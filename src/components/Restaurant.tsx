import React from "react";
import {Restaurant} from "@/models/Restaurant";

export const RestaurantItem = (props: {restaurant: Restaurant}) => {
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
        {restaurant_name} {restaurant.description ? <>- {restaurant.description}</> : null}
      </li>
    );
  };

export const RestaurantLink = (props: {restaurant: Restaurant}): JSX.Element => {
  const {name, website, allVegan} = props.restaurant;

  if (allVegan && website === "") {
    return (
      <strong>{name}</strong>
    );
  } else if (!allVegan && website !== "") {
    return (
      <a href={website} target={"_blank"}>{name}</a>
    );
  } else if (allVegan && website !== "") {
    return (
      <a href={website} target={"_blank"}><strong>{name}</strong></a>
    );
  } else {
    return (<>
      {name}
    </>);
  }
};