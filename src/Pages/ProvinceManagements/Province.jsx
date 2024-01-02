import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import AdminTable from "../Admin/AdminTable";
// import AdminTable from "./AdminTable";
// import { AdminDialog, EditDialog } from "./AdminDialog";

function Province() {
  const [open, setopen] = useState({ add: false, edit: false });
  const [refresh, setrefresh] = useState(false);
  const [data, setdata] = useState([]);

  return (
    <>
      <div>
        <Grid item xs={12} className="pd-10">
          <Grid item xs={12}>
            <Grid item sx={10}>
              <h3>ຈັດການແຂວງ</h3>
            </Grid>
            <Grid item xs={2} style={{marginBottom: "20px"}} className="right">
              <Button
                variant="contained"
                color="success"
                onClick={() => setopen({ ...open, add: true })}
              >
                <Add />
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: "20px",
            }}
          >
            <AdminTable
              className="tbl_manageadmin"
              refresh={refresh}
              cb_data={(e) => setdata(e)}
              cb_edit={(e) => setopen({ ...open, edit: e })}
            />
          </Grid>
          {/* <AdminDialog
            open={open.add}
            cb={(e) => {
              setopen({ ...open, add: e });
            }}
            refresh={(e) => setrefresh(e)}
          /> */}
          {/* <EditDialog
            open={open.edit}
            cb={(e) => setopen({ ...open, edit: e })}
            data={data}
            refresh={(e) => setrefresh(e)}
          /> */}
        </Grid>
      </div>
    </>
  );
}

export default Province;
