import React, { Fragment } from "react";

const OrderModel = (props) => {
  const { item } = props;

  var language = localStorage.getItem("i18nextLng");
  return (
    <Fragment>
      <div className="buyer-cardinfo buyer-detail-card">
        <div className=" buyer-card-list">
          <figure className="buyer-thumb-outer">
            {language === "ar" ? (
              <figcaption className="accepted-offer-main-div-cs">
                {item.systemMessage_arabic && item.systemMessage_arabic[0] && (
                  <h5>
                    <span className="offer-accepted-cs">
                      {item.systemMessage_arabic[0].message}
                    </span>
                  </h5>
                )}
                {item.systemMessage_arabic && item.systemMessage_arabic[1] && (
                  <span className=""> {item.systemMessage[1].message}</span>
                )}
                {item.systemMessage_arabic && item.systemMessage_arabic[2] && (
                  <span className="">
                    {item.systemMessage_arabic[2].message}
                  </span>
                )}
              </figcaption>
            ) : (
              <figcaption className="accepted-offer-main-div-cs">
                {item.systemMessage && item.systemMessage[0] && (
                  <h5 className="mb-2">
                    <span className="offer-accepted-cs">
                      {item.systemMessage[0].message}
                    </span>
                  </h5>
                )}
                {item.systemMessage && item.systemMessage[1] && (
                  <span className=""> {item.systemMessage[1].message}</span>
                )}
                {item.systemMessage && item.systemMessage[2] && (
                  <span className="d-block">
                    {item.systemMessage[2].message}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </div>
      </div>{" "}
    </Fragment>
  );
};

export default OrderModel;
