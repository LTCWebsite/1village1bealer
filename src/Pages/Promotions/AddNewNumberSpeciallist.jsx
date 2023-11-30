import React, { useEffect, useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { useHistory } from "react-router";
import Alert from "@mui/material/Alert";
import { Add, Checklist, Queue, Recommend } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { InputText } from "primereact/inputtext";
// import dayjs from "dayjs";
import { Dropdown } from "primereact/dropdown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import AxiosReq from "../../Components/Axios/AxiosReq";
import { ProgressBar } from "primereact/progressbar";
import DialogSpecialsuccess from '../Dialog/DialogSpecialsuccess'

function AddNewNumberSpeciallist() {
  const token = localStorage.getItem("Token");

  const header = {
    Authorization: `Bearer ${token}`,
  };

  const his = useHistory();
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [PrmtID, setPrmtID] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [StopTime, setStopTime] = useState("");
  const [Province, setProvince] = useState("");
  const [slCode, setSLCode] = useState([]);
  const [slStart, setSLStart] = React.useState("");
  const [slStop, setSLStop] = React.useState("");
  const [List, setList] = useState([]);

  const [waringAlert, setWarningAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setvalue] = useState(0);

  // console.log("ScoreS:", score);

//   console.log("PrmtID:", PrmtID);
  // console.log("Phone:", Phonenumber);
  // console.log("Startime:", slStart);
  // console.log("Stoptime:", slStop);
  // console.log("Province:", Province);

  const option_Code = List?.data?.map((x) => ({
    name: x.code,
    code: x.prmtId,
  }));

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const handleWarningAlert = () => {
    setWarningAlert(false);
  };

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

  const handleAppnewlist = () => {
    setvalue(20);
    const data1 = [
      {
        prmtId: PrmtID?.code,
        start: Phonenumber,
        stop: Phonenumber,
        startTime: slStart,
        stopTime: slStop,
        province: Province,
      },
    ];

    if (!PrmtID?.code || !Phonenumber || !slStart || !slStop || !Province) {
      setWarningAlert(true);
      setTimeout(() => {
        setWarningAlert(false);
      }, 1000);
    } else {
      AxiosReq.post(`/api/Special_Package/InsertMSISDNToSpecialList`, data1, {
        headers: header,
      }).then((res) => {
        if (res?.status === 200) {
          setvalue(100);
        //   console.log("Done");
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 1000);
          setOpen(true)
        }
      });
    }
  };

  const handPhoneChange = (e) => {
    setPhonenumber(e.target.value);
  };

//   console.log("Num", Phonenumber);

  return (
    <>
      {alert && (
        <Alert
          className="alert-wrapper "
          variant="filled"
          severity="success"
          onClose={handleCloseAlert}
        >
          <u>ທ່ານໄດ້ເພິ່ມສຳເລັດ !</u>
        </Alert>
      )}
      {waringAlert && (
        <Alert
          className="alert-wrapper "
          variant="filled"
          severity="warning"
          onClose={handleWarningAlert}
        >
          <u>ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ !</u>
        </Alert>
      )}
      <DialogSpecialsuccess isShow={open}  />
      <Grid item xs={12} lg="none" className="add-newspeciallist">
        <Grid item xs={12}>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} className="center-2">
            <u className="f-20 Success">
              ເພິ່ມເບີພິເສດໃໝ່ <Queue />
            </u>
          </Grid>
          <Grid container className="center-2 mt-10" item xs={12} spacing={2}>
            <Grid item xs={6}>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <u className="pdr-60">Code:</u>
                </span>
                <Dropdown
                  value={PrmtID?.name}
                  onChange={(e) => setPrmtID(e.value)}
                  options={option_Code}
                  optionLabel="name"
                  editable
                  // defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                  placeholder="ເລືອກເເຟ໋ກເກັດ"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <u className="pdr-60"> Phone :</u>
                </span>
                <InputText
                  type="number"
                  //   maxLength={10}
                  minLength={10}
                  placeholder="20 xx xxx xxx"
                  onChange={handPhoneChange}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container className="center-2 mt-10" item xs={12} spacing={2}>
            <Grid item xs={12}>
              <Grid container item xs={12} className="p-inputgroup">
                <div className="p-inputgroup ">
                  <span className=" p-inputgroup-addon hight-startime">
                    Start Time:
                  </span>
                  <Grid item xs={10} className="p-inputgroup-addon date-start">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          // value={StartTime}
                          className="DateStart"
                          onChange={(e) =>
                            setSLStart(
                              moment(e.toString()).format("YYYY-MM-DDTHH:mm:ss")
                            )
                          }
                          // dateFormat="yyyy-MM-dd"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} className="p-inputgroup ">
                <span className=" p-inputgroup-addon hight-startime">
                  Stop Time:
                </span>
                <Grid item xs={10} className="p-inputgroup-addon date-start">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        // value={slStop}
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className="center-2 mt-10" item xs={12} spacing={2}>
            <Grid item xs={12} className="p-inputgroup ">
              <span className=" p-inputgroup-addon hight-startime">
                Province:
              </span>
              <Grid item xs={10} className="p-inputgroup-addon date-start">
                <InputText
                  placeholder="Province..."
                  onChange={(e) => setProvince(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          {isLoading === true ? (
            <Grid item xs={12}>
              <div style={{ marginTop: 50, marginBottom: 50 }}>
                <ProgressBar value={value}></ProgressBar>
              </div>
            </Grid>
          ) : (
            <div className="center-2 ">
              <MDBBtn
                lassName="me-1"
                color="success"
                className="btn-confirm mt-20"
                label="Show"
                icon="pi pi-external-link"
                onClick={handleAppnewlist}
              >
                <u className="f-15"> ຢືນຢັນ</u>
              </MDBBtn>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default AddNewNumberSpeciallist;
