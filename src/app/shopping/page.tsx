"use client";
import useSWR from "swr";
import {IFarmersMarket} from "@/models/IFarmersMarket";
import {IVeganCompany} from "@/models/IVeganCompany";
import {getShoppingData} from "@/services/ShoppingService";
import {DataSection} from "@/app/ui/dataSection";

const Shopping = () => {
  const { data, isLoading, error} = useSWR<{veganCompanies: IVeganCompany[], farmersMarkets: IFarmersMarket[]}>("farmersMarkets", getShoppingData);

  function renderVeganCompaniesList(veganCompanies: IVeganCompany[]) {
    if (veganCompanies && veganCompanies.length > 0) {
      return (
        <div>
          <ul>
            {veganCompanies.map(company =>
              <VeganCompany
                key={company.slug}
                company={company}/>
            )}
          </ul>
        </div>
      );
    }
    return (
      <div>
        <p>There are no vegan companies in the database!</p>
      </div>
    );
  }

  function renderFarmersMarketsList(farmersMarkets: IFarmersMarket[]) {
    if (farmersMarkets && farmersMarkets.length > 0) {
      return (
        <div>
          <ul>
            {farmersMarkets.map(market =>
              <FarmersMarket
                key={market.slug}
                market={market}/>
            )}
          </ul>
        </div>
      );
    }
    return (
      <div>
        <p>There are no farmers markets in the database!</p>
      </div>
    );
  }

  return (<>
    <DataSection isLoading={isLoading} sectionTitle={"Vegan Companies"}>
      {renderVeganCompaniesList(data?.veganCompanies as IVeganCompany[])}
    </DataSection>
    <DataSection isLoading={isLoading} sectionTitle={"Farmers Markets"}>
      {renderFarmersMarketsList(data?.farmersMarkets as IFarmersMarket[])}
    </DataSection>
  </>);
};

const FarmersMarket = (props: { market: IFarmersMarket }) => {
  const {name, website, address, description} = props.market;

  return (
    <li>
      <a href={website}>{name}</a> - {address} - {description}
    </li>
  );
};

const VeganCompany = (props: { company: IVeganCompany }) => {

  const {name, website, description} = props.company;

  return (
    <li>
      <a href={website}>{name}</a> - {description}
    </li>
  );
};
export default Shopping;
