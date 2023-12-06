import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import { Row, Col } from "react-bootstrap";

import { Link, useHistory, useLocation } from "react-router-dom";
const MeetUpLocationModal = (props) => {
  const { item, roomId } = props;
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="buyer-cardinfo buyer-detail-card">
        <div>
          <figure className="buyer-thumb-outer">
            <figcaption className="accepted-offer-main-div-cs">
              <h5>
                <span className="offer-accepted-cs">
                  {t("MEET_UP_LOCATION")}
                </span>
              </h5>
              <span className="">{t("MEET_UP_LOCATION_CONFIRMED")} </span>
              <table>
                <tr>
                  <td>{t("LOCATION_NAME")} </td>
                  <td>
                    <b>{item.item.meetUpRequest.location_name}</b>
                  </td>
                </tr>
                <tr>
                  <td>{t("DATE")}</td>
                  <td>
                    <b>{item.item.meetUpRequest.date}</b>
                  </td>
                </tr>
                <tr>
                  <td>{t("TIME")}</td>
                  <td>
                    <b>{item.item.meetUpRequest.time}</b>
                  </td>
                </tr>
                <tr>
                  <td>{t("Landmark")} </td>
                  <td>
                    <b>{item.item.meetUpRequest.landmark}</b>
                  </td>
                </tr>
              </table>
              <p>
                <StaticGoogleMap
                  size="600x300"
                  className="img-fluid"
                  apiKey="AIzaSyAv6leIF_HsmoOdtnDjQBIDIriyHhcA82U"
                >
                  <Marker
                    location={`${item.item.meetUpRequest.lat},${item.item.meetUpRequest.log}`}
                    color="blue"
                  />
                </StaticGoogleMap>
              </p>
              <Row className="button-cs-row">
                <Col md={12}>
                  <a
                    href={`https://maps.google.com?q=${item.item.meetUpRequest.lat},${item.item.meetUpRequest.log}`}
                    className="theme_btn get-direction-cs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("GET_DIRECTION")}
                  </a>
                </Col>
              </Row>
              <p>{t("MEET_UP_LOCATION_TAGLINE")}</p>
            </figcaption>
          </figure>
        </div>
      </div>{" "}
    </Fragment>
  );
};

export default MeetUpLocationModal;
