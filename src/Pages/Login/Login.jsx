import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Axios from "../../Components/Axios/Axios";
import { Grid, Paper, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { USER_KEY } from "../../Constants/index";
import Auth from "../../Components/Auth/Auth";
import Cookies from "js-cookie";
import logo2 from "../../Image/VIP-logo.svg";
import { IconManual, Icon_Password, Icon_User } from "../Icon/Icon";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import book from "../../Image/VIP_Inhouse.pdf";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import AxiosReq from "../../Components/Axios/AxiosReq";
import { AxiosCheck } from "../../Components/Axios/AxiosReq";
import { set } from "lodash";
import { Toast } from "primereact/toast";
import { Key } from "@mui/icons-material";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const toast = useRef();
  const toastSucces = useRef();

  // For History
  const history = useHistory();

  // For Set Style Paper
  const paperStyle = { padding: 20, minWidth: 500, margin: "20px auto" };

  // For Set State Username and Password
  const [forUsername, setforUsername] = useState("");
  const [idPart, setOTP] = useState("");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const his = useHistory();
  const [otpStatus, setOTPStatus] = useState(false);
  const user = localStorage.getItem("userName");

  const userName = (e) => {
    setforUsername(e.target.value);
    const result = e.target.value.toUpperCase();

    setText(result);
  };

  const userOTP = (e) => {
    setOTP(e.target.value);
    const result = e.target.value.toUpperCase();

    setText(result);
  };

  // Function For Submit Button
  const login = () => {
    localStorage.setItem("userName", forUsername);

    const send = {
      username: forUsername,
    };

    if (forUsername === "") {
      toast.current.show({
        severity: "warn",
        summary: "Warning".toUpperCase(),
        detail: "ກະລຸນາປ້ອນລະຫັດພະນັກງານຂອງທ່ານ !",
        life: 2000,
      });
    } else {
      AxiosReq.post("otp", send)
        .then(function (res) {
          console.log(res.data);

          if (res.status === 200) {
            setOTPStatus(true);
            if (res?.data?.resultCode === 201) {
              toast.current.show({
                severity: "warn",
                summary: "Warn",
                detail: "ກະລຸນາປ້ອນລະຫັດພະນັກງານໃຫ້ຖືກຕ້ອງ !",
                life: 3000,
              });
            } else if (res?.data?.resultCode === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "ຂໍ OTP ສຳເລັດ!",
                life: 2000,
              });
              Cookies.set("Promotion_token", res.data?.token);

              // history.push("/register");
            }
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "ກະລຸນາປ້ອນລະຫັດພະນັກງານຂອງທ່ານ !",
              life: 3000,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  // Function For Submit Button

  const onOTP = () => {
    const sendOTP = {
      username: forUsername,
      confirm_otp: idPart,
    };

    if (idPart === "") {
      toast.current.show({
        severity: "warn",
        summary: "Warning".toUpperCase(),
        detail: "ກະລຸນາປ້ອນລະຫັດ OTP ຈາກ SMS ຂອງທ່ານ !",
        life: 2000,
      });
    } else {
      AxiosReq.post("login", sendOTP)
        .then(function (response) {
          console.log("OTP inFo", response);
          if (response.status === 200) {
            localStorage.setItem("USER_ID", response.data.username);
            localStorage.setItem("IDWORK", response?.data?.detail?.emp_code);
            localStorage.setItem("Token", response?.data?.token);

            // console.log("DataToken:", response?.data?.token);

            if (response.data?.token === undefined) {
              setShow(true);
            } else {
              setShow(false);
              Auth.login(() => {
                localStorage.setItem(USER_KEY, JSON.stringify(response.data));
                localStorage.setItem(
                  USER_KEY,
                  JSON.stringify(response.data?.username)
                );

                // console.log("Promotion_token", response.data.token);
                Cookies.set("Promotion_token", response.data.token);

                //check user
                const id_Work = localStorage.getItem("IDWORK");

                AxiosCheck.post(
                  "login",
                  {
                    username: id_Work,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Basic YWRtaW46YWRtaW4=",
                    },
                  }
                ).then(function (res) {
                  // console.log("Res159:", res);
                  
                  if(res?.data?.token === ""){
                    console.log("Error")
                  }else{
                    history.push("/home");
                  }
                });
              });
            }
          } else {
            setShow(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          setShow(true);
        });
    }
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const enterOTP = (e) => {
    if (e.key === "Enter") {
      onOTP();
    }
  };

  return (
    <>
      <Toast ref={toast} position={"top-right"} style={{ marginTop: 100 }} />
      <Toast
        ref={toastSucces}
        position={"top-right"}
        style={{ marginTop: 100 }}
      />
      {!otpStatus === true ? (
        <div className="login_bg">
          <Grid className="login-con">
            <Grid container className="login_grid_logo">
              {/* <img src={logo2} width='270' /> */}
              {/* <u className="font-40 color-red"> One Village One Dealer</u> */}
            </Grid>

            <Paper elevation={10} style={paperStyle} className="login_paper">
              <div className="login_title">ເຂົ້າສູ່ລະບົບ</div>

              <Grid container className="login_tab_label">
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <span className="login_label">ຜູ້ໃຊ້</span>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <TextField
                    autoComplete="off"
                    className="form-control mt-1"
                    id="input-with-icon-textfield"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "7px",
                        fontFamily: "Poppins, Noto Sans Lao",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon_User />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="outlined"
                    fullWidth
                    onKeyUp={enterKey}
                    value={text}
                    onChange={userName}
                  />
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <Button
                    className="login_button"
                    fullWidth
                    variant="outlined"
                    onClick={login}
                  >
                    ເຂົ້າສູ່ລະບົບ
                  </Button>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a className="book-log" href={book} target="_blank">
                  <span style={{ paddingRight: ".5rem" }}>
                    <IconManual />
                  </span>
                  ຄູ່ມືການນຳໃຊ້ລະບົບ
                </a>
              </div>
            </Paper>
            {show && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  Username & Password is incorrect, Please try again.
                </Alert>
              </Stack>
            )}
          </Grid>
        </div>
      ) : (
        <div className="login_bg">
          <Grid className="login-con">
            <Grid container className="login_grid_logo">
              {/* <img src={logo2} width='270' /> */}
              {/* <u className="font-40"> 1 Village 1 Dealer</u> */}
            </Grid>

            <Paper elevation={10} style={paperStyle} className="login_paper">
              <div className="login_title">ຢືນຢັນ OTP</div>

              <Grid container className="login_tab_label">
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <span className="login_label">ປ້ອນ OTP</span>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <TextField
                    maxRows={5}
                    type="number"
                    inputProps={{ maxLength: 6 }}
                    placeholder="X X X X X"
                    autoComplete="off"
                    className="form-control mt-1"
                    id="input-with-icon-textfield"
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "7px",
                        fontFamily: "Poppins, Noto Sans Lao",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Key />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="outlined"
                    fullWidth
                    onKeyUp={enterOTP}
                    value={text}
                    onChange={userOTP}
                  />
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>

              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <Button
                    className="login_button"
                    fullWidth
                    variant="outlined"
                    onClick={onOTP}
                  >
                    ຢືນຢັນ OTP
                  </Button>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a className="book-log" href={book} target="_blank">
                  <span style={{ paddingRight: ".5rem" }}>
                    <IconManual />
                  </span>
                  ຄູ່ມືການນຳໃຊ້ລະບົບ
                </a>
              </div>
            </Paper>
            {show && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  Username & Password is incorrect, Please try again.
                </Alert>
              </Stack>
            )}
          </Grid>
        </div>
      )}
    </>
  );
}

export default Login;
