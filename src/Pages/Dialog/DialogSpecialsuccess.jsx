import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { MDBBtn } from "mdb-react-ui-kit";
// import checklist from "./../../Assets/Images/checklist.png";
// import { Close } from "@material-ui/icons";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";
import checklist from "./../../Image/checklist.png";

export default function DialogUpdateSpeciallist({
  detail,
  member,
  callfunction,
  sl_index,
  isShow,
  onHide,
  nofalse,
}) {
  const his = useHistory();
  const [load, setLoad] = useState(false);
  const user = JSON.parse(localStorage.getItem("USER"));
  const [indexMember, setIndexMember] = useState(0);

  // console.log("user:", user?.memberid);

  // useEffect(() => {
  //   const memberLength = member?.data?.members?.length;
  //   setMem(memberLength);
  //   let Succes = mem - indexMember;
  //   setSucces(Succes);
  // }, [mem, indexMember]);

  const onBack = () => {
    // window.location.href = "/home/speciallist";
    his.push("/home/speciallist")
  };

  return (
    <Dialog
      style={{ width: "40vw", minWidth: 500 }}
      visible={isShow}
      onHide={onHide}
      item
    >
      <Grid item xs={12} lg="none">
        <Grid item xs={12}>
          <Grid item xs={12} className="center-2">
            <img src={checklist} width="80px" height="80px" />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <h3 className="icon-image"></h3>
          </Grid>
          <Grid item xs={12} className="center-2">
            <u className="font-30 Submit">
              ການດຳເນີນການຂອງທ່ານໄດ້ສຳເລັດຮຽບຮ້ອຍແລ້ວ!
            </u>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "30px" }}>
          <div className="center-2 ">
            <MDBBtn
              color="info"
              className="mx-2 btn-submit btn-sz"
              label="Show"
              icon="pi pi-external-link"
              onClick={onBack}
            >
              ປິດ
            </MDBBtn>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}
