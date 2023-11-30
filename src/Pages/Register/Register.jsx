import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Paper, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { USER_KEY } from "../../Constants/index";
import Auth from "../../Components/Auth/Auth";
import Cookies from "js-cookie";
import { IconManual, Icon_Password, Icon_User } from "../Icon/Icon";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import book from "../../Image/VIP_Inhouse.pdf";
import AxiosReq from "../../Components/Axios/AxiosReq";
import { Key } from "@mui/icons-material";
import { Toast } from "primereact/toast";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // For History
  const history = useHistory();

  // For Set Style Paper
  const paperStyle = { padding: 20, width: 500, margin: "20px auto" };

  // For Set State Username and Password
  const [idPart, setIDPart] = useState("");
  const [forPassword, setforPassword] = useState("");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const user = localStorage.getItem("userName");
  const [alert, setAlert] = useState(false);
  const toast = useRef();

  const userName = (e) => {
    setIDPart(e.target.value);
    const result = e.target.value.toUpperCase();
    setText(result);
  };

  // Function For Submit Button
  const login = () => {
    if (idPart === "") {
      toast.current.show({
        severity: "warn",
        summary: "Warning".toUpperCase(),
        detail: "ກະລຸນາປ້ອນລະຫັດ OTP ຈາກ SMS ຂອງທ່ານ !",
        life: 2000,
      });
    } else {
      AxiosReq.post(`api/ConfirmOTP?username=${user}&otp=${idPart}`, {})
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem("USER_ID", response.data.username)
            localStorage.setItem("Token", response?.data?.token)
            // console.log("Data:", response?.data?.token);
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
                history.push("/home");
              });
            }
          } else {
            setShow(true);
          }

          // console.log(response.data);
          // if (response.status === 200) {
          //   // history.push("/home");
          //   console.log("Register:", response);
          // } else if (response.status === 201) {
          //   setAlert(true);
          // } else {
          //   console.log(
          //     "%cStop!",
          //     "color:red;font-family:system-ui;font-size:4rem;font-weight:bold;text-align: center;"
          //   );
          //   console.log(
          //     "%cThis is a browser feature intended for developers. Do not copy or paste something here to enable Bulk SMS website",
          //     "color: grey;"
          //   );
          // }
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

  return (
    <>
      <Toast ref={toast} position={"top-right"} style={{ marginTop: 100 }} />

      <div className="login_bg">
        <Grid className="login-con">
          <Grid container className="login_grid_logo">
            {/* <img src={logo2} width='270' /> */}
            <u className="font-40"> PROMOTION CONTROL</u>
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
                  ຢືນຢັນ OTP
                </Button>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Paper>
          {show && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">
                Username & Password is incorrect, Please try again.
              </Alert>
            </Stack>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a className="book-log" href={book} target="_blank">
              <span style={{ paddingRight: ".5rem" }}>
                <IconManual />
              </span>
              ຄູ່ມືການນຳໃຊ້ລະບົບ
            </a>
          </div>
        </Grid>
      </div>
    </>
  );
}

export default Register;
