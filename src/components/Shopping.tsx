import React, {useEffect, useState} from "react";
import {IFarmersMarket} from "../models/IFarmersMarket";
import {IVeganCompany} from "../models/IVeganCompany";
import {getShoppingData} from "../services/ShoppingService";

export const Shopping = () => {
  const [farmersMarkets, setFarmersMarkets] = useState<IFarmersMarket[] | null>(null);
  const [veganCompanies, setVeganCompanies] = useState<IVeganCompany[] | null>(null);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingMarkets, setLoadingMarkets] = useState(true);

  function renderVeganCompaniesList(veganCompanies: IVeganCompany[]) {
    if (veganCompanies.length > 0) {
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
    } else {
      return (
        <div>
          <p>There are no vegan companies in the database!</p>
        </div>
      );
    }
  }

  function renderFarmersMarketsList(farmersMarkets: IFarmersMarket[]) {
    if (farmersMarkets.length > 0) {
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
    } else {
      return (
        <div>
          <p>There are no farmers markets in the database!</p>
        </div>
      );
    }
  }

  useEffect(() => {
    if (farmersMarkets && veganCompanies) {
      setLoadingMarkets(false);
      setLoadingCompanies(false);
    } else {
      getShoppingData().then(r => {
        if (r.ok) {
          return r.json();
        }
      }).then(data => {
        setFarmersMarkets(data.farmersMarkets);
        setVeganCompanies(data.veganCompanies);
        setLoadingCompanies(false);
        setLoadingMarkets(false);
      });
    }
  }, [veganCompanies, farmersMarkets]);

  return (<>
    <div>
      <h2>Vegan Companies</h2>
      {loadingCompanies ? <p><em>Loading...</em></p> :
        renderVeganCompaniesList(veganCompanies as IVeganCompany[])}
    </div>
    <div>
      <h2>Farmers Markets</h2>
      {loadingMarkets ? <p><em>Loading...</em></p> :
        renderFarmersMarketsList(farmersMarkets as IFarmersMarket[])}
    </div>
  </>);
};

const FarmersMarket = (props: { market: IFarmersMarket }) => {
  const {name, website, address, description} = props.market;

  return (
    <li>
      <a href={website}>{name}</a> - {address.name} - {description}
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