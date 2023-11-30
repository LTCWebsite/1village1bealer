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
  Upload,
} from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import readXlsxFile from "read-excel-file";
import { Dropdown } from "primereact/dropdown";
import AxiosReq from "../../Components/Axios/AxiosReq";
import Lottie from "react-lottie-player";
import Loading from "../../Image/Lottie/Loading.json";
import Loading100 from "../../Image/Lottie/Loading100.json";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import moment from "moment";

export default function DialogUpload({ isShow, onHide, data }) {
  const inputRef = useRef(null);
  const token = localStorage.getItem("Token");

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const his = useHistory();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [errAlert, setErrAlert] = useState(false);
  const [fileUpload, setFileUpload] = React.useState();
  const toast = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const [slCode, setSLCode] = useState([]);
  const [slStart, setSLStart] = React.useState(dayjs(""));
  const [slStop, setSLStop] = React.useState(dayjs(""));
  const [progress, setProgress] = React.useState(false);
  const dateNow = new Date();

  // console.log("Data:", data);

  // console.log("STart", slStart);
  // console.log("STop", slStop);

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleErrAlert = () => {
    setErrAlert(false);
  };
  const handleUpLoad = () => {
    setLoading(true);
    let file = fileUpload;

    readXlsxFile(file).then((rows) => {
      if (rows[0] === null) {
        setTimeout(() => {
          errAlert(true);
        }, [3000]);
      } else {
        let data = [];
        rows.forEach((row) => {
          // console.log("Data file:", row);

          data.push({
            prmtId: slCode?.code,
            start: row[0].toString(),
            stop: row[0].toString(),
            startTime: slStart,
            stopTime: slStop,
            province: row[1],
          });
        });

        // console.log("Data", data);
        //add new msisid by File Exls
        // setDataExls(data);

        AxiosReq.post(`/api/Special_Package/InsertMSISDNToSpecialList`, data, {
          headers: header,
        }).then((res) => {
          if (res?.status === 200) {
            setLoading(false);
            onHide(!isShow);

            setTimeout(() => {
              setAlert(true);
            }, 2000);
          }
        });
      }
    });
  };

  const option_Code = data?.map((x) => ({
    name: x.code,
    code: x.prmtId,
  }));

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
      {/* {alert && (
        <Alert
          className="alert-wrapper "
          variant="filled"
          severity="error"
          onClose={handleErrAlert}
        >
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <u>ຟາຍ Excel ຂອງທ່ານບໍ່ຖືກຮູບແບບ!</u>
            </Grid>
            <Grid item xs={12}>
              <u>ກະລຸນນາແປງຟາຍໃຫ້ຖືກຮູບແບບ</u>
            </Grid>
            <Grid item xs={12}>
              <u>(ຂໍຂອບໃຈ)</u>
            </Grid>
          </Grid>
        </Alert>
      )} */}

      <Dialog
        open={isShow}
        style={{ width: "65vw", minWidth: 500, zIndex: "-1000" }}
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
                ອັບໂຫລດໄຟລ <Queue />
              </u>
            </Grid>
            <Grid container className="center-2 mt-10" item xs={12} spacing={1}>
              <Grid item xs={12} md={12} lg={4}>
                <div className="justify-content-center">
                  <span className="span-head-select">
                    <u>Code :</u>
                  </span>
                  <Grid className="starttime" item xs={12}>
                    <Dropdown
                      value={slCode}
                      onChange={(e) => setSLCode(e.value)}
                      options={option_Code}
                      optionLabel="name"
                      editable
                      className="w-full"
                      // defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                      placeholder="ເລືອກເເຟ໋ກເກັດ"
                    />
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <div className="justify-content-center">
                  <span className="span-head-select">
                    <u>Start Time:</u>
                  </span>
                  <Grid className="starttime">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          className="dateTimepicker"
                          label="ເລືອກວັນທີເລີ່ມ"
                          onChange={(e) =>
                            setSLStart(
                              moment(e.toString()).format("YYYY-MM-DDTHH:mm:ss")
                            )
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <div className=" justify-content-center">
                  <span className="span-head-select">
                    <u>Stop Time:</u>
                  </span>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="ເລືອກວັນທີສິ້ນສຸດ"
                          className="DateStart"
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
              <Grid item xs={12} className="">
                <div className="center-2">
                  <MDBCard className="card-uploadfile ">
                    <MDBCardBody>
                      <MDBCardTitle>
                        <Grid item xs={12} className="center-2">
                          <DriveFolderUploadRounded className="icon-upload " />
                        </Grid>
                      </MDBCardTitle>
                      <Grid container className="center-2" item xs={12}>
                        <Grid item xs={12}>
                          <MDBCardText className="center-2">
                            <u>ເລືອກ​ໄຟລຂອງທ່ານ : </u>
                          </MDBCardText>
                        </Grid>
                        <Grid item xs={12} className="center-2">
                          <TextField
                            type="file"
                            // onChange={onUpload}
                            className="btn-uploadfile1"
                            onChange={(e) => setFileUpload(e.target.files[0])}
                          />
                        </Grid>
                      </Grid>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {isLoading ? (
              <Grid className="Loading loading-size  ">
                <Lottie
                  loop
                  animationData={Loading}
                  play
                  style={{ width: "100px", height: "100px" }}
                />
              </Grid>
            ) : (
              <div className="center-2 ">
                <MDBBtn
                  lassName="me-1"
                  color="success"
                  className="btn-confirm mt-20"
                  label="Show"
                  icon="pi pi-external-link"
                  onClick={handleUpLoad}
                >
                  <u className="f-20"> ຢືນຢັນ</u>
                </MDBBtn>
              </div>
            )}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
