import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// import { loadData } from "../../actions/cmsActions";
import { apple, play, app } from "../../assets/images/index";

const Index = () => {
  const { t } = useTranslation();
  const handleClick = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch) {
      // dispatch(loadData());
    }
    // fetchCms();
  }, [dispatch]);
  return (
    <Fragment>
      <section className="mobile_app">
        <Container>
          <div className="app_info_row">
            <div className="app_info">
              <h3>{t("TRY_DOFFO_APP")}</h3>
              <p>{t("DOFFO_APP_TEXT")}</p>
              <div className="app_detail">
                <h5> {t("GET_APP_TODAY")}</h5>
                <div className="installing_link">
                  <a href="#!" onClick={handleClick}>
                    <img src={apple} alt="Apple" />
                  </a>
                  <a href="#!" onClick={handleClick}>
                    <img src={play} alt="Play" />
                  </a>
                </div>
              </div>
            </div>

            <figure className="img_app_fream">
              <img src={app} alt="App" />
            </figure>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Index;
