import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { MDBBtn } from "mdb-react-ui-kit";
import { Grid } from "@material-ui/core";
import checklist from "./../../Assets/Images/checklist.png";
// import { Close } from "@material-ui/icons";
import { useHistory } from "react-router";
import { AxiosReq } from "MyApp/Components/Axios";

export default function DialogSubmit({
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

  const onSubmit = () => {
    // console.log("detail", detail);
    // console.log("detail", user?.memberid);
    // console.log("detail", member?.data?.members[sl_index]?.member_id);
    // console.log("detail", detail);

    setLoad(true);
    // const user = JSON.parse(localStorage.getItem("USER"));
    // console.log("user:", user?.memberid);

    // console.log("object", member?.data?.question[indexMember]?.member_id);
    AxiosReq.post(
      "savescore",
      {
        score: detail,
        inviteid: user?.memberid,
        memberid: member?.data?.members[sl_index]?.member_id,
        succes: nofalse,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      }
    ).then(
      (res) => {
        // console.log(res?.data?.resultCode);
        if (res?.data?.resultCode === "200") {
          setLoad(false);
          setIndexMember(sl_index + 1);
          callfunction();
          // his.push("/app/dashboard/form");
          onHide();
        }
      },
      (error) => {
        console.log(error);
        // setLoad(false);
      }
    );
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
              ການປະເມີນຂອງທ່ານໄດ້ສຳເລັດຮຽບຮ້ອຍແລ້ວ!
            </u>
          </Grid>
          <Grid className="center-2" item xs={12}>
            <u className="m-0 font-20">
              ຂອບໃຈທີ່ທ່ານໄດ້ເຂົ້າຮ່ວມປະເມີນໃນຄັ້ງນິ້​!
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
              onClick={""}
            >
              ປິດ
            </MDBBtn>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}
