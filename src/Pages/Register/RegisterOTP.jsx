// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import Axios from "../../Components/Axios/Axios";
// import { Grid, Paper, Button } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import TextField from "@mui/material/TextField";
// import { USER_KEY } from "../../Constants/index";
// import Auth from "../../Components/Auth/Auth";
// import Cookies from "js-cookie";
// import logo2 from "../../Image/VIP-logo.svg";
// import { IconManual, Icon_Password, Icon_User } from "../Icon/Icon";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";
// import book from "../../Image/VIP_Inhouse.pdf";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import IconButton from "@mui/material/IconButton";
// import { Password, VpnKey } from "@mui/icons-material";
// import AxiosReq from "../../Components/Axios/AxiosReq";

// function RegisterOTP() {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   // For History
//   const history = useHistory();

//   // For Set Style Paper
//   const paperStyle = { padding: 20, width: 500, margin: "20px auto" };

//   // For Set State Username and Password
//   const [idPart, setIDPart] = useState("");
//   const [otp, setOTP] = useState("");

//   const [text, setText] = useState("");

//   const [show, setShow] = useState(false);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const userName = (e) => {
//     setIDPart(e.target.value);
//     const result = e.target.value.toUpperCase();
//     setText(result);
//   };

//   const passWord = (e) => {
//     setOTP(e.target.value);
//   };

//   // Function For register Button
//   const login = () => {
//     AxiosReq.post(`api/Register?username=${idPart}&otp=${otp}`, {})
//       .then(function (response) {
//         // console.log(response.data);
//         if (response.status === 200) {
//           history.push("/");
//           //   if (response.data?.token === undefined) {
//           //     setShow(true);
//           //   } else {
//           //     setShow(false);
//           //     Auth.login(() => {
//           //       localStorage.setItem(USER_KEY, JSON.stringify(response.data));
//           //       Cookies.set("VIP_Inhouse_token", response.data.token);
//           //       history.push("/login");
//           //     });
//           //   }
//         } else {
//           setShow(true);
//         }
//       })
//       .catch(function (error) {
//         // console.log(error);
//         setShow(true);
//       });
//   };

//   const enterKey = (e) => {
//     if (e.key === "Enter") {
//       login();
//     }
//   };

//   return (
//     <>
//       <div className="login_bg">
//         <Grid className="login-con">
//           <Grid container className="login_grid_logo">
//             {/* <img src={logo2} width='270' /> */}
//             <u className="font-40"> 1 Village 1 Dealer</u>
//           </Grid>

//           <Paper elevation={10} style={paperStyle} className="login_paper">
//             <div className="login_title">ຢືນຢັນລົງທະບຽນ</div>

//             <Grid container className="login_tab_label">
//               <Grid item xs={2}></Grid>
//               <Grid item xs={8}>
//                 <span className="login_label">ປ້ອນລະຫັດພະນັກງານ</span>
//               </Grid>
//               <Grid item xs={2}></Grid>
//             </Grid>

//             <Grid container>
//               <Grid item xs={2}></Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   inputProps={{ maxLength: 6 }}
//                   autoComplete="off"
//                   className="form-control mt-1"
//                   id="input-with-icon-textfield"
//                   sx={{
//                     "& .MuiInputBase-root": {
//                       borderRadius: "7px",
//                       fontFamily: "Poppins, Noto Sans Lao",
//                     },
//                   }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Icon_User />
//                       </InputAdornment>
//                     ),
//                   }}
//                   size="small"
//                   variant="outlined"
//                   fullWidth
//                   onKeyUp={enterKey}
//                   value={text}
//                   onChange={userName}
//                 />
//               </Grid>
//               <Grid item xs={2}></Grid>
//             </Grid>
//             <Grid container className="login_tab_label">
//               <Grid item xs={2}></Grid>
//               <Grid item xs={8}>
//                 <span className="login_label">OTP</span>
//               </Grid>
//               <Grid item xs={2}></Grid>
//             </Grid>

//             <Grid container>
//               <Grid item xs={2}></Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   autoComplete="off"
//                   className="form-control mt-1"
//                   id="input-with-icon-textfield"
//                   sx={{
//                     "& .MuiInputBase-root": {
//                       borderRadius: "7px",
//                       fontFamily: "Poppins, Noto Sans Lao",
//                     },
//                   }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <VpnKey />
//                       </InputAdornment>
//                     ),
//                   }}
//                   size="small"
//                   variant="outlined"
//                   fullWidth
//                   onKeyUp={enterKey}
//                   value={otp}
//                   onChange={passWord}
//                 />
//               </Grid>
//               <Grid item xs={2}></Grid>
//             </Grid>

//             <Grid container>
//               <Grid item xs={2}></Grid>
//               <Grid item xs={8}>
//                 <Button
//                   className="login_button"
//                   fullWidth
//                   variant="outlined"
//                   onClick={login}
//                 >
//                   ຢືນຢັນລົງທະບຽນ
//                 </Button>
//               </Grid>
//               <Grid item xs={2}></Grid>
//             </Grid>
//           </Paper>
//           {show && (
//             <Stack sx={{ width: "100%" }} spacing={2}>
//               <Alert severity="error">
//                 Username & Password is incorrect, Please try again.
//               </Alert>
//             </Stack>
//           )}
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <a className="book-log" href={book} target="_blank">
//               <span style={{ paddingRight: ".5rem" }}>
//                 <IconManual />
//               </span>
//               ຄູ່ມືການນຳໃຊ້ລະບົບ
//             </a>
//           </div>
//         </Grid>
//       </div>
//     </>
//   );
// }

// export default RegisterOTP;
