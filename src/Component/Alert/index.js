import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loadToasterClose } from "../../actions/baseActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = (props) => {
  const [state] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  const { toaster } = useSelector((state) => ({
    toaster: state.toaster,
  }));
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(loadToasterClose(toaster));
  };
  return (
    <Snackbar
      open={toaster.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <Alert
        onClose={handleClose}
        severity={toaster.severity}
        sx={{ maxwidth: "50%" }}
      >
        {toaster.message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
