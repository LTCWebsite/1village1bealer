import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBFile,
} from "mdb-react-ui-kit";
import { useHistory } from "react-router";
// import { AxiosReq } from "MyApp/Components/Axios";
import Alert from "@mui/material/Alert";
// import { USER_KEY } from "../../../Constants";
import {
  Add,
  Checklist,
  CloudCircle,
  DriveFolderUploadRounded,
  Queue,
  Recommend,
  Update,
  Upload,
} from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import readXlsxFile from "read-excel-file";
import { Dropdown } from "primereact/dropdown";
import AxiosReq from "../../Components/Axios/AxiosReq";
import Lottie from "react-lottie-player";
import Loading from "../../Image/Lottie/Loading.json";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { USER_KEY } from "../../Constants";

import moment from "moment";

export default function DialogUpdateSpeciallist({
  isShow,
  onHide,
  data,
  refresh,
  cb_refresh,
  funtionLoad,
}) {
  // const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  // const header = {
  //   Authorization: `Bearer ${tokenData.token}`,
  // };

  const his = useHistory();
  const [alert, setAlert] = useState(false);
  // const toast = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  
  const [slCode, setSLCode] = useState([]);
  const [slNumber, setSLNumber] = useState([]);
  const [slStart, setSLStart] = React.useState(dayjs(""));
  const [slStop, setSLStop] = React.useState(dayjs(""));

  const handleCloseAlert = () => {
    setAlert(false);
  };

  // console.log("code:", data);

  const option_Code = data?.map((x) => ({
    name: x.productType,
    code: x.prmtId,
  }));

  const option_Number = data?.map((x) => ({
    name: x.msisdn,
    code: x.msisdn,
  }));

  const handleUpdate = () => {
    isLoading(true);
    // console.log("Data:", data);

    // console.log("slCode", slCode);
    // console.log("slNumber", slNumber);
    // console.log("slTop", slStop);

    AxiosReq.put(
      `api/Special_Package?pkType=${slCode?.code}&msisdn=${slNumber?.code}&stop_time=${slStop}`,
      {
        headers: header,
      }
    ).then((res) => {
      if (res?.status === 200) {
        setLoading(false);
        setTimeout(() => {
          setAlert(true);
        }, 200);
        funtionLoad();
        cb_refresh(!refresh);
        onHide();
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      }
    });
  };

  // console.log("Start time:", slStart);
  // console.log("Stop Time:", slStop);

  return (
    <>
      {alert && (
        <Alert
          className="alert-wrapper "
          variant="filled"
          severity="success"
          onClose={handleCloseAlert}
        >
          <u>ທ່ານໄດ້ອັບໂຫລດສຳເລັດ !</u>
        </Alert>
      )}
      <Dialog
        open={isShow}
        style={{ width: "50vw", minWidth: 500 }}
        visible={isShow}
        onHide={() => {
          onHide(!isShow);
          // addNew(true);
        }}
        item
      >
        <Grid item xs={12} lg="none">
          <Grid container item xs={12}>
            <Grid item xs={12} className="center-2">
              <u className="f-20 Success">
                Update Speciallist <Update />
              </u>
            </Grid>
            <Grid container className="center-2 mt-10" item xs={12} spacing={1}>
              <Grid item xs={3}>
                <div className="card flex justify-content-center">
                  <span className="span-head-select">
                    <u>Type Code :</u>
                  </span>
                  <Dropdown
                    value={slCode}
                    onChange={(e) => setSLCode(e.value)}
                    options={option_Code}
                    optionLabel="name"
                    editable
                    className="w-full md:w-14rem"
                    // defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    placeholder="ເລືອກເເຟ໋ກເກັດ"
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="card flex justify-content-center">
                  <span className="span-head-select">
                    <u>Phonenumber :</u>
                  </span>
                  <Dropdown
                    value={slNumber}
                    onChange={(e) => setSLNumber(e.value)}
                    options={option_Number}
                    optionLabel="name"
                    editable
                    className="w-full md:w-14rem"
                    // defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    placeholder="ເລືອກເບີໂທ"
                  />
                </div>
              </Grid>
              <Grid item xs={5}>
                <div className=" justify-content-center">
                  <span className="span-head-select">
                    <u>Stop Time:</u>
                  </span>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="ເລືອກວັນທີສິ້ນສຸດ"
                          // className="DateStart"
                          onChange={(e) =>
                            setSLStop(
                              moment(e.toString()).format("YYYY-MM-DDTHH:mm:ss")
                            )
                          }
                          dateFormat="yyyy-MM-dd"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {isLoading ? (
            <Grid className="Loading loading-size">
              <Lottie
                loop
                animationData={Loading}
                play
                style={{ width: "100px", height: "100px" }}
              />
            </Grid>
          ) : (
            <Grid item xs={6}>
              <div className="center-2 ">
                <MDBBtn
                  lassName="me-1"
                  color="success"
                  className="btn-confirm mt-20"
                  label="Show"
                  icon="pi pi-external-link"
                  onClick={handleUpdate}
                >
                  <u className="f-20"> ຢືນຢັນ</u>
                </MDBBtn>
              </div>
            </Grid>
          )}
        </Grid>
      </Dialog>
    </>
  );
}
