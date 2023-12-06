import React, { Fragment, lazy, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Cash, card } from "../../assets/images/index";
import toggleNetworkRequestStatus from "../../actions/toggleNetworkRequestStatus";
import {
  cancelOfferRequest,
  acceptOfferRequest,
  messageListing,
} from "../../utils/Socket";
const CounterOffer = lazy(() => import("./counterOffer"));
const AcceptOfferModal = lazy(() => import("./acceptOfferModal"));

const OfferMessage = (props) => {
  const { userId, roomId, item, roomDetails } = props;
  console.log("ITEM->>>>", item);
  console.log("Room Details->>>", roomDetails);
  const [show, setShow] = useState(false);
  const [acceptShow, setAcceptShow] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { selectedLang } = useSelector((state) => ({
    selectedLang: state.selectedLang,
  }));

  const counterOffer = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const cancelOffer = (e, item) => {
    e.preventDefault();
    var request = {};
    request.room_id = roomId;
    request.user_id = userId;
    request.chat_message_id = item?._id;
    request.language = selectedLang;
    cancelOfferRequest(request);
    setTimeout(function () {
      dispatch(toggleNetworkRequestStatus(false));
      messageListing(roomId, userId);
    }, 2000);
  };

  const showAcceptOffer = () => setAcceptShow(true);
  const closeAcceptOffer = () => setAcceptShow(false);

  const acceptOffer = (e) => {
    e.preventDefault();
    if (item.item.payment_type) {
      confirmedOffer(item.item.payment_type);
    } else {
      showAcceptOffer();
    }
  };

  const confirmedOffer = (paymentType) => {
    var request = {};
    request.room_id = roomId;
    request.user_id = userId;
    request.language = selectedLang;
    request.paymentId = "";
    request.acceptBy = "SELLER";
    if (item.receiver === userId) {
      request.acceptBy = "BUYER";
    }
    request.paymentType = paymentType;
    request.cardId = "";
    dispatch(toggleNetworkRequestStatus(true));
    acceptOfferRequest(request);
    closeAcceptOffer();

    setTimeout(function () {
      dispatch(toggleNetworkRequestStatus(false));
      messageListing(roomId, userId);
    }, 2000);
  };

  return (
    <Fragment>
      <div
        className="buyer-cardinfo buyer-detail-card mobile-chat-buyer"
        style={{ width: "100%" }}
      >
        <div className=" buyer-card-list">
          <figure className="buyer-thumb-outer">
            <span className="img-thumb img-md-thumbnail">
              <img src={item?.item?.image} alt="postImage" />
            </span>
            <figcaption>
              <h5>
                {item?.sender === userId && (
                  <span>{t("OFFER_SEND")}&nbsp;</span>
                )}
                {item?.receiver === userId && (
                  <span>{t("OFFER_RECEIVED")}&nbsp;</span>
                )}
                {item?.item?.meetUp && <span>{t("MEET_UP")}</span>}
                {item?.item?.shipping && <span>{t("SHIPPING")}</span>}
              </h5>
              <strong>
                {t("OFFER_FOR")} {item?.item?.price.toFixed(2)} SR
              </strong>
              <div className="paymethod">
                <small>{t("PAYMENT_METHOD")}</small>
                {item?.item?.payment_type === "CASH" ? (
                  <span className="card-pay">
                    <img src={Cash} alt="card_image" />
                  </span>
                ) : item?.item?.payment_type === "ONLINE" ? (
                  <span className="card-pay">
                    <img src={card} alt="card_image" />
                  </span>
                ) : (
                  <span>N/A</span>
                )}
              </div>
            </figcaption>
          </figure>
          {item?.receiver === userId && (
            <div className="buyer_btn">
              <a
                href="#!"
                className="btn counter-btn green-btn"
                onClick={(e) => acceptOffer(e, item)}
              >
                {t("ACCEPT_OFFER")}
              </a>
              <a
                href="#!"
                className="btn counter-btn blur-border-btn"
                onClick={counterOffer}
              >
                {t("COUNTER_OFFER")}
              </a>
            </div>
          )}
          {item?.sender === userId && (
            <div className="buyer_btn">
              <a
                href="#!"
                className="btn counter-btn red-btn"
                onClick={(e) => cancelOffer(e, item)}
              >
                {t("CANCEL_OFFER")}
              </a>
            </div>
          )}
        </div>

        <Accordion defaultActiveKey="0" className="moreinfo-accordian">
          <Accordion.Item eventKey="detail">
            <Accordion.Header>
              <strong className="view_detail_link">{t("VIEW_DETAILS")}</strong>
            </Accordion.Header>
            <Accordion.Body>
              <div className="buyer_detail_contant">
                {roomDetails.buyer._id === userId ? (
                  <ul>
                    <li>
                      <span>{t("OFFER_PRICE")}:</span>
                      <strong>{item?.item?.price.toFixed(2)} SR</strong>
                    </li>
                    {item?.item?.shipping && (
                      <li>
                        <span>{t("SHIPPING_FEE")}</span>
                        <strong>
                          {item?.item?.buyer_shipping_fee.toFixed(2)} SR
                        </strong>
                      </li>
                    )}
                    <li>
                      <span>{t("PROCESSING_FEE")}</span>
                      <strong>
                        {item?.item?.Processing_fee.toFixed(2)} SR
                      </strong>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <span>{t("OFFER_PRICE")}:</span>
                      <strong>{item?.item?.price.toFixed(2)} SR</strong>
                    </li>
                    {item?.item?.shipping && (
                      <li>
                        <span>{t("SHIPPING_FEE")}(-):</span>
                        <strong>
                          {item?.item?.seller_shipping_fee.toFixed(2)} SR
                        </strong>
                      </li>
                    )}
                    <li>
                      <span>{t("SERVICE_FEE")}(-):</span>
                      <strong>{item?.item?.serviceFees.toFixed(2)} SR</strong>
                    </li>
                  </ul>
                )}
              </div>
              {roomDetails.buyer._id === userId ? (
                <div className="buyer-detail-footer">
                  <strong>{t("TOTAL_AMOUNT")}</strong>
                  <span className="pricebld">
                    {item?.item?.total.toFixed(2)} SR
                  </span>
                </div>
              ) : (
                <div className="buyer-detail-footer">
                  <strong>{t("TOTAL_PAYOUT")}</strong>
                  <span className="pricebld">
                    {item?.item?.sellerPayout.toFixed(2)} SR
                  </span>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      {show && (
        <CounterOffer
          userId={userId}
          roomId={roomId}
          item={item}
          open={show}
          setOpen={setShow}
          roomDetails={roomDetails}
        />
      )}

      {acceptShow && (
        <AcceptOfferModal
          userId={userId}
          roomId={roomId}
          item={item}
          amount={item?.item?.price}
          offerType={item?.item?.meetUp ? "meetUp" : "shipping"}
          open={acceptShow}
          onClose={() => closeAcceptOffer()}
          confirmOffer={(paymentType) => confirmedOffer(paymentType)}
        />
      )}
    </Fragment>
  );
};

export default OfferMessage;
