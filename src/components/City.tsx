import {IRestaurant} from "@/models/IRestaurant";
import {Restaurant} from "./Restaurant";

interface IProps {
  city: string;
  restaurants: IRestaurant[];
}

export const City = (props: IProps) => {
  const {city, restaurants} = props;

  return (
    <div>
      <h3 id={city}
          className={"text-2xl font-bold"}
      >{city}</h3>
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
