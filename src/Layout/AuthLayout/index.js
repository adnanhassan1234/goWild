import React from "react";
import classes from "./index.module.scss";
import image from "../../Images/authLayoutbg.jpg";
import Logo from "../../Components/Logo";



const MainLayout = ({ children }) => {
    return (
        <div id={"wrapper"}>
            <div className={classes.authLayout} style={{ backgroundImage:`url(${image})` }}>
                <div className={classes.boxHolder}>
                    <div className={classes.leftCol}>
                        <Logo />
                    </div>
                    <div className={classes.rightCol}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
