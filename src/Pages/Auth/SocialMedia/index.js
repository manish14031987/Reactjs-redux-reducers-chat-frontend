import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../actions/userActions";
import { useHistory } from "react-router-dom";
import "./LoginSign.css";
import { useTranslation } from "react-i18next";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import config from "../../../config";
const SocialLogin = (props) => {
  const { actions, isToken } = props;
  const { t } = useTranslation();
  const { push } = useHistory();
  const responseFacebook = (response) => {
    const data = response;
    if (response.name) {
      var name = data.name.split(" ");
      let params = {};
      params.device_type = "web";
      params.device_token = isToken;
      params.first_name = name[0];
      params.last_name = name[1];
      params.email = data.email;
      params.social_id = data.id;
      params.social_type = "Facebook";
      params.role_id = 3;
      actions.userSocialLoginData(params, push);
    }
  };
  const responseGoogle = (response) => {
    if (response.error !== "idpiframe_initialization_failed") {
      if (response.error) {
        alert(response.error);
      }
      const data = response.profileObj;
      if (data) {
        var name = data.name.split(" ");
        let params = {};
        params.device_type = "web";
        params.device_token = isToken;
        params.first_name = name[0];
        params.last_name = name[1];
        params.email = data.email;
        params.social_id = data.googleId;
        params.social_type = "gmail";
        params.role_id = 3;
        actions.userSocialLoginData(params, push);
      }
    }
  };

  return (
    <>
      <FacebookLogin
        appId={config.FACEBOOK_CLIENT_ID}
        textButton={t("FACEBOOK_LOGIN")}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="fb"
        icon="fab fa-facebook-f mr-3"
      />
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText={t("GOOGLE_LOGIN")}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        className="Gplus"
      />
      {/* <TwitterLogin
        authCallback={authHandler}
        consumerKey={config.TWITTER_CONSUMER_KEY}
        consumerSecret={config.TWITTER_SECRET_KEY}
        callback={responseTwitter}
        className="tw"
        children={
          <button>
            <i className="fa fa-twitter" aria-hidden="true"></i> Via Twitter
          </button>
        }
      /> */}
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(userActions), dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SocialLogin);
