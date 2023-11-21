import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import './JobCard.css';

/** Show job information. 
* 
* function to apply for job and boolean value to determine if a job has been applied to
* are retrieved from the userContext set up in `App` component and auth/UserContext.js
*/

function JobCard({ id, title, salary, equity, companyName }) {
  const { hasApplied, apply } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(() => {
    setApplied(hasApplied(id));
  }, [id, hasApplied]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasApplied(id)) return;
    apply(id);
    setApplied(true);
  }

  return (
      <div className="JobCard card m-4"> {applied}
        <div className="card-body row">
            <div className="col">
                <h6 className="card-title">{title}</h6>
                <p>{companyName}</p>
                {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                {equity !== undefined && <div><small>Equity: {equity}</small></div>}
            </div>
            <div className="col">
                <button
                className="btn btn-danger font-weight-bold text-uppercase float-end"
                onClick={handleApply}
                disabled={applied}
                >
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
      </div>
  );
}

/** Add commas to salary for formatted display using RegEx */

function formatSalary(salary) {
  let salaryStr = String(salary);

  salaryStr = salaryStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return salaryStr;
}


export default JobCard;
