import React, { Fragment, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Accordion } from "react-bootstrap";
import { checkOfferReview } from "../../actions/homePageActions";
import { useDispatch, useSelector } from "react-redux";

const AcceptOfferModal = (props) => {
  const { roomId, item, open, onClose, confirmOffer, amount, offerType } =
    props;
  const [paymentType, setPaymentType] = useState("CASH");
  const [offerReview, setOfferReview] = useState({});
  const { selectedLang } = useSelector((state) => ({
    selectedLang: state.selectedLang,
  }));

  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { t } = useTranslation();

  const confirmedOffer = (e) => {
    e.preventDefault();
    setSubmitting(true);
    confirmOffer(paymentType);
  };

  useEffect(() => {
    var request = {};
    request.room = roomId;
    request.room_id = roomId;
    request.amount = amount;
    request.post_id = item.item._id;
    request.shipping = offerType === "meetUp" ? false : true;
    request.meetUp = offerType === "meetUp" ? true : false;
    request.paymentType = paymentType;
    dispatch(checkOfferReview(request, showPayment));
  }, [dispatch, roomId, offerType, amount, item.item._id]);

  const showPayment = (data) => {
    setOfferReview(data);
  };

  const handleChange = (event) => {
    setPaymentType(event.target.value);
    var request = {};
    request.room = roomId;
    request.room_id = roomId;
    request.amount = amount;
    request.post_id = item.item._id;
    request.shipping = offerType === "meetUp" ? false : true;
    request.meetUp = offerType === "meetUp" ? true : false;
    request.paymentType = event.target.value;
    dispatch(checkOfferReview(request, showPayment));
  };

  const handlePageClick = (event, slug) => {
    event.preventDefault();
    history.push(`/${selectedLang}/${slug}`);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={onClose}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <div className="offer-review-modal">
          <DialogTitle
            id="alert-dialog-slide-title"
            className="text-white"
            style={{ backgroundColor: "#0b90bb" }}
          >
            {t("OFFER_REVIEW")}
          </DialogTitle>
          <DialogContent>
            <div className="offer-review-content mt-3">
              <img src={offerReview?.item?.image} alt="postImage" />
              <div className="fig">
                <b>{offerReview?.item?.title}</b>
                <Accordion defaultActiveKey="0" className="moreinfo-accordian">
                  <Accordion.Item eventKey="detail">
                    <Accordion.Header>
                      <strong className="view_detail_link">
                        {t("VIEW_DETAILS")}
                      </strong>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="buyer_detail_contant">
                        <ul>
                          <li>
                            <span>{t("ITEM_CONDITIONS")}:</span>
                            <strong>{offerReview?.item?.conditions}</strong>
                          </li>
                          <li>
                            <span>{t("CATEGORY")}:</span>
                            <strong>{offerReview?.item?.categories}</strong>
                          </li>
                          <li>
                            <span>{t("DESCRIPTIONS")}:</span>
                            <strong>{offerReview?.item?.description}</strong>
                          </li>
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            <div className="buyer-cardinfo mt-3 mb-2">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  {t("PAYMENT_METHOD")}
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={paymentType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="CASH"
                    control={<Radio />}
                    label={t("CASH")}
                  />
                  <FormControlLabel
                    value="ONLINE"
                    control={<Radio />}
                    label={t("ONLINE_CARD")}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <ul className="list-unstyled mb-3 review-ul buyer-cardinfo">
              <li>{t("ORDER_SUMMARY")}</li>
              <li>
                {t("ITEM_PRICE_REVIEW")}:{" "}
                <strong>{offerReview?.item?.price}</strong>
              </li>
              <li>
                {t("PROCESSING_FEES")}:{" "}
                <strong>{offerReview?.item?.Processing_fee}</strong>
              </li>
              <li>
                {t("FINAL_PRICE")}: <strong>{offerReview?.item?.total}</strong>
              </li>
            </ul>
            <div className="my-3 text-center">
              {t("TO_AGREE")}
              <a
                href="#!"
                onClick={(e) => handlePageClick(e, "privacy-policy")}
              >
                &nbsp;{t("PRIVACY_POLICY")}
              </a>
            </div>
            <div className="mb-3">
              <Button
                variant="contained"
                onClick={confirmedOffer}
                className="theme_btn"
                style={{
                  borderRadius: "50px",
                  width: "100%",
                  backgroundColor: "#33a7cc",
                  boxShadow: "none",
                }}
              >
                {isSubmitting ? (
                  <Fragment>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                  </Fragment>
                ) : (
                  <>{t("ACCEPT_OFFER")}</>
                )}
              </Button>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default AcceptOfferModal;
