import { React, useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Dropdown,
  Modal,
} from "react-bootstrap";
import Header from "../Partial/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddressThunk,
  getAddressesThunk,
  postAddressesThunk,
  setAsDefaultAddressThunk,
  updateAddressesThunk,
} from "../../redux/actions/profileActions";
import LottiLoader from "../../Component/lottiAnimation/LottiLoader";
import CommonLoader from "../../Component/Loader/CommonLoader";
import CommonMap from "../../Component/maps/CommonMap";
import { useTranslation } from "react-i18next";
import locationMarker from "../../assets/images/location_pin_small.svg";
import DialogActions from "@mui/material/DialogActions";
const EditAddressContent = ({
  data,
  setShowEditAddressModal,
  showEditAddressModal,
  getAddressesThunkCallback,
  ...rest
}) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: data?._id,
    title: data?.title,
    address: data?.address,
    building: data?.building,
    city: data?.city,
    district: data?.district,
    landmark: data?.landmark,
    location: data?.location?.coordinates,
    postal_code: data?.postal_code,
    apartment_name: data?.apartment_name,
    street_name: data?.street_name,
  });
  const [fullAddress, setFullAddress] = useState("");

  console.log("EditAddressContent form:", form);

  const [formErrors, setFormErrors] = useState({
    title: "",
    address: "",
    building: "",
    city: "",
    district: "",
    landmark: "",
    location: "",
    postal_code: "",
  });

  const [editAddresssLoading, setEditAddressLoading] = useState(false);
  const [editAddresssError, setEditAddressError] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validation = () => {
    let title = "";
    let apartment_name = "";
    let building = "";
    let street_name = "";
    let city = "";
    let district = "";
    let landmark = "";
    let location = "";
    let postal_code = "";
    let address = "";

    if (!form.title) {
      title = "Required !";
    } else if (form.title.length > 50) {
      title = "Max 50 characters !";
    }

    if (!form.street_name) {
      street_name = "Required !";
    } else if (form.street_name.length > 50) {
      street_name = "Max 50 characters !";
    }

    if (!form.address) {
      address = "Please specify a accurate location on map";
    }

    if (!form.apartment_name) {
      apartment_name = "Required !";
    } else if (form.apartment_name.length > 100) {
      apartment_name = "Max 100 characters !";
    }

    // if (!form.building) {
    //   building = "Required !";
    // } else if (form.building.length > 50) {
    //   building = "Max 50 characters !";
    // }

    if (!form.city) {
      city = "Required !";
    } else if (form.city.length > 50) {
      city = "Max 50 characters !";
    }

    if (!form.district) {
      district = "Required !";
    } else if (form.district.length > 50) {
      district = "Max 50 characters !";
    }

    // if (!form.landmark) {
    //   landmark = "Required !";
    // } else if (form.landmark.length > 50) {
    //   landmark = "Max 50 characters !";
    // }

    // location remaining
    if (form.location.length !== 2) {
      location = "Required ,please turn on location ";
    }

    if (!form.postal_code) {
      postal_code = "Required !";
    } else if (form.postal_code.length > 50) {
      postal_code = "Max 50 characters !";
    }

    if (
      title ||
      // building ||
      city ||
      district ||
      // landmark ||
      location ||
      postal_code ||
      apartment_name ||
      street_name
    ) {
      setFormErrors({
        title,
        // building,
        city,
        district,
        // landmark,
        location,
        postal_code,
        apartment_name,
        street_name,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    const isValid = validation();
    if (isValid) {
      let sendData = {
        data: form,
        callback: (res) => updateAddressesThunkCallback(res),
      };

      dispatch(updateAddressesThunk(sendData));
    }
  };

  const updateAddressesThunkCallback = (res) => {
    if (res === "loading") {
      setEditAddressLoading(true);
    }
    if (res === "success") {
      setEditAddressLoading(false);
      setShowEditAddressModal(false);
      let sendData = {
        callback: (res) => getAddressesThunkCallback(res),
      };
      dispatch(getAddressesThunk(sendData));
    }
    if (res === "failure") {
      setEditAddressLoading(false);
      setEditAddressError(true);
    }
  };

  const setUpdatedLatLng = (lat, lng, addressArray, full_Address) => {
    setForm({
      ...form,
      location: [lat, lng],
    });

    setFullAddress(full_Address);
  };

  // useEffect(() => {
  //   if (showEditAddressModal) {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(function (position) {
  //         var pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };
  //         setForm({
  //           ...form,
  //           location: [pos.lat, pos.lng],
  //         });
  //       });
  //     }
  //   }
  // }, [showEditAddressModal]);

  const handleMapAddress = (data) => {
    setForm({
      ...form,
      address: data.address == undefined ? "" : data.address,
      city: data.city == undefined ? "" : data.city,
      postal_code: data.postal_code == undefined ? "" : data.postal_code,
      apartment_name: data?.building_no == undefined ? "" : data?.building_no,
      district: data?.district_addr == undefined ? "" : data?.district_addr,
    });
  };

  return (
    <>
      <Form className="addcard_form">
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Address Name"
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={50}
                autoFocus
              />
              {formErrors?.title && (
                <p className="validation-error"> {formErrors?.title} </p>
              )}
            </Form.Group>
          </Col>
          <Col md={12} className="mb-3">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "250px",
                marginBottom: "20px",
                zIndex: 50,
              }}
            >
              {/* =========================================  CommonMap ================================ */}
              <CommonMap
                google={rest.google}
                center={{
                  lat: form?.location[0] ? form?.location[0] : 18.5204,
                  lng: form?.location[1] ? form?.location[1] : 73.8567,
                }}
                height="250px"
                zoom={15}
                sendLatLng={(lat, lng, addressArray, formatted_address) =>
                  setUpdatedLatLng(lat, lng, addressArray, formatted_address)
                }
                sendAddress={(data) => handleMapAddress(data)}
              />

              {/* =========================================  CommonMap ends here ================================ */}
            </div>

            {formErrors?.location && (
              <p className="validation-error"> {formErrors?.location} </p>
            )}
          </Col>

          {fullAddress && (
            <Col md={12}>
              <div
                className="mb-3"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={locationMarker}
                  alt=""
                  style={{ marginRight: "10px" }}
                />{" "}
                <p className="mt-0 mb-0">{fullAddress}</p>
              </div>
            </Col>
          )}
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Building Number"
                name="apartment_name"
                value={form?.apartment_name}
                onChange={handleChange}
                maxLength={50}
              />
              {formErrors?.apartment_name && (
                <p className="validation-error">
                  {" "}
                  {formErrors?.apartment_name}{" "}
                </p>
              )}
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Street Name"
                name="street_name"
                value={form?.street_name}
                onChange={handleChange}
                maxLength={100}
              />
              {formErrors?.street_name && (
                <p className="validation-error"> {formErrors?.street_name} </p>
              )}
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Building, Floor, Apt, or Unit Number (Optional)"
                name="building"
                value={form?.building}
                onChange={handleChange}
                maxLength={50}
              />
              {formErrors?.building && (
                <p className="validation-error"> {formErrors?.building} </p>
              )}
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={form?.city}
                onChange={handleChange}
                maxLength={50}
              />
              {formErrors?.city && (
                <p className="validation-error"> {formErrors?.city} </p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="District"
                name="district"
                value={form?.district}
                onChange={handleChange}
                maxLength={50}
              />
              {formErrors?.district && (
                <p className="validation-error"> {formErrors?.district} </p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                value={form?.postal_code}
                onChange={handleChange}
                maxLength={10}
              />
              {formErrors?.postal_code && (
                <p className="validation-error"> {formErrors?.postal_code} </p>
              )}
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Nearby Landmark"
                name="landmark"
                value={form?.landmark}
                onChange={handleChange}
                maxLength={50}
              />
              {formErrors?.landmark && (
                <p className="validation-error"> {formErrors?.landmark} </p>
              )}
            </Form.Group>
          </Col>
        </Row>
        <DialogActions className="px-0">
          <Button
            className="theme_btn text-center d-inline-block"
            type="button"
            onClick={handleSubmit}
            disabled={editAddresssLoading}
          >
            {editAddresssLoading ? <CommonLoader /> : "Save"}
          </Button>
        </DialogActions>
      </Form>
    </>
  );
};

export default EditAddressContent;
