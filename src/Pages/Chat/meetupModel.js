import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SheduleMeetup from "../Home/SheduleMeetup";
import { messageListing } from "../../utils/Socket";
import toggleNetworkRequestStatus from "../../actions/toggleNetworkRequestStatus";

const OrderModel = (props) => {
  const { item, roomId, userId } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showSheduleMeetupModal, setShowSheduleMeetupModal] = useState(false);

  const toggleSheduleMeetupModal = () => {
    setShowSheduleMeetupModal(!showSheduleMeetupModal);
  };

  const toggleSheduleMeetupModalClose = () => {
    setShowSheduleMeetupModal(false);
  };

  const toggleLoadMessage = () => {
    dispatch(toggleNetworkRequestStatus(true));
    setShowSheduleMeetupModal(false);
    setTimeout(function () {
      messageListing(roomId, userId);
      dispatch(toggleNetworkRequestStatus(false));
    }, 2000);
  };

  return (
    <Fragment>
      <div className="buyer-cardinfo buyer-detail-card">
        <div className=" buyer-card-list">
          <figure className="buyer-thumb-outer">
            <figcaption className="accepted-offer-main-div-cs">
              <h5>
                <span className="offer-accepted-cs">
                  {t("SCHEDULE_MEET_UP")}
                </span>
              </h5>

              <span className=""> {t("SET_MEET_UP_LOCATION")}</span>

              <Button
                className="theme_btn"
                onClick={() => toggleSheduleMeetupModal()}
              >
                {t("SCHEDULE_MEET_UP")}
              </Button>
              <span className="d-block"> {t("SET_MEET_UP_LOCATION")}</span>
            </figcaption>
          </figure>
        </div>
      </div>{" "}
      {showSheduleMeetupModal && (
        <SheduleMeetup
          item={item}
          roomId={roomId}
          show={showSheduleMeetupModal}
          onHide={() => toggleSheduleMeetupModalClose()}
          onLoadMessage={() => toggleLoadMessage()}
        />
      )}
    </Fragment>
  );
};

export default OrderModel;
