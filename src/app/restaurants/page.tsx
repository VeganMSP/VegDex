"use client";
import useSWR from "swr";
import {City} from "@/components/City";
import {getRestaurantsByCity} from "@/services/RestaurantService";
import {IRestaurant} from "@/models/IRestaurant";
import {DataSection} from "@/app/ui/dataSection";

const Restaurants = () => {
  const {data, isLoading, error} = useSWR<IRestaurant[]>("restaurants", getRestaurantsByCity);

  const renderRestaurantsList = (restaurants?: IRestaurant[]) => {
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

  const renderCityList = (restaurants?: IRestaurant[]) => {
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

  return (
    <DataSection isLoading={isLoading} sectionTitle={"Restaurants"}>
        {renderCityList(data)}
        {renderRestaurantsList(data)}
    </DataSection>
  );
};
export default Restaurants;
