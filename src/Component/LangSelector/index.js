import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { English, Arabic } from "../../assets/images/index";
import { setLanguage } from "../../actions/baseActions";

const LangSelector = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { selectedLang } = useSelector((state) => ({
    selectedLang: state.selectedLang,
  }));

  const changeLanguage = (event) => {
    setAnchorEl(null);
    var lng = event;
    i18n.changeLanguage(lng);
    var str = pathname;
    if (str.search("en") === 1) {
      const newUrl = pathname.replace("en", "ar");
      //window.location.href = newUrl;
    } else if (str.search("ar") === 1) {
      const newUrl = pathname.replace("ar", "en");
      //window.location.href = newUrl;
    } else if (str.search("en") === -1) {
      var url = lng + pathname;
      //window.location.href = url;
    }
    // document.documentElement.setAttribute("lang", lng);
    if (lng === "ar") {
      document.getElementsByTagName("HTML")[0].setAttribute("class", "arabic");
    } else {
      document.getElementsByTagName("HTML")[0].setAttribute("class", "english");
    }
    dispatch(setLanguage(lng));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <span onClick={handleClick} className="choose-language">
        {selectedLang === "en" ? (
          <Fragment>
            <img src={English} alt="English" />
            <span>English</span>
          </Fragment>
        ) : (
          <Fragment>
            <img src={Arabic} alt="Arabic" />
            <span>Arabic</span>
          </Fragment>
        )}
        <KeyboardArrowDownIcon />
      </span>
      <Menu
        id="demo-positioned-menu"
        className="language_dropdown"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => changeLanguage("en")}>
          <img src={English} alt="English" />
          &nbsp;English
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("ar")}>
          <img src={Arabic} alt="Arabic" />
          &nbsp;Arabic
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default LangSelector;
