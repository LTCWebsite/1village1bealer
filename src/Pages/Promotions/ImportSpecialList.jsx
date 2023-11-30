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
import DialogSpecialsuccess from "./../Dialog/DialogSpecialsuccess"

import moment from "moment";

function ImportSpecialList() {
  const inputRef = useRef(null);
  //   const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  //   const header = {
  //     Authorization: `Bearer ${tokenData.token}`,
  //   };
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
  const [List, setList] = useState([]);

  const [slCode, setSLCode] = useState([]);
  const [slStart, setSLStart] = React.useState(dayjs(""));
  const [slStop, setSLStop] = React.useState(dayjs(""));
  const dateNow = new Date();

  // console.log("Data:", data);

  // console.log("STart", slStart);
  // console.log("STop", slStop);

  const LoadData = () => {
    AxiosReq.get("api/ListPrmtId", {
      headers: header,
    }).then((res) => {
      if (res.status === 200) {
        setList(res);
        // console.log("ShowList", res?.data);
      }
    });
  };

  useEffect(() => {
    LoadData();
  }, []);

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleErrAlert = () => {
    setErrAlert(false);
  };
  const handleUpLoad = () => {
    // isLoading(true);
    setLoading(true);
    // console.log(fileUpload);
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
            setOpen(true);
            setTimeout(() => {
              setAlert(true);
            }, 2000);
          }
        });
      }
    });
  };

  // console.log("Props", List);

  const option_Code = List?.data?.map((x) => ({
    name: x.code,
    code: x.prmtId,
  }));

  // console.log("Start time:", slStart);
  // console.log("Stop Time:", slStop);

  return (
    <>
      <DialogSpecialsuccess
        isShow={open}
        onHide={(e) => setOpen(e)}
        data={List}
        // addNew={(e) => {
        //   setRefesh(e);
        // }}
      />
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
      <Grid container>
        <Grid item xs={12} lg="none" className="ImportExel">
          <MDBCard className="Cards">
            <MDBCardBody>
              <MDBCardTitle>
                <Grid item xs={12} className="center-2">
                  <u className="f-20 Success">
                    ອັບໂຫລດໄຟລ <Queue />
                  </u>
                </Grid>
              </MDBCardTitle>
              <MDBCardText>
                <Grid item xs={12} lg="none">
                  <Grid container item xs={12}>
                    <Grid
                      container
                      className="center-2 mt-10"
                      item
                      xs={12}
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <div className="card flex justify-content-center">
                          <span className="span-head-select">
                            <u>Code :</u>
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
                      <Grid item xs={12}>
                        <div className="justify-content-center">
                          <span className="span-head-select">
                            <u>Start Time:</u>
                          </span>
                          <Grid className="starttime">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker
                                  label="ເລືອກວັນທີເລີ່ມ"
                                  onChange={(e) =>
                                    setSLStart(
                                      moment(e.toString()).format(
                                        "YYYY-MM-DDTHH:mm:ss"
                                      )
                                    )
                                  }
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className=" justify-content-center">
                          <span className="span-head-select">
                            <u>Stop Time:</u>
                          </span>
                          <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker
                                  label="ເລືອກວັນທີສິ້ນສຸດ"
                                  onChange={(e) =>
                                    setSLStop(
                                      moment(e.toString()).format(
                                        "YYYY-MM-DDTHH:mm:ss"
                                      )
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
                                {" "}
                                {/* <u className="center-2">ອັບໂຫລດໄຟລ</u> */}
                                <Grid item xs={12} className="center-2">
                                  <DriveFolderUploadRounded className="icon-upload " />
                                </Grid>
                              </MDBCardTitle>

                              {/* < onClick={chooseFile}>Choose File</> */}
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
                                    onChange={(e) =>
                                      setFileUpload(e.target.files[0])
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </MDBCardBody>
                          </MDBCard>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    </Grid>
                  )}
                </Grid>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </Grid>
      </Grid>
    </>
  );
}

export default ImportSpecialList;
