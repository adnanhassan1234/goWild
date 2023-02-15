import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getPokemonList } from "Containers/App/actions";
import { selectGreeting } from "Containers/App/selectors";

const Home = ({ greeting }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonList());
  });

  return <div>{greeting}</div>;
};

const mapStateToProps = createStructuredSelector({
  greeting: selectGreeting,
});

Home.propTypes = {
  greeting: PropTypes.string,
};

export default connect(mapStateToProps)(Home);
