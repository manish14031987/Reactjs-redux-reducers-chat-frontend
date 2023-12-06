import React, { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../Component/Button";
import { crose, leftImg } from "../../../assets/images/index";
import { useTranslation } from "react-i18next";
import SocialMedia from "../SocialMedia";
import {
  loadLoginPop,
  loadRegisterPop,
  loadForgetPop,
  loadDeviceToken,
} from "../../../actions/baseActions";
import { userLoginData } from "../../../actions/userActions";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#33a7cc",
    },
    "& .Mui-focused": {
      color: "#33a7cc",
    },
  },
});
const Login = (props) => {
  const { show } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();

  const { userParams, device_token } = useSelector((state) => ({
    userParams: state.userParams,
    device_token: state.device_token,
  }));

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: userParams,
  });

  const handleClickModel = () => {
    dispatch(loadLoginPop(false));
  };

  const handleShowRegister = (event) => {
    event.preventDefault();
    dispatch(loadRegisterPop(true));
    dispatch(loadLoginPop(false));
  };

  const onSubmit = async (data) => {
    data.device_token = device_token;
    dispatch(userLoginData(data));
  };

  const [values, setValues] = useState({
    password: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, password: !values.password });
  };
  const handleForgot = (event) => {
    event.preventDefault();
    dispatch(loadForgetPop(true));
    dispatch(loadLoginPop(false));
  };
  useEffect(() => {
    if (!device_token) {
      var token = uuidv4();

      dispatch(loadDeviceToken(token));
    }
  }, [device_token, dispatch]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClickModel(false)}
        className="subscription_modal"
      >
        <button className="crose_btn" onClick={() => handleClickModel(false)}>
          <img src={crose} alt="1" />
        </button>

        <Modal.Body>
          <div className="subscription">
            <div className="popup_left">
              <h5>{t("NOW_BUY_AND_SELL_ANYTHING_WITH_US")}</h5>
              <figure className="d-none d-sm-block">
                <img src={leftImg} alt="1" />
              </figure>
            </div>

            <div className="right_form_area">
              <h4>{t("LOGIN_IN_TO_DOFFO")}</h4>
              <div className="login_with">
                <SocialMedia />
              </div>

              <div className="hr_border">
                <span>{t("OR_CONTINUE_WITH")}</span>
              </div>
              <Form
                className="login_form login-fields m-0"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>
                    {t("EMAIL_ADDRESS")}
                    <span className="required-star">*</span>
                  </Form.Label>
                  <Form.Control
                    autoFocus={true}
                    type="email"
                    placeholder={t("ENTER_EMAIL_ADDRESS")}
                    name="email"
                    className={!errors.email ? classes.root : "w-100"}
                    {...register("email", {
                      required: t("PLEASE_ENTER_YOUR_EMAIL"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("INVALID_EMAIL"),
                      },
                    })}
                  />

                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className="error-message">{message}</p>
                    )}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>
                    {t("PASSWORD")}
                    <span className="required-star">*</span>
                  </Form.Label>
                  <Form.Control
                    type={values.password ? "text" : "password"}
                    className={!errors.password ? classes.root : "w-100"}
                    name="password"
                    {...register("password", {
                      required: t("PLEASE_ENTER_YOUR_VALID_PASSWORD"),
                    })}
                    placeholder={t("PASSWORD")}
                  />
                  <span className="text_view" onClick={handleClickShowPassword}>
                    {values.password ? t("HIDE") : t("SHOW")}
                  </span>

                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <p className="error-message">{message}</p>
                    )}
                  />
                </Form.Group>

                <div className="remamber">
                  <label className="checkbox_tab">
                    <input
                      type="checkbox"
                      name="remember_me"
                      {...register("remember_me")}
                    />
                    <span className="checkbox_design"></span>
                    {t("REMEMBER_ME")}
                  </label>
                  <a href="#!" className="forgot" onClick={handleForgot}>
                    {t("FORGOT_YOUR_PASSWORD")}
                  </a>
                </div>
                <Button title={t("LOGIN")} />
              </Form>

              <div className="new_user pt-3 text-center">
                {t("NEW_USER")}&nbsp;
                <a href="#!" onClick={handleShowRegister}>
                  {t("CREATE_ACCOUNT")}
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Login;
