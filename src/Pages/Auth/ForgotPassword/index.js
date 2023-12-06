import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { forgotPassword } from "../../../actions/userActions";
import { ErrorMessage } from "@hookform/error-message";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../Component/Button";
import { crose } from "../../../assets/images/index";
import { useTranslation } from "react-i18next";
import { loadLoginPop, loadForgetPop } from "../../../actions/baseActions";
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
const Forgot = (props) => {
  const { show } = props;
  const dispatch = useDispatch();
  const { push } = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleClickModel = () => {
    dispatch(loadForgetPop(false));
  };
  const onSubmit = (data) => {
    dispatch(forgotPassword(data, push));
  };
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loadLoginPop(true));
    dispatch(loadForgetPop(false));
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
            <div className="">
              <h4>{t("FORGOT_PASSWORD")}</h4>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>
                  {t("EMAIL_ADDRESS")}
                  <span className="required-star">*</span>
                </Form.Label>
                <Form.Control
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
    </>
  );
};
export default Forgot;
