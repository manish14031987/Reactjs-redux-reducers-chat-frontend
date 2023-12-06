import { toast } from "react-toastify";

const AxiosError = (err, str) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("response came but not success");
    console.log("err.response.data:", err.response.data);
    toast.error(err.response.data.message);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    console.log("request made but no response received");
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log("err.request:", err.request);
    console.log(" err.message:", err.message);
    console.log("err.stack:", err.stack);
  } else {
    // Something happened in setting up the request that triggered an err
    console.log("err", err.message);
  }
  console.log(err.config);
  // console.log('================ in axios error file ==========')
};
export { AxiosError };
