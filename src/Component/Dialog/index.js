import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { loadDialog } from "../../actions/baseActions";

const Action = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(loadDialog({ open: false, message: "TEST", title: "TEST" }));
  };
  const handleConfirm = () => {
    props.action();
  };

  const { dialog } = useSelector((state) => ({
    dialog: state.dialog,
  }));
  return (
    <div>
      <Dialog
        open={dialog.open}
        // onClose={handleClose}
        onClose={() => false}
        fullWidth={true}
        maxWidth={"xs"}
        className="text-center"
      >
        <DialogTitle id="draggable-dialog-title">{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions className="justify-content-center pb-3 permission_modal">
          <Button
            onClick={handleConfirm}
            variant="contained"
            size="small"
            className=" theme_btn"
          >
            {t("OK")}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
            color="error"
            className="theme_btn bg-red"
          >
            {t("CANCEL")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Action;
