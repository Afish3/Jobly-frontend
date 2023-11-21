import React from "react";
import { Link } from "react-router-dom";
import './CompanyCard.css';

/** Show company in list of companies. */

const CompanyCard = ({ name, description, logoUrl, handle }) => (
      <Link className="CompanyCard card m-4" to={`/companies/${handle}`}>
        <div className="card-body">
          <h6 className="card-title">
            {name}
            {logoUrl && <img src={logoUrl}
                             alt={name}
                             className="float-end" />}
          </h6>
          <p><small>{description}</small></p>
        </div>
      </Link>
  )

export default CompanyCard;