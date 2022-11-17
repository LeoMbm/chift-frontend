import React from "react";
import { NavLink } from 'react-router-dom';

const Pagination = ({ itemPerPage, setCurrentPage, totalItems }) => {
  let pageNumber = [];
  // Error for paginate 10 and 7 contact is here mmmmmmh... maybe i should use math ceil or something like that
  for (let i = 1; i <= totalItems / itemPerPage; i++) {
    pageNumber.push(i);
  }
  console.log(pageNumber);
  return (
    <div className="mx-auto w-fit">
    <div className="btn-group">
      {pageNumber.map((number) => (
        <div className="btn" onClick={()=>setCurrentPage(number)}>
          <div>
            <NavLink to="#" className="btn">
              {number}
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Pagination;
