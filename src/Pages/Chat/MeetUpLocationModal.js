import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import { Row, Col } from "react-bootstrap";
import { Button, Table } from "react-bootstrap";
import SheduleMeetup from "../Home/SheduleMeetup";
import { useDispatch } from "react-redux";
import { acceptMeetLocationRequest, messageListing } from "../../utils/Socket";

import toggleNetworkRequestStatus from "../../actions/toggleNetworkRequestStatus";

const MeetUpLocationModal = (props) => {
  const { item, roomId, userId } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  var language = localStorage.getItem("i18nextLng");

  const [showSheduleMeetupModal, setShowSheduleMeetupModal] = useState(false);
  const toggleSheduleMeetupModal = () => {
    setShowSheduleMeetupModal(!showSheduleMeetupModal);
  };
  const handleAcceptClick = (e) => {
    e.preventDefault();
    var request = {};
    request.room_id = roomId;
    request.user_id = userId;
    request.language = language;
    acceptMeetLocationRequest(request);
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
        <div>
          <figure className="buyer-thumb-outer">
            <figcaption className="accepted-offer-main-div-cs">
              <h5>
                <span className="offer-accepted-cs">
                  {t("MEET_UP_LOCATION")}
                </span>
              </h5>
              <span className="">{t("MEET_UP_LOCATION_CONFIRMED")} </span>
              <Table>
                <thead>
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
                </thead>
              </Table>
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

              {item.receiver === userId && (
                <Row className="button-cs-row">
                  <Col md={6}>
                    <Button
                      className="theme_btn reschedule-button-cs"
                      onClick={() => toggleSheduleMeetupModal()}
                    >
                      {t("RESCHEDULE_MEET_UP")}
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      className="theme_btn accept-button-cs"
                      onClick={handleAcceptClick}
                    >
                      {t("ACCEPT")}
                    </Button>
                  </Col>
                </Row>
              )}

              <p>{t("MEET_UP_LOCATION_TAGLINE")}</p>
            </figcaption>
          </figure>
        </div>
      </div>
      {showSheduleMeetupModal && (
        <SheduleMeetup
          item={item}
          roomId={roomId}
          show={showSheduleMeetupModal}
          onHide={() => toggleSheduleMeetupModal()}
          onLoadMessage={() => toggleLoadMessage()}
        />
      )}
    </Fragment>
  );
};

export default MeetUpLocationModal;
