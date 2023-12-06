import React, { Fragment } from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Cash, card } from "../../assets/images/index";

const ExpiredMessage = (props) => {
  const { item, roomDetails, userId } = props;
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="buyer-cardinfo buyer-detail-card mobile-chat-buyer">
        <div className=" buyer-card-list">
          <figure className="buyer-thumb-outer">
            <span className="img-thumb img-md-thumbnail">
              <img src={item?.item?.image} alt="postImage" />
            </span>
            <figcaption>
              <h5>
                {item?.buyer_status === "EXPIRED" && (
                  <span>{t("EXPIRED")}&nbsp;</span>
                )}
                {item?.buyer_status === "SYSTEM_EXPIRED" && (
                  <span>{t("SYSTEM_EXPIRED")}&nbsp;</span>
                )}
                {item?.item?.meetUp && <span>{t("MEET_UP")}</span>}
                {item?.item?.shipping && <span>{t("SHIPPING")}</span>}
              </h5>
              <strong>
                {t("OFFER_FOR")} {item?.item?.price} SR
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
                        <span>{t("SHIPPING_FEE")}(-)</span>
                        <strong>
                          {item?.item?.seller_shipping_fee.toFixed(2)} SR
                        </strong>
                      </li>
                    )}
                    <li>
                      <span>{t("SERVICE_FEE")}(-)</span>
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
      </div>{" "}
    </Fragment>
  );
};

export default ExpiredMessage;
