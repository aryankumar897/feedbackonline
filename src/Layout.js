import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => (
    <React.Fragment>
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item p-3">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item p-3">
                    <Link to="/feedback">Feedback</Link>
                </li>
                <li className="nav-item p-3">
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
        <div className="container">{children}</div>
    </React.Fragment>
);

export default Layout;
