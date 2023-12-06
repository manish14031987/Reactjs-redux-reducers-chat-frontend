import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { getCard } from "../../actions/UserAction";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const CardModel = (props) => {
  const { show } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const request = {};
    dispatch(getCard(request, returnDataCard));
  }, [dispatch, props.handleCardModelClose]);
  const [getCardList, setCardList] = useState("");
  const returnDataCard = (data) => {
    setCardList(data);
  };
  const [getCardActiveState, setCardActiveState] = useState();

  const handleActiveCard = (data) => {
    setCardActiveState(data._id);
    // localStorage.setItem("card_token", data.cardToken);
    // localStorage.setItem("cardId", data._id);
    //  localStorage.setItem("card_no", data.maskedCardNo);
    props.handleCardModelClose(data);
  };
  /*const handleAddressSelect = (data) => {
    var id = data._id;
    var address = data.address;
    const params = { id };
    localStorage.setItem("address_id", id);
    localStorage.setItem("address_set", address);
    dispatch(setDefaultAddress(params));
    props.handleCloseAddress(false);
  };*/

  const handleCardModelClose = () => {
    props.handleCardModelClose(false);
  };
  return (
    <Fragment>
      <Dialog
        open={show}
        keepMounted
        onClick={handleCardModelClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <div className="offer-review-modal">
          <DialogTitle
            id="alert-dialog-slide-title"
            className="text-white"
            style={{ backgroundColor: "#0b90bb" }}
          >
            {t("SELECT_ADDRESS_REVIEW")}
          </DialogTitle>
          <DialogContent>
            {getCardList.card && getCardList.card.length > 0 ? (
              <ul className="remaining-boost work_list p-0 m-0 counter-card-model">
                {getCardList.card &&
                  getCardList.card.map((item, key) => (
                    <li
                      key={key}
                      className={`${
                        getCardActiveState === item._id ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        className="radio-remaining"
                        onClick={() => handleActiveCard(item)}
                        value={item.title}
                        name="remaining_boost"
                      />
                      <span className="title-r-boost ms-0">
                        <img src={item.cardBrand} alt={key} />{" "}
                        <strong>{item.maskedCardNo}</strong>
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <h3 className="boost-h3s">{t("CURRENTLY_CARD_NOT_AVAILABLE")}</h3>
            )}
          </DialogContent>
        </div>
        <DialogActions>
          <Button
            className="theme_btn close_btn"
            onClick={handleCardModelClose}
            autoFocus
          >
            {t("CLOSE")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CardModel;
