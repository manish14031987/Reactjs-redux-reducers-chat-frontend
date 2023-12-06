import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Index = (props) => {
  const { setting } = useSelector((state) => ({
    setting: state.setting,
  }));

  const { title } = props;
  useEffect(() => {
    document.title = setting.name + " | " + title;
  }, [title, setting]);

  return (
    <section className="bredcum_all">
      <Container>
        <div className="breadcrumb">
          <ul>
            <li>
              <Link to="/">
                Home<i className="fas fa-chevron-right"></i>
              </Link>
            </li>
            <li>
              <span>{title}</span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default Index;
