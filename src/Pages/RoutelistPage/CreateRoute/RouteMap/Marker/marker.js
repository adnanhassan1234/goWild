import React from 'react';
import classes from  './index.module.scss';

const Marker = (props) => {
    const { img, name, id } = props;
    return (
        <div className={classes.marker}
             style={{backgroundImage: "url(" + { img } + ")", cursor: 'pointer'}}
             title={name}
        />
    );
};

export default Marker;