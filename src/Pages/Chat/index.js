import React, { Fragment, lazy, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, FormControl } from "react-bootstrap";
import CancelIcon from "@mui/icons-material/Cancel";
import { Search, chatDefault } from "../../assets/images/index";
import { IconButton } from "@mui/material";
const ChatUser = lazy(() => import("./user"));
const ChatMessage = lazy(() => import("./message"));
const ChatLoaderMessage = lazy(() => import("./messageLoader"));

const Index = () => {
  const { t } = useTranslation();
  let { roomId } = useParams();
  const { USER_INFO } = useSelector((state) => ({
    USER_INFO: state.userInfo,
  }));

  const [getSearchClick, setSearchClick] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSearchClick = () => {
    setSearchClick(true);
  };
  const handleCloseSearch = () => {
    setSearchClick(false);
    setTargetClick("");
  };
  const [getTargetClick, setTargetClick] = useState("");

  const handleSearchKeyUP = (e) => {
    setTargetClick(e.target.value);
  };
  return (
    <Fragment>
      <section className="member_chat_section">
        <Container>
          <div className="chat-buyer-section chat-all-cs">
            <div className="chatleftside border-right">
              {getSearchClick ? (
                <div className="chatleftside-head search-box">
                  <FormControl
                    placeholder={t("SEARCH_PLACEHOLDER")}
                    name="setKeyword"
                    onKeyUp={handleSearchKeyUP}
                  />

                  <span className="search-chat-crose-icon">
                    <IconButton onClick={handleCloseSearch}>
                      <CancelIcon style={{ color: "#46BADF" }} />
                    </IconButton>
                  </span>
                </div>
              ) : (
                <div className="chatleftside-head">
                  <h4>{t("MEMBERS")}</h4>
                  <button
                    className="btn btn_search"
                    onClick={handleSearchClick}
                  >
                    <img src={Search} alt="search" />
                  </button>
                </div>
              )}

              <div className="search-box d-none">
                <div className="input-wrapper">
                  <input placeholder="Search here" type="text" />
                </div>
              </div>
              <div className="chat-user-leftbar chat-box-left-cs">
                <ChatUser
                  userId={USER_INFO._id}
                  roomId={roomId}
                  searchKeyword={getTargetClick}
                  setShowMessage={setShowMessage}
                />
              </div>
            </div>
            <div className="chat-buyer-right chat-box-right-cs ">
              {showMessage && roomId ? (
                <ChatMessage userId={USER_INFO._id} roomId={roomId} />
              ) : roomId ? (
                <ChatLoaderMessage />
              ) : (
                <div className="chat-image">
                  <img
                    src={chatDefault}
                    className="default-chat-cs"
                    alt="chat-default"
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Index;
