import { createTheme } from "@material-ui/core/styles";
import Moment from "moment";

export const formLabelsTheme = createTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: "#f00",
        "&$error": {
          color: "#f00",
        },
      },
    },
  },
});

export const rtlTheme = createTheme({
  direction: "rtl",
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: "#f00",
        "&$error": {
          color: "#f00",
        },
      },
    },
  },
});

export const ltrTheme = createTheme({
  direction: "ltr",
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: "#f00",
        "&$error": {
          color: "#f00",
        },
      },
    },
  },
});

export const catchError = (response) => {
  if (response instanceof Error) {
    throw new Error(response.response.data.message);
  }
};

export const ValidateAlpha = (event) => {
  var k = event.keyCode;
  if (k === 9) {
    return true;
  }
  if (k !== 8) {
    if (k > 31 && (k < 65 || k > 90) && (k > 97 || k < 122)) {
      event.preventDefault();
      return false;
    }
  }
};

export const date = function (date) {
  return Moment(date).format("DD-MMM-YYYY");
};

export const dateTime = function (date) {
  return Moment(date).format("DD-MM-YYYY HH:mm:ss");
};

export const checkMobileNumber = (event) => {
  var k = event.keyCode;
  if (k === 9) {
    return true;
  }
  if (k !== 8) {
    if ((k < 48 || k > 57) && (k < 96 || k > 105)) {
      event.preventDefault();
      return false;
    }
  }
};
export const checkSpace = function (aa) {
  if (aa.startsWith(" ") || aa.endsWith(" ")) {
    return false;
  } else {
    return true;
  }
};
export const getNumber = function (aa) {
  if (aa) {
    var number = parseInt(aa, 10);
    return number;
  }
};
