import { Fragment, lazy, React, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { loadOrderData } from "../../actions/HomeAction";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function OrderPayment(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // All Selectors
  const { USER_INFO } = useSelector((state) => ({
    USER_INFO: state.userInfo,
  }));
  var amountTotal = localStorage.getItem("amount");
  var card_tokens = localStorage.getItem("card_token");
  useEffect(() => {
    var first_name = USER_INFO.first_name;
    var lastName = USER_INFO.last_name;
    var phoneNumber = USER_INFO.mobile_number;
    var customerEmail = USER_INFO.email;
    var amount = amountTotal;
    var card_token = card_tokens;

    const request = {
      first_name,
      lastName,
      phoneNumber,
      customerEmail,
      amount,
      card_token,
    };
    dispatch(loadOrderData(request, returnData));
  }, [dispatch, USER_INFO, amountTotal, card_tokens]);
  const [getDataUrl, setDataUrl] = useState("");
  const returnData = (data) => {
    setDataUrl(data);
  };
  const ref = useRef(null);
  useEffect(() => {
    if (getDataUrl !== "") {
      ref.current.click();
    }
  }, [getDataUrl]);
  const [open, setOpen] = useState(true);
  return (
    <div className="container">
      <Backdrop
        sx={{ color: "#00BFFF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {getDataUrl !== "" && (
        <form
          name="pymForm"
          method="POST"
          action={getDataUrl}
          style={{ display: "none" }}
        >
          <h1>Transaction is processing.....</h1>
          <button ref={ref} type="submit">
            {t("SUBMIT")}
          </button>
        </form>
      )}
    </div>
  );
}

export default OrderPayment;
