import React, { Fragment, useState, useEffect, lazy } from "react";
import { useHistory } from "react-router-dom";
import { sendMessage } from "../../utils/Socket";
import {
  messageListing,
  joinRoom,
  subscribeToMessageListing,
  subscribeToMessageDetails,
  subscribeToRoomDetails,
} from "../../utils/Socket";
import { arrowToggle, sendImage } from "../../assets/images/index";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { useTranslation } from "react-i18next";
const OfferMessage = lazy(() => import("./offerMessage"));
const ExpiredMessage = lazy(() => import("./expiredMessage"));
const AcceptMessage = lazy(() => import("./acceptMessage"));
const OrderModel = lazy(() => import("./orderModel"));
const MeetupModel = lazy(() => import("./meetupModel"));
const MeetUpLocationModal = lazy(() => import("./MeetUpLocationModal"));
const ConfirmLocation = lazy(() => import("./confirmLocation"));
const ReviewModel = lazy(() => import("./reviewModel"));
const PayHere = lazy(() => import("./payhere"));
const ShippingLabel = lazy(() => import("./shippingLabel"));
const SchedulePickup = lazy(() => import("./schedulePickup"));
const TrackOrder = lazy(() => import("./trackOrder"));
const ConfirmOrder = lazy(() => import("./confirmOrder"));
const ReturnItem = lazy(() => import("./returnItem"));
//const PrintLabelBuyer = lazy(() => import("./printLabelBuyer"));
const ReturnReceived = lazy(() => import("./returnReceived"));
const ServiceThankYou = lazy(() => import("./serviceThankYou"));

