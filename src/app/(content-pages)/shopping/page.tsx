"use client";
import useSWR from "swr";
import {FarmersMarket} from "@/models/FarmersMarket";
import {VeganCompany} from "@/models/VeganCompany";
import {DataSection} from "@/app/ui/dataSection";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Shopping = () => {
  const { data: veganCompanyData, isLoading: veganCompanyLoading, error: veganCompanyError} = useSWR<VeganCompany[]>("/api/shopping/vegan-companies", fetcher);
  const { data: farmersMarketData, isLoading: farmersMarketLoading, error: farmersMarketError} = useSWR<FarmersMarket[]>("/api/shopping/farmers-markets", fetcher);

  if (veganCompanyError) console.error(veganCompanyError);
  if (farmersMarketError) console.error(farmersMarketError);

  function renderVeganCompaniesList(veganCompanies?: VeganCompany[]) {
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

  function renderFarmersMarketsList(farmersMarkets?: FarmersMarket[]) {
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
    <DataSection isLoading={veganCompanyLoading} sectionTitle={"Vegan Companies"}>
      {renderVeganCompaniesList(veganCompanyData)}
    </DataSection>
    <DataSection isLoading={farmersMarketLoading} sectionTitle={"Farmers Markets"}>
      {renderFarmersMarketsList(farmersMarketData)}
    </DataSection>
  </>);
};

const FarmersMarket = (props: { market: FarmersMarket }) => {
  const {name, website, address, description} = props.market;

  return (
    <li>
      <a href={website}>{name}</a> - {address} - {description}
    </li>
  );
};

const VeganCompany = (props: { company: VeganCompany }) => {

  const {name, website, description} = props.company;

  return (
    <li>
      <a href={website}>{name}</a> - {description}
    </li>
  );
};
export default Shopping;
