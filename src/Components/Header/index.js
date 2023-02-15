import React from "react";
import {Button, Dropdown} from 'react-bootstrap';
import classes from "./index.module.scss";
import userImg from "../../Images/userImg.png";
import Nav from "../Nav";
import { useDispatch } from "react-redux";
import { LOGOUT } from "actions/types";






const Header = () => {
    const dispatch = useDispatch();
    const logout = () => {
        // console.log('test');
        localStorage.clear();
        dispatch({
            type: LOGOUT,
        });
    }
  return (
      <header className={classes.header}>
            <div className={classes.headerContainer}>
                <Button className={classes.notification} style={{marginRight:'52px'}}>
                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18 11V8C18 4.13401 14.866 1 11 1C7.13401 1 4 4.13401 4 8V11C4 14.3 1 15.1 1 17C1 18.7 4.9 20 11 20C17.1 20 21 18.7 21 17C21 15.1 18 14.3 18 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.9995 21.9984C9.98853 21.9984 9.03853 21.9644 8.14453 21.8984C8.5357 23.1462 9.69187 23.9954 10.9995 23.9954C12.3072 23.9954 13.4634 23.1462 13.8545 21.8984C12.9605 21.9644 12.0105 21.9984 10.9995 21.9984Z" fill="black"/>
                    </svg>
                    <span className={classes.counter}>5</span>
                </Button>
                <Dropdown className={classes.userDropdown}>
                    <Dropdown.Toggle className={classes.userProfile} >
                        <img src={userImg} alt={"user name"} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/">Action</Dropdown.Item>
                        <Dropdown.Item href="#/">Another action</Dropdown.Item>
                        <Dropdown.Item href="/login" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Nav />
      </header>
  )
};

export default Header;
