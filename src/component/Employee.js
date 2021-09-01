import React, { useEffect, useState } from 'react';
import './Home.css';
import SideNav from './SideNav';
import FilteringTable from './FilteringTable';
import API from '../utils/API';

//::::::::::::::::::::::::::::::::::::::::::::
const Employee = () => {
    const [employees, setEmployees] = useState({
        employees: []
    })

    //::::::::::: GET all data form MySQL table ::::::::::

    useEffect(() => {
        API.getData()
            .then((response) => {
                let employees = response.data.map(employee => {
                    return {
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        email: employee.email
                    }
                })
                setEmployees({ employees });
                console.log(employees);
            });
    }, []);


    return (
        <div className="container-fluid mx-0 px-0 gx-0">
            <div className="row mx-0 px-0 gx-0">
                <div className="col-md-3">
                    <SideNav />
                </div>
                <div className="col-md-9 right-side">
                    <div className="row justify-content-end main-container gx-0">
                        <div className="header">
                            <a href="#default" className="logo">Employees</a>
                            <div className="header-right">
                                <a className="active" href="#home">LOG OUT</a>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 p-0 justify-content-center mt-5">
                        <div className="col-md-10 data-table align-items-center justify-content-center text-center">
                            <FilteringTable data={employees.employees} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                    </div>
                    <div className="row justify-content-center align-items-center">
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Employee;