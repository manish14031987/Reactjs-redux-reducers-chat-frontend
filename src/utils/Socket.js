import io from "socket.io-client";
const { REACT_APP_SOCKET } = process.env;
let socket;

export const initiateSocket = (userId) => {
  socket = io(REACT_APP_SOCKET, {
    extraHeaders: {
      userId: userId,
    },
  });
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChatListing = (cb) => {
  socket.on("buyerChatList", (msg) => {
    return cb(null, msg.data ? msg.data : []);
  });
};
export const subscribeToMessageListing = (cb) => {
  socket.on("chat-details", (msg) => {
    return cb(null, msg);
  });
};
export const subscribeToMessageDetails = (cb) => {
  socket.on("messageDetails", (msg) => {
    return cb(null, msg[0]);
  });
};
export const subscribeToRoomDetails = (cb) => {
  socket.on("room-details", (msg) => {
    return cb(null, msg);
  });
};

export const subscribeToError = (cb) => {
  socket.on("error", (msg) => {
    return cb(null, msg);
  });
};

export const subscribeToSuccessfully = (cb) => {
  socket.on("successfully", (msg) => {
    return cb(null, msg);
  });
};

export const sendMessage = (request) => {
  if (socket) socket.emit("send-message", request.room_id, request);
};

export const chatList = (userId) => {
  if (socket) socket.emit("buyer-chat", userId);
};

export const joinRoom = (roomId) => {
  if (socket) socket.emit("join-room", roomId);
};

export const messageListing = (roomId, userId) => {
  if (socket) socket.emit("message-listing", roomId, userId);
};

export const sendCounterOffer = (request) => {
  if (socket) socket.emit("send-counter-offer", request.room_id, request);
};

export const cancelOfferRequest = (request) => {
  if (socket) socket.emit("offer-canceled", request.room_id, request);
};

export const acceptOfferRequest = (request) => {
  if (socket) socket.emit("offer-accept", request.room_id, request);
};

export const acceptMeetLocationRequest = (request) => {
  if (socket) socket.emit("confirm-meet-up", request.room_id, request);
};

export const paymentConfirm = (request) => {
  if (socket) socket.emit("paymentConfirm", request.room_id, request);
};
export const printShippingLabel = (request) => {
  if (socket) socket.emit("create-shipping-label", request.room_id, request);
};

export const pickupSocket = (request) => {
  if (socket) socket.emit("schedule-pick-up", request.room_id, request);
};
export const confirmOrderYes = (request) => {
  if (socket) socket.emit("confirm-order-yes", request.room_id, request);
};
export const requestReject = (request) => {
  if (socket) socket.emit("reject-request", request.room_id, request);
};
export const requestAccept = (request) => {
  if (socket) socket.emit("accept-request", request.room_id, request);
};
export const ShippingLabelBuyer = (request) => {
  if (socket)
    socket.emit("create-shipping-label-buyer", request.room_id, request);
};
export const schedulePickupBuyer = (request) => {
  if (socket) socket.emit("schedule-pick-up-buyer", request.room_id, request);
};
export const returnReceived = (request) => {
  if (socket) socket.emit("return-received", request.room_id, request);
};
