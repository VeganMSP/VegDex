import {Restaurant} from "@/models/Restaurant";
import {RestaurantItem} from "./Restaurant";

interface IProps {
  city: string;
  restaurants: Restaurant[];
}

export const City = (props: IProps) => {
  const {city, restaurants} = props;

  return (
    <div>
      <h3 id={city}
          className={"text-2xl font-bold mt-6"}
      >{city}</h3>
      <ul>
        {restaurants.map(restaurant =>
          <RestaurantItem
            key={restaurant.slug}
            restaurant={restaurant}/>
        )}
      </ul>
    </div>
  );
};
