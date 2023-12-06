import React, { Fragment, useEffect } from "react";
import ScrollToTop from "../Component/ScrollToTop";
import Loading from "../Component/PreLoader";
import Alert from "../Component/Alert";
import { useSelector, useDispatch } from "react-redux";
import { getSettingData } from "../actions/settingActions";
import Page from "../Pages";
import "./../assets/css/developer.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../assets/css/App.css";
import "./../assets/css/media.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth, isFetching } = useSelector((state) => ({
    isAuth: state.isAuth,
    isFetching: state.isFetching,
  }));

  useEffect(() => {
    const fetchData = () => {
      dispatch(getSettingData());
    };
    fetchData();
  }, [dispatch]);

  return (
    <Fragment>
      <ScrollToTop />
      {isFetching && <Loading />}
      <Alert />
      <Page isAuth={isAuth} />
    </Fragment>
  );
};

export default App;
