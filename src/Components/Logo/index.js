import React from "react";
import classes from "./index.module.scss";
import {Link} from "react-router-dom";
import logo from "../../Images/logo.svg";

const Logo = () => {
    return (
        <>
            <div className={`${classes.logo}`}>
                <Link to={"/dashboard"}>
                    <img src={logo} alt={"goWild"} />
                </Link>
            </div>
        </>
    );
};

export default Logo;