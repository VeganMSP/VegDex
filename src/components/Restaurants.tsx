import React, {useEffect, useState} from "react";
import {City} from "./City";
import {ICity} from "../models/ICity";
import {getRestaurantsByCity} from "../services/RestaurantService";

export const Restaurants = () => {
  const [data, setData] = useState<ICity[] | null>(null);
  const [loading, setLoading] = useState(true);

  const renderRestaurantsList = (restaurants_by_city: ICity[]) => {
    return (
      <div>
        {restaurants_by_city.length > 0 ? <>
          {restaurants_by_city.map(city =>
            <City
              key={city.slug}
              city={city}
              restaurants={city.restaurants}
            />)}
        </> : <>
          <p>There are no restaurants in the database.</p>
        </>}
      </div>
    );
  }

  const renderCityList = (restaurants_by_city: ICity[]) => {
    return (
      <div>
        {restaurants_by_city.length > 0 ? <>
          Jump to city:
          <ul>
            {restaurants_by_city.map(city =>
              <li key={city.slug}><a href={"#" + city.slug}>{city.name}</a></li>
            )}
          </ul>
        </> : <>
          <p>No cities in the database.</p>
        </>}
      </div>
    );
  }

  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      getRestaurantsByCity().then(r => {
        if (r.ok) return r.json();
      }).then(data => {
        setData(data);
        setLoading(false);
      })
    }
  }, [data]);

  return (
    <div>
      <h2>Restaurants</h2>
      {loading ? <p><em>Loading...</em></p> : <>
        {renderCityList(data as ICity[])}
        {renderRestaurantsList(data as ICity[])}
      </>}
    </div>
  );
};