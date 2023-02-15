import React from "react";
import classes from './index.module.scss';

import Header from "Components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.mainContent}>
          {children}
      </div>
    </div>
  );
};

export default MainLayout;
