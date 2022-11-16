import React from 'react';
import Pagination from '../Components/Paginations/Pagination';
import { useState } from 'react';

const Contact = ({Logged, setLogged, Partners}) => {
    const [currentPage, setcurrentPage] = useState(1)
    const [itemPerPage, setitemPerPage] = useState(8)
    const lastIndex = currentPage * itemPerPage
    const firstIndex = lastIndex - itemPerPage
    const allItems = Partners.slice(firstIndex, lastIndex)

    return (
        <div>
            {Logged? 
            (<div className="container-fluid">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Street</th>
                  <th>Zip</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {allItems?.map(partner=>(
                     <tr key={partner.id}>
                     <th >{partner.id}</th>
                     <td>{partner.name}</td>
                     <td>{partner.email}</td>
                     <td>{partner.street}</td>
                     <td>{partner.zip}</td>
                     <td>{partner?.country_id[1]}</td>
                   </tr>

                ))}
               
              </tbody>
            </table>
                <Pagination itemPerPage={itemPerPage} setCurrentPage={setcurrentPage} totalItems={Partners.length} />
          </div>) 
            : 
            (<h1 className="text-2xl text-center font-bold sm:text-3xl">U need to login first </h1>)
            }
            
        </div>
    );
};

export default Contact;