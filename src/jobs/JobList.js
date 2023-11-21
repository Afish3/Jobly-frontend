import React, { useState, useEffect } from "react";
import JoblyApi from "../auth/api";
import Jobs from "./CommonJobList";
import Loading from "../Loading";
import SearchForm from "../SearchForm";

/** List all job cards.
 *
 * Calls API.getJobs on mount.
 * 
 * Filters companies on search form submission.
 */

const JobList = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    search()
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
}

  if (!jobs) return <Loading />;

  return (
      <div className="JobList p-5" style={{backgroundColor: "aquamarine"}}>
        <SearchForm searchFor={search} />
        {jobs.length
            ? <Jobs jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default JobList;
