import React, { useState, useEffect } from "react";
import JoblyApi from "../auth/api";
import CompanyCard from "./CompanyCard";
import Loading from "../Loading";
import SearchForm from "../SearchForm";

/** List all company cards.
 *
 * Calls API.getCompanies on mount.
 * 
 * Filters companies on search form submission.
 */

const CompanyList = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    search()
  }, []);  

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
}

  if (!companies) return <Loading />;

  return (
      <div className="CompanyList p-5" style={{backgroundColor: "aquamarine"}}>
        <SearchForm searchFor={search} />
        {companies.length
            ? (
                <div className="CompanyList-list">
                  {companies.map(c => (
                      <CompanyCard
                          key={c.handle}
                          handle={c.handle}
                          name={c.name}
                          description={c.description}
                          logoUrl={c.logoUrl}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default CompanyList;
