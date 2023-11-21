import React from "react";
import JobCard from "./JobCard";

/** Show list of job cards... can be used on both company details page as well as
 * jobs list page. */

const CommonJobList = ({ jobs }) => (
      <div className="CommonJobList">
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
            />
        ))}
      </div>
  )

export default CommonJobList;