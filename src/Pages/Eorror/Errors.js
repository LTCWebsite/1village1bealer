import React from "react";
import logo from "../../Image/404.gif";
import { Grid } from "@mui/material";

function Errors() {
  return (
    <>
      <Grid container>
        <Grid container item xs={12} style={{ marginTop: "15vh" }}>
          <Grid item xs={12} className="center">
            <h1>404 Page Not Found</h1>
          </Grid>
          <Grid item xs={12} className="center">
            {/* <Img src={logo} className="error-img" /> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Errors;
