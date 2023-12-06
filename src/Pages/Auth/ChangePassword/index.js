import React, { useState, useRef } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChangeUserPassword } from "../../../actions/userActions";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../Component/Button";
import { crose } from "../../../assets/images/index";
import { useTranslation } from "react-i18next";
import { loadChangePasswordPop } from "../../../actions/baseActions";
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
const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const { changePassPopup, changePassInfo } = useSelector((state) => ({
    changePassPopup: state.changePassPopup,
    changePassInfo: state.changePassInfo,
  }));
  // console.log("repass", changePassPopup, changePassInfo);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: changePassInfo,
  });
  const handleClickModel = () => {
    dispatch(loadChangePasswordPop(false));
  };
  const onSubmit = (data) => {
    dispatch(loadChangePasswordPop(false));
    dispatch(ChangeUserPassword(data, push));
  };
  const [values, setPass] = useState({
    password: false,
  });
  const [values1, setCurrentPass] = useState({
    current_password: false,
  });
  const [values2, setConfirmation] = useState({
    password_confirmation: false,
  });
  const handleClickShowPassword = (event) => {
    switch (event) {
      case "pass":
        setPass({ ...values, password: !values.password });
        break;
      case "current_pass":
        setCurrentPass({
          ...values1,
          current_password: !values1.current_password,
        });
        break;
      case "pass_confirmation":
        setConfirmation({
          ...values2,
          password_confirmation: !values2.password_confirmation,
        });
        break;
      default:
        return false;
    }
  };
  const [valuesConfirmPass, setValuesConfirmPass] = useState({
    password_confirmation: false,
  });
  const handleClickShowConfirmPass = () => {
    setValuesConfirmPass({
      ...valuesConfirmPass,
      password_confirmation: !valuesConfirmPass.password_confirmation,
    });
  };
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <>
      <Modal
        show={changePassPopup}
        onHide={() => handleClickModel(true)}
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
            <div className="">
              <h4>{t("CHANGE_PASSWORD")}</h4>
              {/* current password */}
              <Form.Group className="mb-3" controlId="formGroupCurrentPassword">
                <Form.Label>
                  {t("CURRENT_PASSWORD")}
                  <span className="required-star">*</span>
                </Form.Label>
                <div className="sign_up_doffo">
                  <Form.Control
                    placeholder={t("ENTER_CURRENT_PASSWORD")}
                    type={values1.current_password ? "text" : "password"}
                    className={
                      !errors.current_password ? classes.root : "w-100"
                    }
                    name="current_password"
                    {...register("current_password", {
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
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/i,
                        message: t("PASSWORD_PATTERN_VALIDATION"),
                      },
                    })}
                  />
                  <span
                    className="text_view"
                    onClick={() => handleClickShowPassword("current_pass")}
                  >
                    {values.current_password ? t("HIDE") : t("SHOW")}
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="current_password"
                  render={({ message }) => (
                    <p className="error-message">{message}</p>
                  )}
                />
              </Form.Group>

              {/* New Password */}
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>
                  {t("NEW_PASSWORD")}
                  <span className="required-star">*</span>
                </Form.Label>
                <div className="sign_up_doffo">
                  <Form.Control
                    placeholder={t("ENTER_NEW_PASSWORD")}
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
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/i,
                        message: t("PASSWORD_PATTERN_VALIDATION"),
                      },
                    })}
                  />
                  <span
                    className="text_view"
                    onClick={() => handleClickShowPassword("pass")}
                  >
                    {values.password ? t("HIDE") : t("SHOW")}
                  </span>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="error-message">{message}</p>
                  )}
                />
              </Form.Group>
              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="formGroupConfirm">
                <Form.Label>
                  {t("CONFIRM_PASSWORD")}
                  <span className="required-star">*</span>
                </Form.Label>

                <div className="sign_up_doffo">
                  <Form.Control
                    type={
                      valuesConfirmPass.password_confirmation
                        ? "text"
                        : "password"
                    }
                    className={
                      !errors.password_confirmation ? classes.root : "w-100"
                    }
                    name="password_confirmation"
                    placeholder={t("ENTER_CONFIRM_PASSWORD")}
                    {...register("password_confirmation", {
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
                    {valuesConfirmPass.password_confirmation
                      ? t("HIDE")
                      : t("SHOW")}
                  </span>
                </div>

                <ErrorMessage
                  errors={errors}
                  name="password_confirmation"
                  render={({ message }) => (
                    <p className="error-message">{message}</p>
                  )}
                />
              </Form.Group>
              <Button type="submit" title={t("CHANGE_PASSWORD")} />
            </div>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};
export default ChangePassword;
