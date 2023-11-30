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
import Alert from "@mui/material/Alert";
import { USER_KEY } from "../../Constants";
import { CloudUpload, SimCardDownload, Upload } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import readXlsxFile from "read-excel-file";
import { Dropdown } from "primereact/dropdown";
import AxiosReq from "../../Components/Axios/AxiosReq";
import Lottie from "react-lottie-player";
import Loading from "../../Image/Lottie/Loading.json";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Toast } from "primereact/toast";
// import moment from "moment";
import Skeleton from "@mui/material/Skeleton";

export default function DialogFirstAc({ isShow, onHide, data }) {
  const token = localStorage.getItem("Token");
  const header = {
    Authorization: `Bearer ${token}`,
  };

  // console.log("Tk", token);

  const his = useHistory();
  const [alert, setAlert] = useState(false);
  const [fileUpload, setFileUpload] = React.useState();
  const [loading, setLoading] = useState(false);
  const toast = useRef();

  const [slCode, setSLCode] = useState([]);
  const [slStart, setSLStart] = React.useState(dayjs(""));
  const [slStop, setSLStop] = React.useState(dayjs(""));
  const dateNow = new Date();

  // console.log("Data:", data);

  // console.log("STart", slStart);
  // console.log("STop", slStop);

  const handleCloseAlert = () => {
    setAlert(false);
  };
  const handleUpLoad = () => {
    setLoading(true);

    // console.log(fileUpload);

    let file = fileUpload;
    readXlsxFile(file).then((rows) => {
      // console.log("FIle:");
      let data = [];
      rows.forEach((row, idx) => {
        // console.log("Data file:", row);
        data.push({
          msisdn: row[0].toString(),
        });
      });

      //add new msisid by File Exls
      // setDataExls(data);
      // console.log("Datttttta:", data);
      if (data === null) {
        console.log("error");
        toast.current.show({
          severity: "error",
          summary: "Error File".toUpperCase(),
          detail: "File upload ຂອງທ່ານບໍ່ມີຂໍ້ມູນ !",
          life: 1000,
        });
      } else {
        // console.log("Data import EX", data)
        AxiosReq.post(`api/CheckNumberFirstac/ImportExcel`, data, {
          headers: header,
        })
          .then((res) => {
            if (res?.status === 200) {
              setLoading(false);
              // setAlert(true);
              toast.current.show({
                severity: "success",
                summary: "Success File".toUpperCase(),
                detail: "ເບີໃນ File EXCEL Clear Already !",
                life: 3000,
              });
              setTimeout(() => {
                setAlert(false);
              }, 500);
              onHide(!isShow);
            } else if (res?.status === 204) {
              toast.current.show({
                severity: "error",
                summary: "Error File".toUpperCase(),
                detail: "ເບີໃນ File EXCEL ບໍ່ມີໃນລະບົບ !",
                life: 1000,
              });
            } else if (res?.status === 201) {
              toast.current.show({
                severity: "error",
                summary: "Error some number".toUpperCase(),
                detail: "ເບີໃນ File EXCEL clear already !",
                life: 1000,
              });
            }
          })
          .catch((er) => {
            console.log(er);
            toast.current.show({
              severity: "error",
              summary: "Error File".toUpperCase(),
              detail: "ເບີໂທໃນ file ມີການເຄຣຍແລ້ວ !",
              life: 1000,
            });
            onHide(!isShow);
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

      <Toast ref={toast} position={"top-right"} style={{ marginTop: 100 }} />

      <Dialog
        // open={isShow}
        style={{ width: "50vw", minWidth: 500 }}
        visible={isShow}
        onHide={() => {
          onHide(!isShow);
        }}
      >
        <Grid item xs={12} lg="none">
          <Grid container item xs={12}>
            <Grid item xs={12} className="center-2">
              <u className="f-20 Success">
                ອັບໂຫລດໄຟລເປີດເບີໃຫມ່ <CloudUpload />
              </u>
            </Grid>
            {loading === true ? (
              <Grid sx={{ width: "100%" }}>
                <Skeleton />
                <Skeleton animation="wave" style={{ height: "20vh" }} />
                <Skeleton animation={false} />
                <Grid item xs={12} className="center">
                  <u style={{fontSize: "20px"}}>ກຳລັງດຳເນີນການ...</u>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                className="center-2 mt-10"
                item
                xs={12}
                spacing={1}
              >
                <Grid item xs={12} className="">
                  <div className="center-2">
                    <MDBCard className="card-uploadfile ">
                      <MDBCardBody>
                        <MDBCardTitle>
                          <Grid item xs={12} className="center-2">
                            <CloudUpload className="icon-upload " />
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
                              className="btn-uploadfile1"
                              onChange={(e) => setFileUpload(e.target.files[0])}
                            />
                          </Grid>
                        </Grid>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  {data === null ? (
                    <div className="center-2 ">
                      <MDBBtn
                        lassName="me-1"
                        color="success"
                        className="btn-confirm mt-20"
                        label="Show"
                        icon="pi pi-external-link"
                        disabled
                      >
                        <u className="f-20"> ຢືນຢັນ</u>
                      </MDBBtn>
                    </div>
                  ) : (
                    <div className="center-2 ">
                      <MDBBtn
                        lassName="me-1"
                        color="success"
                        className="btn-confirm mt-20"
                        label="Show"
                        icon="pi pi-external-link"
                        onClick={handleUpLoad}
                        loading={loading}
                      >
                        <u className="f-20"> ຢືນຢັນ</u>
                      </MDBBtn>
                    </div>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
