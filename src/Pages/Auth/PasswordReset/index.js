import { React, useState, useRef, useEffect, Fragment } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory,useLocation } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { resendOtpPassword, resetPassword } from "../../../actions/userActions";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../Component/Button";
import { crose } from "../../../assets/images/index";
import { useTranslation } from "react-i18next";
import { loadFormPop, loadLoginPop } from "../../../actions/baseActions";
import { checkMobileNumber } from "../../../utils/helpers";
const queryString = require("query-string");

const backUrl = process.env.REACT_APP_PUBLIC_URL;
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
  const { push } = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
     const location = useLocation();
 
   const queryStringParsed = queryString.parse(location.search);
   
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const handleClickModel = () => {
    dispatch(loadFormPop(false));
  };

  const { userParams } = useSelector((state) => ({
    userParams: state.userParams,
  }));
  const onSubmit = (data) => {
    data.otp = queryStringParsed.otp;
    dispatch(resetPassword(data, push));

     setInterval(() => {
      //console.log(backUrl);
        window.location.href = backUrl;
           }, 2000);
  };

  const [values, setValues] = useState({
    password: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, password: !values.password });
  };
  const [valuesConfirmPass, setValuesConfirmPass] = useState({
    confirm_password: false,
  });
  const handleClickShowConfirmPass = () => {
    setValuesConfirmPass({
      ...valuesConfirmPass,
      confirm_password: !valuesConfirmPass.confirm_password,
    });
  };
  const password = useRef({});
  password.current = watch("password", "");
  const [counter, setCounter] = useState(59);

 /* useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
*/
/*  const handleClickResendOTP = (e) => {
    e.preventDefault();
    const params = {};
    params.email = userParams.email;
    setCounter(59);
    dispatch(resendOtpPassword(params));
  };*/
  const handleLogin = () => {
    window.location.href=backUrl;
  };
  return (
    <Fragment>
      <Modal
        show={true}
        onHide={() => handleClickModel(false)}
        className="forgot_modal"
      >
       {/* <button className="crose_btn" onClick={() => handleClickModel(false)}>
          <img src={crose} alt="1" />
        </button> */}
        <Form
          className="login_form login-fields"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >  
          <Modal.Body>
            <div>
              <h4>{t("RESET_PASSWORD")}</h4>
            {/*  <Form.Group className="mb-3" controlId="formGroupEmailF">
                <Form.Label>
                  OTP
                  <span className="required-star">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  placeholder={t("ENTER_OTP")}
                 value={queryStringParsed.otp}
                  name="otp"
                  onKeyDown={(event) => checkMobileNumber(event)}
                  className={!errors.otp ? classes.root : "w-100"}
                  {...register("otp", {
                    required: t("PLEASE_ENTER_OTP"),
                    minLength: {
                      value: 4,
                      message: t("RESET_OTP_MINIMUM"),
                    },
                    maxLength: {
                      value: 4,
                      message: t("RESET_OTP_MAXIMUM"),
                    },
                  })}
                  autoFocus={true}
                />
                <ErrorMessage
                  errors={errors}
                  name="otp"
                  render={({ message }) => (
                    <p className="error-message">{message}</p>
                  )}
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>
                  {t("NEW_PASSWORD")}
                  <span className="required-star">*</span>
                </Form.Label>
                <Form.Control
                  placeholder={t("ENTER_PASSWORD")}
                  type={values.password ? "text" : "password"}
                  className={!errors.password ? classes.root : "w-100"}
                  name="password"
                  {...register("password", {
                    required: t("PASSWORD_REQUIRED"),
                    minLength: {
                      value: 6,
                      message: t("PASSWORD_MINIMUM_LENGTH"),
                    },
                    maxLength: {
                      value: 50,
                      message: t("PASSWORD_MAXIMUM_LENGTH"),
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                      message: t("PASSWORD_PATTERN_VALIDATION"),
                    },
                  })}
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
              <Form.Group className="mb-3" controlId="formGroupConfirm">
                <Form.Label>
                  {t("CONFIRM_PASSWORD")}
                  <span className="required-star">*</span>
                </Form.Label>
                <Form.Control
                  type={
                    valuesConfirmPass.confirm_password ? "text" : "password"
                  }
                  className={!errors.confirm_password ? classes.root : "w-100"}
                  name="confirm_password"
                  placeholder={t("ENTER_CONFIRM_PASSWORD")}
                  {...register("confirm_password", {
                    required: t("CONFIRM_PASSWORD_REQUIRED"),
                    validate: (value) =>
                      value === password.current ||
                      t("CONFIRM_AND_PASSWORD_NOT_MATCH"),
                  })}
                />
                <span
                  className="text_view"
                  onClick={handleClickShowConfirmPass}
                >
                  {valuesConfirmPass.confirm_password ? t("HIDE") : t("SHOW")}
                </span>
                <ErrorMessage
                  errors={errors}
                  name="confirm_password"
                  render={({ message }) => (
                    <p className="error-message">{message}</p>
                  )}
                />
              </Form.Group>
              <div className="remamber pt-0">
                <label className="checkbox_tab">&nbsp;</label>
               
              </div>
              <Button title={t("SUBMIT")} />
              
                 

              <div className="new_user pt-3 text-center">
                <a href="#!" onClick={handleLogin}>
                  {t("BACK_LOGIN")}
                </a>
              </div>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default Login;
