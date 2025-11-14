import React from "react";

const SearchBar = ({ placeholder }) => (
  <input type="text" placeholder={placeholder || "Search events..."} />
);

export default SearchBar;
