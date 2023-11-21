import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../auth/api";
import Jobs from "../jobs/CommonJobList";  
import Loading from "../Loading";

/** Company Detail page.
 *
 * Shows available jobs at the company.
 */

const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <Loading />;

  return (
      <div className="CompanyDetail p-5" style={{backgroundColor: "aquamarine"}}>
        <h4 className="mx-5 text-black">{company.name}</h4>
        <p className="mx-5 text-black">{company.description}</p>
        <Jobs jobs={company.jobs} />
      </div>
  );
}

export default CompanyDetail;
