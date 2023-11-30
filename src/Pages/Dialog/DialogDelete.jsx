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
  AutoDelete,
  Checklist,
  CloudCircle,
  DriveFolderUploadRounded,
  Queue,
  Recommend,
  SimCardDownload,
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
import { Toast } from "primereact/toast";

import moment from "moment";

export default function DialogDelete({
  isShow,
  onHide,
  data,
  refresh,
  cb_refresh,
}) {
  // const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Bearer ${token}`,
  };

  // console.log("Token:", token);
  // const userName = tokenData.user[0].value;

  const his = useHistory();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const toast = useRef(null);
  const [isLoading, setLoading] = useState(false);

  //   console.log("Data:", data);

  // console.log("STart", slStart);
  // console.log("STop", slStop);

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleUpLoad = (idFirst) => {
    // console.log(data);

    // console.log("ID", idFirst);
    AxiosReq.delete(
      `api/DeleteFirstac?msisdn=${idFirst}`,
      {},
      {
        headers: header,
      }
    ).then((res) => {
      if (res.status === 200) {
        cb_refresh(!refresh);
        onHide(!isShow);
      }
    });
  };
  

  return (
    <>
      <Toast ref={toast} position={"top-right"} style={{ marginTop: 100 }} />

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
          //   addNew(true);
        }}
        item
      >
        <Grid item xs={12} lg="none">
          <Grid container item xs={12}>
            <Grid item xs={12} className="center-2">
              <u className="f-20 Success">
                Confirme Delete <AutoDelete />
              </u>
            </Grid>
            <Grid item xs={12} className="center-2">
              <u className="f-20 Success">
                
              </u>
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
                  color="danger"
                  className="btn-confirm mt-20"
                  label="Show"
                  icon="pi pi-external-link"
                  onClick={handleUpLoad}
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
