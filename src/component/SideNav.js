import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
const SideNav = () => {
    return (
        <div className="sidenav-container">
            <div className="row justify-content-between border g-0 p-4 align-items-center">
                <div className="col-md-3 brand-icon">
                    <img src={logo} alt="Brand logo" className="rounded-circle" />
                </div>
                <div className="col-md-9 ps-2">
                    <h5><strong>Technext HR</strong></h5>
                </div>
            </div>
            <div className="sidemenu border">
                <ul>
                    <li>
                    <i class="fas fa-user-shield"></i> <b>HRMS</b>
                        <ul>
                            <li><Link to="/">Employees</Link></li>
                            <li><Link to="/addEmployee">Add Employee</Link></li>
                            <li>Mail2Employee</li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

export default SideNav;