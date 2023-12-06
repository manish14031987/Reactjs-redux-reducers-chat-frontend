import { React, useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";
import {
  resendOtpRegister,
  verifyOtpMobile,
} from "../../../actions/userActions";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../Component/Button";
import { crose } from "../../../assets/images/index";
import { checkMobileNumber } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import { loadRegisterVerify } from "../../../actions/baseActions";
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
const RegisterVerify = (props) => {
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
    loadRegisterVerify(false)(dispatch);
  };
  const onSubmit = (data) => {
    data.phone = userParams.mobile_number;
    data.device_token = device_token;
    dispatch(verifyOtpMobile(data));
  };

  const [counter, setCounter] = useState(59);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleClickResendOTP = (e) => {
    e.preventDefault();
    const params = {};
    params.phone = userParams.mobile_number;
    setCounter(59);
    dispatch(resendOtpRegister(params));
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClickModel(false)}
        className="forgot_modal"
      >
        <button className="crose_btn" onClick={() => handleClickModel(false)}>
          <img src={crose} alt="1" />
        </button>
        <Form
          className="login_form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <Modal.Body>
            <div>
              <h4>{t("VERIFY_MOBILE_NO")}</h4>
              <Form.Group className="mb-3" controlId="formGroupEmailF">
                <Form.Label>
                  OTP
                  <span className="required-star">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("ENTER_OTP")}
                  name="otp"
                  onKeyDown={(event) => checkMobileNumber(event)}
                  className={!errors.otp ? classes.root : "w-100"}
                  {...register("otp", {
                    required: t("PLEASE_ENTER_OTP"),
                    minLength: {
                      value: 6,
                      message: t("RESET_OTP_MINIMUM"),
                    },
                    maxLength: {
                      value: 6,
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
              </Form.Group>
              <div className="remamber pt-0">
                <label className="checkbox_tab">&nbsp;</label>
                {counter === 0 && (
                  <a
                    href="#!"
                    className="forgot"
                    onClick={(e) => handleClickResendOTP(e)}
                  >
                    {t("RESEND_OTP")}
                  </a>
                )}
              </div>
              <Button title={t("SUBMIT")} />
              {counter !== 0 && (
                <Box mt={1}>
                  <Typography
                    fontWeight={500}
                    align="center"
                    color="textSecondary"
                  >
                    {t("RESEND")}&nbsp;
                    <span style={{ color: "#33A7CC", fontWeight: "bold" }}>
                      00:{counter}
                    </span>
                  </Typography>
                </Box>
              )}
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};
export default RegisterVerify;