const MessageListing = (props) => {
  const { userId, roomId } = props;

  const history = useHistory();
  const [message, setMessage] = useState("");
  const [roomDetails, setRoomDetails] = useState({});
  const [chatMessage, setMessageList] = useState([]);
  const { t } = useTranslation();
  const { USER_INFO } = useSelector((state) => ({
    USER_INFO: state.userInfo,
  }));

  const healedSendMessageClick = (event) => {
    event.preventDefault();
    if (message) {
      var request = {
        user_id: userId,
        room_id: roomId,
        message: message,
      };
      sendMessage(request);
      setMessage("");
    }
  };

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
      messageListing(roomId, userId);
    }
    subscribeToMessageListing((err, data) => {
      if (err) return;
      console.log("data ==>", data);
      setMessageList(data);
    });

    subscribeToRoomDetails((err, data) => {
      if (err) return;
      setRoomDetails(data);
      console.log("roomDetails ==>", data);
    });
  }, [roomId, userId]);

  useEffect(() => {
    subscribeToMessageDetails((err, data) => {
      if (err) return;
      setMessageList((oldChats) => [...oldChats, data]);
    });
  }, []);

  const buyerSidebar = () => {
    document.getElementById("onscroll").classList.toggle("buyer_sidebar");
  };

  const handleProductDetails = (e) => {
    e.preventDefault();
    history.push(`/product/${roomDetails?.item?._id}`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    history.push(`/product-review/${roomDetails?.item?._id}`);
  };

  const handleOffer = (e) => {
    e.preventDefault();
    history.push(`/makeOffer/${roomDetails?.item?._id}/${roomDetails?.room}`);
  };

  const getMessageListing = (roomId, userId) => {
    messageListing(roomId, userId);
  };

  return (
    <Fragment>
      {roomDetails.room && (
        <Fragment>
          <div className="settings-tray">
            <button className="button-right" onClick={buyerSidebar}>
              <img src={arrowToggle} alt="arrowToggle" />
            </button>
            {roomDetails?.seller?._id === USER_INFO._id ? (
              <figure>
                <span className="img_circle">
                  <img src={roomDetails?.buyer?.image} alt="userImage" />
                </span>
                <figcaption>
                  <h5>{`${roomDetails?.buyer?.first_name} ${roomDetails?.buyer?.last_name}`}</h5>
                  <div className="user_rating">
                    <Rating
                      name="read-only"
                      value={roomDetails?.buyer?.rating}
                      readOnly
                    />
                    <small>({roomDetails?.buyer?.totalRating})</small>
                  </div>
                </figcaption>
              </figure>
            ) : (
              <figure>
                <span className="img_circle">
                  <img src={roomDetails?.seller?.image} alt="userImage" />
                </span>
                <figcaption>
                  <h5>{`${roomDetails?.seller?.first_name} ${roomDetails?.seller?.last_name}`}</h5>
                  <div className="user_rating">
                    <Rating
                      name="read-only"
                      value={roomDetails?.seller?.rating}
                      readOnly
                    />
                    <small className="rating-count">
                      ({roomDetails?.seller?.totalRating})
                    </small>
                  </div>
                </figcaption>
              </figure>
            )}
          </div>

          <div className="buyer-service">
            <figure className="buyer-thumb-outer">
              <span className="img-thumb">
                <img src={roomDetails?.item?.image} alt="itemImage" />
              </span>
              <figcaption>
                <h5>
                  <a href="#!" onClick={handleProductDetails}>
                    {roomDetails?.item?.title}
                  </a>
                </h5>
                <small>{roomDetails?.item?.item_price.toFixed(2)} SR</small>
              </figcaption>
            </figure>
            {USER_INFO._id === roomDetails.buyer._id && (
              <div className="right_btn_service">
                {roomDetails?.item?.shipping &&
                  roomDetails?.buyNow &&
                  roomDetails?.offerCount === 0 && (
                    <a
                      href="#!"
                      className="btn btn-warning text-white"
                      onClick={handleBuyNow}
                    >
                      {t("BUY_NOW")}
                    </a>
                  )}

                {roomDetails?.offerCount === 0 && (
                  <a
                    href="#!"
                    className="bg-transparent text-dark border-dark btn btn-primary"
                    onClick={handleOffer}
                  >
                    {t("OFFER")}
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="chat-panel chat-byer-panel chat-message_list">
            <div className="chating_list">
              <ScrollToBottom
                className="ChatContent"
                followButtonClassName="followbtn"
                scrollViewClassName="chat-outerbx"
              >
                <ul>
                  {chatMessage.map((item, i) => (
                    <div key={i}>
                      {!item.isCard && item.receiver === userId && (
                        <li className="revived-msg" key={i}>
                          <span className="user-circle">
                            <img
                              src={
                                item.sender === roomDetails?.seller._id
                                  ? roomDetails?.seller?.image
                                  : roomDetails?.buyer?.image
                              }
                              alt="sellerImage"
                            />
                          </span>
                          <div className="chat-messagets">
                            <p>{item.message}</p>
                            <span className="date-fix">
                              {item.date} {item.time}
                            </span>
                          </div>
                        </li>
                      )}
                      {!item.isCard && item.sender === userId && (
                        <li className="sender-msg" key={i}>
                          <span className="user-circle">
                            <img
                              src={
                                item.sender === roomDetails?.seller._id
                                  ? roomDetails?.seller?.image
                                  : roomDetails?.buyer?.image
                              }
                              alt="sellerImage"
                            />
                          </span>
                          <div className="chat-messagets">
                            <p>{item.message}</p>
                            <span className="date-fix">
                              {item.date} {item.time}
                            </span>
                          </div>
                        </li>
                      )}
                      {item.isCard &&
                        item.type === "BOTH" &&
                        (item.buyer_status === "RECEIVED_OFFER" ||
                          item.seller_status === "SEND_OFFER") && (
                          <li id={item._id} key={item._id}>
                            <OfferMessage
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              roomDetails={roomDetails}
                            />
                          </li>
                        )}
                      {item.isCard &&
                        item.type === "BOTH" &&
                        (item.buyer_status === "SEND_OFFER" ||
                          item.seller_status === "RECEIVED_OFFER") && (
                          <li id={item._id} key={item._id}>
                            <OfferMessage
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              roomDetails={roomDetails}
                            />
                          </li>
                        )}
                      {item.isCard &&
                        item.type === "BOTH" &&
                        item.buyer_status === "ACCEPTED" &&
                        item.seller_status === "ACCEPTED" && (
                          <li className="accepted-chat-cs">
                            <AcceptMessage
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              roomDetails={roomDetails}
                            />
                          </li>
                        )}
                      {item.isCard &&
                        item.buyer_status === "SYSTEM_CARD" &&
                        item.seller_status === "SYSTEM_CARD" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <OrderModel
                              item={item}
                              userId={userId}
                              roomId={roomId}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.buyer_status === "CONFIRM_MEET_UP_LOCATION" &&
                        item.seller_status === "CONFIRM_MEET_UP_LOCATION" &&
                        item.sender === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <MeetUpLocationModal
                              item={item}
                              userId={userId}
                              roomId={roomId}
                            />
                          </li>
                        )}
                      {item.isCard &&
                        item.buyer_status === "CONFIRM_MEET_UP_LOCATION" &&
                        item.seller_status === "CONFIRM_MEET_UP_LOCATION" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <MeetUpLocationModal
                              item={item}
                              userId={userId}
                              roomId={roomId}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.buyer_status === "CONFIRM_LOCATION" &&
                        item.seller_status === "CONFIRM_LOCATION" && (
                          <li className="accepted-chat-cs">
                            <ConfirmLocation
                              item={item}
                              userId={userId}
                              roomId={roomId}
                            />
                          </li>
                        )}
                      {item.isCard &&
                        item.buyer_status === "SET_MEET_UP_LOCATION" &&
                        item.seller_status === "SET_MEET_UP_LOCATION" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <MeetupModel
                              item={item}
                              userId={userId}
                              roomId={roomId}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.receiver === USER_INFO._id &&
                        item.seller_status === "REVIEW" &&
                        item.seller_status === "REVIEW" && (
                          <li className="accepted-chat-cs">
                            <ReviewModel
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              sellerID={item.sender}
                              getMessageListing={getMessageListing}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "BUYER" &&
                        item.buyer_status === "PAY_HERE" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <PayHere
                              item={item}
                              userId={userId}
                              roomId={roomId}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "SELLER" &&
                        item.seller_status === "PRINT_LABEL" &&
                        item.buyer_status === "PRINT_LABEL" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <ShippingLabel
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              type={item.type}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "SELLER" &&
                        item.seller_status === "PICK_UP" &&
                        item.buyer_status === "PICK_UP" &&
                        item.sender === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <SchedulePickup
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              type={item.type}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "SELLER" &&
                        item.seller_status === "PICK_UP_DONE" &&
                        item.buyer_status === "PICK_UP_DONE" && (
                          <li className="accepted-chat-cs">
                            <TrackOrder
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              currentUser={USER_INFO._id}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "BUYER" &&
                        item.seller_status === "CONFIRM_ITEM" &&
                        item.buyer_status === "CONFIRM_ITEM" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <ConfirmOrder
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              currentUser={USER_INFO._id}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "SELLER" &&
                        item.seller_status === "RETURN_REQUEST" &&
                        item.buyer_status === "RETURN_REQUEST" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <ReturnItem
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              currentUser={USER_INFO._id}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "BUYER" &&
                        item.seller_status === "PRINT_LABEL_BUYER" &&
                        item.buyer_status === "PRINT_LABEL_BUYER" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <ShippingLabel
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              currentUser={USER_INFO._id}
                              type={item.type}
                            />
                          </li>
                        )}
                      {item.isCard &&
                        item.type === "BUYER" &&
                        item.seller_status === "PICK_UP_BUYER" &&
                        item.buyer_status === "PICK_UP_BUYER" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <SchedulePickup
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              type={item.type}
                            />
                          </li>
                        )}
                      {item.isCard &&
                        item.type === "SELLER" &&
                        item.seller_status === "RETURN_ITEM_RECEIVED_SELLER" &&
                        item.buyer_status === "RETURN_ITEM_RECEIVED_SELLER" &&
                        item.receiver === USER_INFO._id && (
                          <li className="accepted-chat-cs">
                            <ReturnReceived
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              type={item.type}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.type === "BOTH" &&
                        item.seller_status === "SYSTEM_CARD" &&
                        item.buyer_status === "SYSTEM_CARD" && (
                          <li className="accepted-chat-cs">
                            <ServiceThankYou
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              type={item.type}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.buyer_status === "EXPIRED" &&
                        item.seller_status === "EXPIRED" && (
                          <li>
                            <ExpiredMessage
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              roomDetails={roomDetails}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.buyer_status === "SYSTEM_EXPIRED" &&
                        item.seller_status === "SYSTEM_EXPIRED" && (
                          <li>
                            <ExpiredMessage
                              item={item}
                              userId={userId}
                              roomId={roomId}
                              roomDetails={roomDetails}
                            />
                          </li>
                        )}

                      {item.isCard &&
                        item.seller_status === "SHOW_PAY_HERE_BUYER" &&
                        item.buyer_status === "SHOW_PAY_HERE_BUYER" &&
                        item.receiver === USER_INFO._id && (
                          <li>
                            <div className="buyer-cardinfo buyer-detail-card">
                              <div className=" buyer-card-list">
                                <figure className="buyer-thumb-outer">
                                  <h5>
                                    <span className="offer-accepted-cs">
                                      {t("payment_complete")}
                                    </span>
                                  </h5>
                                </figure>
                              </div>
                            </div>
                          </li>
                        )}

                      {item.isCard &&
                        item.seller_status === "SHOW_PAY_HERE_SELLER" &&
                        item.buyer_status === "SHOW_PAY_HERE_SELLER" &&
                        item.receiver === USER_INFO._id && (
                          <li>
                            <div className="buyer-cardinfo buyer-detail-card">
                              <div className=" buyer-card-list">
                                <figure className="buyer-thumb-outer">
                                  <h5>
                                    <span className="offer-accepted-cs">
                                      {t("amount_add")}
                                    </span>
                                  </h5>
                                </figure>
                              </div>
                            </div>
                          </li>
                        )}
                    </div>
                  ))}
                </ul>
              </ScrollToBottom>
            </div>

            <div className="panel_bottom">
              <div className="type-tool">
                <input
                  type="text"
                  placeholder="Type your message here..."
                  value={message}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="btn"
                  onClick={(e) => healedSendMessageClick(e)}
                >
                  <img src={sendImage} alt="sendImage" />
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MessageListing;
