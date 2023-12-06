import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { confirmOrderYes } from "../../utils/Socket";
import ReportModel from "../Home/ReportItemModal";

const ConfirmOrder = (props) => {
  const { userId, roomId, item } = props;

  const { t } = useTranslation();

  const { selectedLang } = useSelector((state) => ({
    selectedLang: state.selectedLang,
  }));
  const [getReportModel, setReportModel] = useState(false);
  const reportModelClose = () => {
    setReportModel(false);
  };
  const handleClickReport = () => {
    setReportModel(true);
  };

  const handleClickYes = () => {
    var request = {
      room_id: roomId,
      user_id: userId,
      language: selectedLang,
    };
    confirmOrderYes(request);
    setTimeout(function () {
      window.location.reload();
    }, 100);
  };

  return (
    <Fragment>
      <div
        className="buyer-cardinfo buyer-detail-card mobile-chat-buyer"
        style={{ width: "100%" }}
      >
        <div className=" buyer-card-list ORDER_ARRIVED">
          <figure className="buyer-thumb-outer">
            <span className="img-thumb img-md-thumbnail">
              <img src={item?.item?.image} alt="postImage" />
            </span>
            <figcaption>
              <h5>
                <strong>{t("ORDER_ARRIVED")}</strong>
              </h5>
              <strong>{t("MATCH_ITEM")}</strong>
            </figcaption>
          </figure>

          <div className="buyer_btn">
            <a
              href="#!"
              className="btn counter-btn green-btn"
              onClick={handleClickYes}
            >
              {t("YES")}
            </a>
            <a
              href="#!"
              className="btn counter-btn blur-border-btn report-problem"
              onClick={handleClickReport}
            >
              {t("REPORT_PROBLEM")}
            </a>
          </div>
        </div>
      </div>
      {getReportModel && (
        <ReportModel
          item={item}
          roomId={roomId}
          userId={userId}
          show={getReportModel}
          orderId={item.item.orderId}
          onHide={() => reportModelClose()}
        />
      )}
    </Fragment>
  );
};

export default ConfirmOrder;
