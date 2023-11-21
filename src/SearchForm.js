import React, { useState } from "react";

/** Search bar for lfiltering jobs and companies.
 *
 * @prop {Function} searchFor is passed down from the parent component and is called here.
 * 
 */

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div className="SearchForm">
        <div className="SearchForm-container">
            <form className="form-inline row" onSubmit={handleSubmit}>
                <div className="col-10">
                    <input
                        className="form-control form-control-lg flex-grow-1 mx-5"
                        name="searchTerm"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-lg btn-primary my-0 ">
                        Search
                    </button>
                </div>
            </form>
        </div>
      </div>
  );
}

export default SearchForm;
