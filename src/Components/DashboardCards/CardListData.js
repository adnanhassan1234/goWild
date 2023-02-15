import React from 'react';
import { Card, Col, Row, ProgressBar } from "react-bootstrap";
import { PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import classes from "./index.module.scss";

const CardListData = ( props ) => {


    return (
        <>
            <Col md={4} >
                <Card className={`${classes.card} my-2`}>
                    <Card.Body>
                        <div className={`${classes.iconBox}`}>
                            <img src={props.image} alt={props.title} />
                        </div>
                        <div className={"overflow-hidden"}>
                            <div className={classes.left}>
                                <h2 className={classes.total}>{props.content}</h2>
                            </div>
                            <div className={classes.right}>
                                <ProgressBar className={classes.status} style={{background: props.background}}  />
                            </div>
                        </div>
                        <Card.Title className={"font-16"}>{props.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default CardListData;