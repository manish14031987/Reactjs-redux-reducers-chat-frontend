import { React, useState, useRef } from "react";
import { Form, Modal, Row, Col, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterData } from "../../../actions/userActions";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../Component/Button";
import { crose, leftImg } from "../../../assets/images/index";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SocialMedia from "../SocialMedia";
import { checkMobileNumber, ValidateAlpha } from "../../../utils/helpers";
import { loadRegisterPop, loadLoginPop } from "../../../actions/baseActions";

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
const Register = (props) => {
  const { selectedLang } = useSelector((state) => ({
    selectedLang: state.selectedLang,
  }));
  const { show } = props;
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const handleClickModel = () => {
    loadRegisterPop(false)(dispatch);
  };
  const handleShowLogin = (event) => {
    event.preventDefault();
    loadRegisterPop(false)(dispatch);
    loadLoginPop(true)(dispatch);
  };
  const onSubmit = (data) => {
    data.role_id = 3;
    console.log("data:", data);
    dispatch(userRegisterData(data));
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

  const handlePageClick = (event, slug) => {
    event.preventDefault();
    loadRegisterPop(false)(dispatch);
    history.push(`/${selectedLang}/${slug}`);
  };

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
        <Form
          className="login_form m-0"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <Modal.Body>
            <div className="subscription">
              <div className="popup_left">
                <h5>{t("NOW_BUY_AND_SELL_ANYTHING_WITH_US")}</h5>
                <figure className="d-none d-sm-block">
                  <img src={leftImg} alt="1" />
                </figure>
              </div>

              <div className="right_form_area">
                <h4>{t("SIGN_UP_TO_CONTINUE")}</h4>
                <div className="login_with">
                  <SocialMedia />
                </div>

                <div className="hr_border">
                  <span>{t("OR_CONTINUE_WITH")}</span>
                </div>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formGroupFirstName">
                      <Form.Label>
                        {t("FIRST_NAME")}
                        <span className="required-star">*</span>
                      </Form.Label>
                      <Form.Control
                        className={!errors.first_name ? classes.root : "w-100"}
                        name="first_name"
                        onKeyDown={(event) => ValidateAlpha(event)}
                        type="text"
                        placeholder={t("ENTER_FIRST_NAME")}
                        {...register("first_name", {
                          required: t("PLEASE_ENTER_YOUR_FIRST_NAME"),

                          minLength: {
                            value: 3,
                            message: t("FIRST_NAME_MINIMUM_LENGTH"),
                          },
                          maxLength: {
                            value: 50,
                            message: t("FIRST_NAME_MAXIMUM_LENGTH"),
                          },
                        })}
                        autoFocus={true}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="first_name"
                        render={({ message }) => (
                          <p className="error-message">{message}</p>
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formGroupLastName">
                      <Form.Label>
                        {t("LAST_NAME")}
                        <span className="required-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className={!errors.last_name ? classes.root : "w-100"}
                        placeholder={t("ENTER_LAST_NAME")}
                        onKeyDown={(event) => ValidateAlpha(event)}
                        name="last_name"
                        {...register("last_name", {
                          required: t("PLEASE_ENTER_LAST_NAME"),
                          minLength: {
                            value: 3,
                            message: t("LAST_NAME_MINIMUM_LENGTH"),
                          },
                          maxLength: {
                            value: 50,
                            message: t("LAST_NAME_MAXIMUM_LENGTH"),
                          },
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="last_name"
                        render={({ message }) => (
                          <p className="error-message">{message}</p>
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formGroupMobile">
                      <Form.Label>
                        {t("MOBILE_NUMBER")}
                        <span className="required-star">*</span>
                      </Form.Label>
                      <div className="form_sub_grp" style={{ display: "flex" }}>
                        <InputGroup.Text>+966</InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder={t("MOBILE_NUMBER")}
                          className={
                            !errors.mobile_number ? classes.root : "w-100"
                          }
                          style={{ marginLeft: "5px" }}
                          name="mobile_number"
                          onKeyDown={(event) => checkMobileNumber(event)}
                          {...register("mobile_number", {
                            required: t("PLEASE_ENTER_MOBILE_NUMBER"),
                            minLength: {
                              value: 7,
                              message: t("MOBILE_NUMBER_MINIUM_LENGTH"),
                            },
                            maxLength: {
                              value: 15,
                              message: t("MOBILE_NUMBER_MAXIMUM_LENGTH"),
                            },
                          })}
                        />
                      </div>
                      <ErrorMessage
                        errors={errors}
                        name="mobile_number"
                        render={({ message }) => (
                          <p className="error-message">{message}</p>
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>
                        {t("EMAIL_ADDRESS")}
                        <span className="required-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={t("ENTER_EMAIL_ADDRESS")}
                        className={!errors.email ? classes.root : "w-100"}
                        name="email"
                        {...register("email", {
                          required: t("PLEASE_ENTER_YOUR_EMAIL"),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t("INVALID_EMAIL"),
                          },
                          maxLength: {
                            value: 50,
                            message: t("EMAIL_MAXIMUM_LENGTH"),
                          },
                        })}
                        autoFocus={true}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => (
                          <p className="error-message">{message}</p>
                        )}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        {t("DATE_OF_BIRTH")}
                        <span className="required-star">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        className={!errors.dob ? classes.root : "w-100"}
                        name="dob"
                        {...register("dob", {
                          required: t("PLEASE_ENTER_YOUR_DOB"),
                        })}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="dob"
                        render={({ message }) => (
                          <p className="error-message">{message}</p>
                        )}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>
                    {t("PASSWORD")}
                    <span className="required-star">*</span>
                  </Form.Label>
                  <div className="sign_up_doffo">
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
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                          message: t("PASSWORD_PATTERN_VALIDATION"),
                        },
                      })}
                    />
                    <span
                      className="text_view"
                      onClick={handleClickShowPassword}
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
                <Form.Group className="mb-3" controlId="formGroupConfirm">
                  <Form.Label>
                    {t("CONFIRM_PASSWORD")}
                    <span className="required-star">*</span>
                  </Form.Label>

                  <div className="sign_up_doffo">
                    <Form.Control
                      type={
                        valuesConfirmPass.confirm_password ? "text" : "password"
                      }
                      className={
                        !errors.confirm_password ? classes.root : "w-100"
                      }
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
                      {valuesConfirmPass.confirm_password
                        ? t("HIDE")
                        : t("SHOW")}
                    </span>
                  </div>

                  <ErrorMessage
                    errors={errors}
                    name="confirm_password"
                    render={({ message }) => (
                      <p className="error-message">{message}</p>
                    )}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupReferral">
                  <Form.Label>{t("REFERRAL_CODE_LABEL")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="referral_code"
                    placeholder={t("ENTER_REFERRAL_CODE")}
                    {...register("referral_code", {})}
                  />
                </Form.Group>
                <div className="remamber agreefor">
                  <label className="checkbox_tab">
                    <input
                      name="policy"
                      className={!errors.policy ? classes.root : "w-100"}
                      type="checkbox"
                      {...register("policy", {
                        required: t("POLICY_CHOOSE"),
                      })}
                    />
                    <span className="checkbox_design"></span>
                    {t("AGREE_TEXT")}
                    <a
                      href="#!"
                      onClick={(e) => handlePageClick(e, "terms-condition")}
                    >
                      &nbsp;{t("TERMS_CONDITIONS")}
                    </a>
                    &nbsp; & &nbsp;
                    <a
                      href="#!"
                      onClick={(e) => handlePageClick(e, "privacy-policy")}
                    >
                      &nbsp;{t("PRIVACY_POLICY")}
                    </a>
                  </label>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="policy"
                  render={({ message }) => (
                    <p className="error-message">{message}</p>
                  )}
                />
                <Button title={t("REGISTER")} />

                <div className="new_user pt-3 text-center">
                  {t("ALREADY_ACCOUNT")} &nbsp;
                  <a href="#!" onClick={handleShowLogin}>
                    {t("LOGIN")}
                  </a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Form>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default Register;
