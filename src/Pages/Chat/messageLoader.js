import React, { Fragment } from "react";
import { arrowToggle } from "../../assets/images/index";
import Skeleton from "@mui/material/Skeleton";

const MessageListing = (props) => {
  return (
    <Fragment>
      <div className="settings-tray">
        <button className="button-right">
          <img src={arrowToggle} alt="arrowToggle" />
        </button>
        <figure>
          <span className="img_circle">
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          </span>
          <figcaption>
            <Skeleton animation="wave" width={100} height={10} />
            <Skeleton animation="wave" width={300} height={10} />
            <Skeleton animation="wave" width={50} height={10} />
          </figcaption>
        </figure>
      </div>
      <div className="buyer-service">
        <figure className="buyer-thumb-outer">
          <span className="img-thumb">
            <Skeleton variant="rectangular" width={50} height={50} />
          </span>
          <figcaption>
            <Skeleton animation="wave" width={100} height={10} />
            <Skeleton animation="wave" width={300} height={10} />
            <Skeleton animation="wave" width={50} height={10} />
          </figcaption>
        </figure>
      </div>
      <div className="chat-panel chat-byer-panel chat-message_list">
        <div className="chating_list">
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton />
          <Skeleton width="60%" />
          <Skeleton />
          <Skeleton width="60%" />
        </div>
      </div>
    </Fragment>
  );
};

export default MessageListing;
