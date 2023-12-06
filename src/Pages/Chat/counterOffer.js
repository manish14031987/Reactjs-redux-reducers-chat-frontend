import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useHistory } from "react-router-dom";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@mui/icons-material/Edit";
import {
  checkCounterReview,
  checkOfferReview,
  sendOffer,
} from "../../actions/homePageActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Accordion, Row, Col } from "react-bootstrap";
import { checkMobileNumber, formLabelsTheme } from "../../utils/helpers";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { sendCounterOffer } from "../../utils/Socket";
import CardModel from "./cardModel";
import { loadToasterData } from "../../actions/baseActions";
import { authorizePaymentDetails } from "../../actions/HomeAction";
import { TextFormate } from "../../Component/TextFormate/TexFormate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import toggleNetworkRequestStatus from "../../actions/toggleNetworkRequestStatus";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0f4f7c",
    },
    "& .Mui-focused": {
      color: "#0f4f7c",
    },
  },
});

const CounterOffer = (props) => {
  const {
    userId,
    item,
    open,
    setOpen,
    roomId,
    postId,
    roomDetails,
    authorizeType,
  } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const classes = useStyles();
  const { t } = useTranslation();
  const [type, setType] = useState("OFFER");
  const [paymentType, setPaymentType] = useState("CASH");
  const [showPaymentOption, setPaymentOption] = useState(false);
  const [offerReview, setOfferReview] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const { selectedLang, userInfo } = useSelector((state) => ({
    selectedLang: state.selectedLang,
    userInfo: state.userInfo,
  }));

  console.log("OFFERREVIEW", offerReview);
  console.log("postId", postId);
  console.log("ITEM", item);
  console.log("roomDetails", roomDetails);
  console.log("userId", userId);
  console.log("userInfo", userInfo);
  useEffect(() => {
    if (roomDetails && !roomDetails.item.payment_type) {
      setPaymentOption(true);
    }
    if (roomDetails && roomDetails.item.payment_type) {
      setPaymentType(roomDetails.item.payment_type);
    }
  }, [roomDetails]);

  let history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    var request = {};
    request.room = roomId;
    request.room_id = roomId;
    if (postId) {
      request.post_id = postId;
    } else {
      request.post_id = item?.item?._id;
    }
    request.amount = data.price;
    request.shipping = item?.item?.shipping;
    request.meetUp = item?.item?.meetUp;
    if (item?.paymentType) {
      dispatch(checkCounterReview(request));
    } else {
      request.paymentType = paymentType;
      dispatch(checkOfferReview(request, showPayment));
    }
  };

  const showPayment = (data) => {
    setType("OFFER-REVIEW");
    setOfferReview(data);
  };

  const handleChange = (event) => {
    setPaymentType(event.target.value);
    var request = {};
    request.room = roomId;
    request.room_id = roomId;
    request.post_id = item?.item?._id;
    request.amount = offerReview?.item.price;
    request.shipping = item?.item?.shipping;
    request.meetUp = item?.item?.meetUp;
    if (item?.paymentType) {
      dispatch(checkCounterReview(request));
    } else {
      request.paymentType = event.target.value;
      dispatch(checkOfferReview(request, showPayment));
    }
  };

  const handlePageClick = (event, slug) => {
    event.preventDefault();
    history.push(`/${selectedLang}/${slug}`);
  };

  const [showCardModel, setShowCardModel] = useState(false);
  const handleCardModel = () => {
    setShowCardModel(true);
  };
  const handleConfirmOfferClick = () => {
    var walletBalanceStatus = "";
    if (offerReview.walletAmount <= 0) {
      walletBalanceStatus = false;
    } else {
      walletBalanceStatus = true;
    }
    var totalAmount = offerReview?.item?.total;

    if (
      item.buyer_status === "RECEIVED_OFFER" &&
      item.seller_status === "SEND_OFFER"
    ) {
      if (totalAmount <= offerReview.walletAmount) {
        const request = {
          user_id: userId,
          room_id: roomId,
          post_id: offerReview?.item?._id,
          amount: totalAmount,
          paymentType: paymentType,
          paymentId: "",
          cardId: "",
          language: selectedLang,
          useWallet: walletBalanceStatus,
        };

        dispatch(sendCounterOffer(request));
      } else {
        if (!showCardData) {
          dispatch(loadToasterData(t("PLEASE_SELECT_CARD"), "error", true));
        } else {
          var amountAfterWallet = totalAmount - offerReview.walletAmount;
          const payObject = {
            amount: amountAfterWallet,
            user_id: userId,
            room_id: roomId,
            post_id: offerReview?.item?._id,
            payment_type: paymentType,
            card_id: showCardData._id,
            authorize_type: authorizeType ? authorizeType : "Counter",
            useWallet: walletBalanceStatus,
          };
          var first_name = userInfo.first_name;
          var lastName = userInfo.last_name;
          var phoneNumber = userInfo.mobile_number;
          var customerEmail = userInfo.email;
          var amount = amountAfterWallet;
          var card_token = showCardData.cardToken;

          const request = {
            first_name,
            lastName,
            phoneNumber,
            customerEmail,
            amount,
            card_token,
          };
          dispatch(authorizePaymentDetails(request, payObject, returnData));
        }
      }
    } else {
      setSubmitting(true);
      const request = {
        user_id: userId,
        room_id: roomId,
        post_id: offerReview?.item?._id,
        amount: offerReview?.item?.total,
        paymentType: paymentType,
        paymentId: "",
        cardId: "",
        language: selectedLang,
      };
      dispatch(toggleNetworkRequestStatus(true));
      sendCounterOffer(request);
      handleClose();
    }
  };

  const updateOffer = (data) => {
    if (data) {
      history.push(`/chat/${data.room}`);
    } else {
      history.push(`/`);
    }
  };
  const returnData = (data) => {
    window.location.href = data;
  };
  const [showCardData, setShowCardData] = useState("");
  const handleCardModelClose = (data) => {
    if (data) {
      setShowCardData(data);
    }
    setShowCardModel(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        fullWidth={true}
        maxWidth={type === "OFFER" ? "xs" : "sm"}
        className="mobile-offer-dialog"
      >
        {type === "OFFER" && (
          <>
            <DialogTitle
              id="alert-dialog-slide-title"
              className="text-white"
              style={{ backgroundColor: "#0b90bb" }}
            >
              {t("OFFER_RECEIVED")} <b>{item?.item?.price.toFixed(2)} SR</b>
            </DialogTitle>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <DialogContent>
                <MuiThemeProvider theme={formLabelsTheme}>
                  <Form.Group controlId="formBasicNumber">
                    <TextField
                      id="outlined-number"
                      required
                      variant="standard"
                      autoFocus={true}
                      label={t("PLEASE_ENTER_PRICE")}
                      className={!errors.price ? classes.root : "w-100"}
                      onKeyDown={(event) => checkMobileNumber(event)}
                      fullWidth
                      name="price"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">SR</InputAdornment>
                        ),
                      }}
                      {...register("price", {
                        required: t("PLEASE_ENTER_PRICE"),
                        minLength: {
                          value: 1,
                          message: t("PRICE_NUMBER_MINIUM_LENGTH"),
                        },
                        maxLength: {
                          value: 10,
                          message: t("PRICE_NUMBER_MAXIMUM_LENGTH"),
                        },
                      })}
                      helperText={errors.price && errors.price.message}
                    />
                  </Form.Group>

                  <span className="hint-status pt-1 d-block pt-2">
                    {t("OFFER_VALID")}
                  </span>
                </MuiThemeProvider>
                <div className="mb-3 mt-5">
                  <Button
                    variant="contained"
                    type="submit"
                    className="theme_btn"
                    style={{
                      borderRadius: "50px",
                      width: "100%",
                      backgroundColor: "#33a7cc",
                      boxShadow: "none",
                    }}
                  >
                    {t("NEXT")}
                  </Button>
                </div>
              </DialogContent>
            </Form>
          </>
        )}
        {type === "OFFER-REVIEW" && (
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
                  <Accordion
                    defaultActiveKey="0"
                    className="moreinfo-accordian"
                  >
                    <Accordion.Item eventKey="0">
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
              <br />
              {(item.buyer_status === "RECEIVED_OFFER" ||
                item.seller_status === "SEND_OFFER") && (
                <Row className="review-offer-address">
                  <Col sm={12}>
                    <div className="order_detail_box">
                      <div className="order_detail_head">
                        <h4>
                          {" "}
                          <strong>{t("PAYMENT_METHOD")}</strong>
                        </h4>
                        <Button
                          className="theme_btn edit-address"
                          onClick={handleCardModel}
                        >
                          <EditIcon />
                          <span>{t("EDIT")}</span>
                        </Button>
                      </div>

                      <div className="order_caption">
                        {showCardData ? (
                          showCardData.maskedCardNo
                        ) : (
                          <h6>{t("NO_CARD_SELECTED")}</h6>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
              <br />
              {showPaymentOption && roomDetails.buyer._id === userInfo._id && (
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
              )}
              {roomDetails && roomDetails.buyer._id === userId ? (
                <ul className="list-unstyled mb-3 review-ul buyer-cardinfo">
                  <li>{t("ORDER_SUMMARY")}</li>
                  <li>
                    {t("ITEM_PRICE_REVIEW")}:{" "}
                    <strong>
                      {TextFormate(offerReview?.item?.price, 2)} {t("SR")}
                    </strong>
                  </li>
                  <li>
                    {t("PROCESSING_FEES")}:{" "}
                    <strong>
                      {TextFormate(offerReview?.item?.Processing_fee, 2)}{" "}
                      {t("SR")}
                    </strong>
                  </li>
                  <li>
                    {t("FINAL_PRICE")}:{" "}
                    <strong>
                      {TextFormate(offerReview?.item?.total, 2)} {t("SR")}
                    </strong>
                  </li>
                  <br />
                  <strong>
                    <span className="check-svg-cs">
                      <CheckCircleIcon />
                    </span>
                    {t("USE_WALLET")}{" "}
                  </strong>

                  <li>
                    <strong>{t("WALLET_BALANCE")}</strong>
                    <strong>
                      {TextFormate(offerReview?.walletAmount, 2)}
                      {t("SR")}{" "}
                    </strong>
                  </li>
                </ul>
              ) : (
                <ul className="list-unstyled mb-3 review-ul buyer-cardinfo">
                  <li>{t("ORDER_SUMMARY")}</li>
                  <li>
                    {t("ITEM_PRICE_REVIEW")}:
                    <strong>
                      {TextFormate(offerReview?.item?.price, 2)} {t("SR")}
                    </strong>
                  </li>
                  <li>
                    {t("SHIPPING_FEE")}(-):
                    <strong>{offerReview?.item?.shipping_fee}</strong>
                  </li>
                  <li>
                    {t("SERVICE_FEE")}(-):
                    <strong>{offerReview?.item?.Processing_fee}</strong>
                  </li>
                  <li>
                    {t("TOTAL_PAYOUT")}:
                    <strong>
                      {TextFormate(offerReview?.item?.total, 2)} {t("SR")}
                    </strong>
                  </li>
                </ul>
              )}

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
                  onClick={handleConfirmOfferClick}
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
                    <>{t("CONFIRM_OFFER")}</>
                  )}
                </Button>
              </div>
            </DialogContent>
          </div>
        )}
      </Dialog>
      {showCardModel && (
        <CardModel
          roomId={roomId}
          show={showCardModel}
          item={item}
          paymentType={paymentType}
          processingFee={offerReview?.item?.Processing_fee}
          selectedAmount={offerReview?.item?.price}
          handleCardModelClose={handleCardModelClose}
        />
      )}
    </Fragment>
  );
};

export default CounterOffer;
