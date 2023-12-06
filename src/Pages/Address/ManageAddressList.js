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

import { useSelector, useDispatch } from "react-redux";
import { loadData } from "../../actions/notificationActions";
import Header from "../Partial/Header";
import Sidebar from "../Sidebar/Sidebar";

import {
  deleteAddressThunk,
  getAddressesThunk,
  postAddressesThunk,
  setAsDefaultAddressThunk,
} from "../../redux/actions/profileActions";
import LottiLoader from "../../Component/lottiAnimation/LottiLoader";
import CommonLoader from "../../Component/Loader/CommonLoader";
import CommonMap from "../../Component/maps/CommonMap";

import { loadDialog } from "../../actions/baseActions";
import { useTranslation } from "react-i18next";
import CommonDelete from "../../Component/modals/CommonDelete";
import EditAddressContent from "./EditAddressContent";
import { textTruncateDescription } from "../../Component/TextTruncate/textTruncate";
import locationMarker from "../../assets/images/location_pin_small.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { crose } from "../../assets/images/index";
import Slide from "@mui/material/Slide";
function ManageAddressList(props) {
  function dashsidebar() {
    document.getElementById("onscroll").classList.toggle("dashboard_sidebar");
  }

  // All Selectors
  const { GET_USER_PROFILE } = useSelector((state) => ({
    GET_USER_PROFILE: state?.sidebarReducer?.userProfileData,
  }));

  const [form, setForm] = useState({
    title: "",
    address: "",
    building: "",
    city: "",
    district: "",
    landmark: "",
    location: [],
    postal_code: "",
  });

  const [fullAddress, setFullAddress] = useState("");

  // const [form, setForm] = useState({
  //   title:
  //     new Date().toLocaleDateString() +
  //     "  " +
  //     new Date().getHours() +
  //     ":" +
  //     new Date().getMinutes(),
  //   address: "",
  //   apartment_name: "b1",
  //   street_name: "s1",
  //   building: "bu1",
  //   city: "",
  //   district: "district1",
  //   landmark: "landmark",
  //   location: [],
  //   postal_code: "",
  // });

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

  const [addAddresssLoading, setAddAddressLoading] = useState(false);
  const [addAddresssError, setAddAddressError] = useState(false);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [editAddresssData, setEditAddressData] = useState({});

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
      address = "Map location is Required !";
    }

    if (!form.apartment_name) {
      apartment_name = "Required !";
    } else if (form.apartment_name.length > 100) {
      apartment_name = "Max 100 characters !";
    }

    if (!form.address) {
      address = "Please specify a accurate location on map";
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
    } else if (form.city.length < 3) {
      city = "Min 3 characters required";
    }

    if (!form.district) {
      district = "Required !";
    } else if (form.district.length > 50) {
      district = "Max 50 characters !";
    } else if (form.district.length < 3) {
      district = "Min 3 characters required";
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
      street_name ||
      address
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
        address,
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
        callback: (res) => postAddressesThunkCallback(res),
      };

      dispatch(postAddressesThunk(sendData));
    }
  };

  const postAddressesThunkCallback = (res) => {
    if (res === "loading") {
      setAddAddressLoading(true);
    }
    if (res === "success") {
      setAddAddressLoading(false);
      setShowAddressModal(false);
      setForm({
        title: "",
        address: "",
        building: "",
        city: "",
        district: "",
        landmark: "",
        location: [],
        postal_code: "",
      });
    }
    if (res === "failure") {
      setAddAddressLoading(false);
      setAddAddressError(true);
    }
  };

  useEffect(() => {
    
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setForm({
          ...form,
          location: [pos.lat, pos.lng],
        });
      });

  }, []);

  const dispatch = useDispatch();

  const addresses = useSelector((state) => state.profile.addresses);

  const { t } = useTranslation();

  useEffect(() => {
    if (!showAddressModal) {
      let sendData = {
        callback: (res) => getAddressesThunkCallback(res),
      };
      dispatch(getAddressesThunk(sendData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddressModal]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAddressesThunkCallback = (res) => {
    if (res === "loading") {
      setLoading(true);
    }
    if (res === "success") {
      setLoading(false);
    }
    if (res === "failure") {
      setLoading(false);
      setError(true);
    }
  };

  const setUpdatedLatLng = (lat, lng, addressArray, full_Address) => {
    // console.log("addressArray", addressArray);
    setForm({
      ...form,
      location: [lat, lng],
    });
    setFullAddress(full_Address);
  };

  const handleAddressDelete = (addressId) => {
    // confirm("Are you sure");
    // dispatch(
    //   loadDialog({
    //     open: true,
    //     message: t("LOGOUT_MESSAGE"),
    //     title: t("LOGOUT_TITLE"),
    //   })
    // );

    let sendData = {
      addressId,
      callback: (res) => deleteAddressThunkCallback(res),
    };

    dispatch(deleteAddressThunk(sendData));
  };

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const deleteAddressThunkCallback = (res) => {
    if (res === "loading") {
      setDeleteLoading(true);
    }
    if (res === "success") {
      setDeleteLoading(false);
      let sendData = {
        callback: (res) => getAddressesThunkCallback(res),
      };
      dispatch(getAddressesThunk(sendData));
    }
    if (res === "failure") {
      setDeleteLoading(false);
      setDeleteError(true);
    }
  };

  const handleMapAddress = (data) => {
    // console.log("handleMapAddress data:", data);
    setForm({
      ...form,
      address: data.address,
      city: data.city ? data.city : "",
      postal_code: data.postal_code ? data.postal_code : "",
      apartment_name: data?.building_no ? data?.building_no : "",
      district: data?.district_addr ? data?.district_addr : "",
    });
  };

  const handleSetAsDefault = (addressId) => {
    let sendData = {
      addressId,
      callback: (res) => setAsDefaultAddressThunkCallback(res),
    };

    dispatch(setAsDefaultAddressThunk(sendData));
  };

  const [setAsDefaultLoading, setSetAsDefaultLoading] = useState(false);
  const [setAsDefaultError, setSetAsDefaultError] = useState(false);

  const setAsDefaultAddressThunkCallback = (res) => {
    if (res === "loading") {
      setSetAsDefaultLoading(true);
    }
    if (res === "success") {
      setSetAsDefaultLoading(false);
      let sendData = {
        callback: (res) => getAddressesThunkCallback(res),
      };
      dispatch(getAddressesThunk(sendData));
    }
    if (res === "failure") {
      setSetAsDefaultLoading(false);
      setSetAsDefaultError(true);
    }
  };

  const addressModelHide = () => {
    setShowAddressModal(false);
    setFullAddress("");
    setFormErrors({
      title: "",
      address: "",
      building: "",
      city: "",
      district: "",
      landmark: "",
      location: "",
      postal_code: "",
    });
    setForm({
      title: "",
      address: "",
      building: "",
      city: "",
      district: "",
      landmark: "",
      location: [],
      postal_code: "",
    });
  };

  return (
    <>
      <section
        className="middle_banner_sec"
        style={{
          backgroundImage: `url(${GET_USER_PROFILE?.backgroundImage})`,
        }}
      ></section>

      <div className="toggle_main">
        <div className="togggle_dashboard" onClick={dashsidebar}>
          <img src="../assets/images/toggle.png" alt="img" />
        </div>
      </div>
      <section className="manage_address">
        <Container>
          <div className="sidebar_outer">
            <div className="sidebar_main">
              <Sidebar />
            </div>

            <div className="dashboard_main">
              <div className="outline_wrapper">
                <div
                  className="mb-2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2 className="mb-0">Manage Addresses</h2>
                  <div className="add_new_btn">
                    <Button
                      className="theme_btn"
                      onClick={() => setShowAddressModal(true)}
                    >
                      Add New Address
                    </Button>
                  </div>
                </div>

                <Row>
                  {loading ? (
                    <LottiLoader loader={true} />
                  ) : error ? (
                    <LottiLoader message="Something went wrong" />
                  ) : (
                    <>
                      {addresses?.map((row, i) => {
                        return (
                          <Col sm={6} key={i} className="d-flex">
                            <div
                              className="order_detail_box"
                              style={{ width: "100%" }}
                            >
                              <div className="order_detail_head">
                                <span>{row?.title}</span>
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                  >
                                    <img
                                      src="../assets/images/toggle_icon1.svg"
                                      alt="img"
                                      style={{
                                        width: "25px",
                                        height: "18px",
                                        padding: "2px 2px",
                                      }}
                                    />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => {
                                        setShowEditAddressModal(true);
                                        setEditAddressData(row);
                                      }}
                                    >
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() =>
                                        handleSetAsDefault(row?._id)
                                      }
                                    >
                                      {setAsDefaultLoading
                                        ? "processing..."
                                        : "Set As Default"}
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                    // onClick={() =>
                                    //   handleAddressDelete(row?._id)
                                    // }
                                    >
                                      {/* {deleteLoading ? "Deleting..." : "Delete"} */}
                                      <CommonDelete
                                        handleDelete={() =>
                                          handleAddressDelete(row?._id)
                                        }
                                        deleteLoading={deleteLoading}
                                      />
                                      {/* <CommonDelete /> */}
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                              <div className="order_caption">
                                <strong title={row?.address}>
                                  {textTruncateDescription(row?.address)}
                                </strong>{" "}
                                <strong className="ml-3 d-inline-block"></strong>
                                <p>
                                  {row?.building} {row?.city} {row?.district}{" "}
                                  {row?.postal_code}
                                </p>
                                {row?.is_default && (
                                  <span
                                    style={{
                                      background: "green",
                                      color: "white",
                                      padding: "3px 10px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    {" "}
                                    Default{" "}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </>
                  )}

                  {/* <Col sm={6} className="mb-3 mb-md-5">
                    <div className="add_new_btn">
                      <Button
                        className="theme_btn"
                        onClick={() => setShowAddressModal(true)}
                      >
                        Add New Address
                      </Button>
                    </div>
                  </Col> */}
                </Row>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Add Address */}

      <Dialog
        open={showAddressModal}
        onClose={(e) => addressModelHide(e)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="with-crose">
          {" "}
          Add Shipping Details
          <button className="crose_btn" onClick={(e) => addressModelHide(e)}>
            <img src={crose} alt="img" />
          </button>
        </DialogTitle>
        <Form className="addcard_form">
          <DialogContent className="pt-2">
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
                    // height: "290px",
                    marginBottom: "10px",
                    zIndex: 50,
                  }}
                >
                  {/* =========================================  CommonMap ================================ */}
                  <CommonMap
                    google={props.google}
                    center={{
                      lat: form?.location[0] ? form?.location[0] : 18.5204,
                      lng: form?.location[1] ? form?.location[1] : 73.8567,
                    }}
                    height="250px"
                    zoom={15}
                    sendLatLng={(lat, lng, addressArray, formatted_address) =>
                      setUpdatedLatLng(
                        lat,
                        lng,
                        addressArray,
                        formatted_address
                      )
                    }
                    sendAddress={(data) => handleMapAddress(data)}
                  />

                  {/* =========================================  CommonMap ends here ================================ */}
                </div>
                {formErrors?.address && (
                  <p className="validation-error"> {formErrors?.address} </p>
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
                    value={form.apartment_name}
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
                    value={form.street_name}
                    onChange={handleChange}
                    maxLength={100}
                  />
                  {formErrors?.street_name && (
                    <p className="validation-error">
                      {" "}
                      {formErrors?.street_name}{" "}
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Control
                    type="text"
                    placeholder="Building, Floor and or Unit Number (Optional)"
                    name="building"
                    value={form.building}
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
                    value={form.city}
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
                    value={form.district}
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
                    value={form.postal_code}
                    onChange={handleChange}
                    maxLength={10}
                  />
                  {formErrors?.postal_code && (
                    <p className="validation-error">
                      {" "}
                      {formErrors?.postal_code}{" "}
                    </p>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-0" controlId="formGroupEmail">
                  <Form.Control
                    type="text"
                    placeholder="Nearby Landmark (Optional)"
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    maxLength={50}
                  />
                  {formErrors?.landmark && (
                    <p className="validation-error"> {formErrors?.landmark} </p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </DialogContent>
          <DialogActions className="dialoog-footer">
            <Button
              className="theme_btn text-center d-inline-block"
              type="button"
              onClick={handleSubmit}
              disabled={addAddresssLoading}
            >
              {addAddresssLoading ? <CommonLoader /> : "Save"}
            </Button>
          </DialogActions>
        </Form>
      </Dialog>

      {/* Add Address */}

      {/* Edit Address */}
      <Dialog
        open={showEditAddressModal}
        onClose={() => setShowEditAddressModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="with-crose">
          {" "}
          Edit Shipping Details
          <button
            className="crose_btn"
            onClick={() => setShowEditAddressModal(false)}
          >
            <img src={crose} alt="img" />
          </button>
        </DialogTitle>

        <DialogContent className="pt-2">
          <EditAddressContent
            data={editAddresssData}
            setShowEditAddressModal={setShowEditAddressModal}
            showEditAddressModal={showEditAddressModal}
            getAddressesThunkCallback={getAddressesThunkCallback}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Address */}
    </>
  );
}

export default ManageAddressList;
