import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  Component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  Layout: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
};

const ElementControl = ({ Component, Layout }) => {
  if (Layout) {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
  return <Component />;
};

ElementControl.propTypes = propTypes;

export default ElementControl;
