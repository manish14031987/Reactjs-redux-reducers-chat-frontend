import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import EventIcon from "@material-ui/icons/Event";
import { Box, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function MaterialUIPickers({
  selectedDate,
  handleDateChange,
  minDate,
  maxDate,
  placeholder,
  showDobField,
}) {
  return (
    <div className="custom-date-picker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid
          container
          style={
            showDobField
              ? { marginRight: "3%", cursor: "text" }
              : { marginRight: "3%", cursor: "not-allowed" }
          }
        >
          <KeyboardDatePicker
            disabled={showDobField ? false : true}
            autoOk
            minDate={minDate && minDate}
            maxDate={maxDate && maxDate}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            keyboardIcon={
              <Box
                component={EventIcon}
                width="1.5rem!important"
                // height="1.5rem!important"
                height="1.5rem!important"
              />
            }
            placeholder={placeholder ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton onClick={(e) => {}}>
                  <HighlightOffIcon />
                </IconButton>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
