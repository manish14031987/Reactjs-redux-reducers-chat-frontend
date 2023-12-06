export const AlphaInput = (event) => {
  if (event) {
    var char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z ]+$/.test(char)) {
      event.preventDefault();
    }
  }
};

export const FloatInput = (event) => {
  if (event) {
    var char = String.fromCharCode(event.which);
    if (!/^\d*(\.\d{0,2})?$/.test(char)) {
      event.preventDefault();
    }
  }
};

export const NumberInput = (event) => {
  if (event) {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }
};
