import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const Index = (props) => {
  const { title, isSubmitting } = props;
  return (
    <Button
      type="submit"
      className="theme_btn"
      disabled={isSubmitting ? true : false}
    >
      {isSubmitting ? (
        <Fragment>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
          ></span>
        </Fragment>
      ) : (
        <>{title}</>
      )}
    </Button>
  );
};

function mapStateToProps(state) {
  return {
    isSubmitting: state.isSubmitting,
  };
}

export default connect(mapStateToProps)(Index);
