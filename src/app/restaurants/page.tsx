"use client";
import React, {useEffect, useState} from "react";
import {City} from "@/components/City";
import {getRestaurantsByCity} from "@/services/RestaurantService";
import {IRestaurant} from "@/models/IRestaurant";

const Restaurants = () => {
  const [data, setData] = useState<IRestaurant[] | null>(null);
  const [loading, setLoading] = useState(true);

  const renderRestaurantsList = (restaurants: IRestaurant[] | null) => {
    if (!restaurants) return null;
    let restaurants_by_city: {[key: string]: IRestaurant[]} = restaurants.reduce((acc, restaurant) => {
      acc[restaurant.city] = acc[restaurant.city] || [];
      acc[restaurant.city].push(restaurant);
      return acc;
    }, Object.create(null));
    let cities = Object.keys(restaurants_by_city).sort();
    return (
      <div>
        {cities.length > 0 ? <>
          {cities.map(city =>
            <City
              key={city}
              city={city}
              restaurants={restaurants_by_city[city]}
            />)}
        </> : <>
          <p>There are no restaurants in the database.</p>
        </>}
      </div>
    );
  };

  const renderCityList = (restaurants: IRestaurant[] | null) => {
    if (!restaurants) return null;
    let restaurants_by_city: {[key: string]: IRestaurant[]} = restaurants.reduce((acc, restaurant) => {
      acc[restaurant.city] = acc[restaurant.city] || [];
      acc[restaurant.city].push(restaurant);
      return acc;
    }, Object.create(null));
    let cities = Object.keys(restaurants_by_city).sort();
    return (
      <div>
        {cities.length > 0 ? <>
          Jump to city:
          <ul>
            {cities.map(city =>
              <li key={city}><a href={"#" + city}>{city}</a></li>
            )}
          </ul>
        </> : <>
          <p>No cities in the database.</p>
        </>}
      </div>
    );
  };

  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      getRestaurantsByCity()
        .then(data => {
          setData(data);
          setLoading(false);
        });
    }
  }, [data]);

  return (
    <div>
      <h2>Restaurants</h2>
      {loading ? <p><em>Loading...</em></p> : <>
        {renderCityList(data)}
        {renderRestaurantsList(data)}
      </>}
    </div>
  );
};
export default Restaurants;
