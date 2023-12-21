import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Axios from "../../Components/Axios/Axios";
import Cookies from "js-cookie";
import { Delete } from "@mui/icons-material";

export default function AdminTable({ refresh, cb_data, cb_edit }) {
  const [dataadmin, setDataAdmin] = React.useState([]);
  const [dataROwner, setRoomOwner] = React.useState([]);

  const loadData = () => {
    // Axios.get("Manage_Admin/All", {
    //   headers: {
    //     Authorization: `Bearer ${Cookies.get("Smart_Meeting_token")}`,
    //   },
    // }).then((res) => {
    //   if (res.status === 200) {
    //     setDataAdmin(res.data);
    //   }
    // });

    // Axios.get("Room_Owner/All", {
    //   headers: {
    //     Authorization: `Bearer ${Cookies.get("Smart_Meeting_token")}`,
    //   },
    // }).then((res) => {
    //   if (res.status === 200) {
    //     setRoomOwner(res.data);
    //   }
    // });
  };

//   const EditMe = (id, st) => {
//     cb_data(id);
//     cb_edit(true);
//   };

//   React.useEffect(() => {
//     loadData();
//   }, [refresh]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ລຳດັບ</TableCell>
              <TableCell>ລະຫັດພະນັກງານ</TableCell>
              <TableCell>ຊື່ ແລະ ນາມສະກຸນຜູ້ດູແລ</TableCell>
              <TableCell>ເພດ</TableCell>
              <TableCell>ພະແນກ</TableCell>
              <TableCell align="right" width={150}>
                ໜ້າທີ່ຮັບຜິດຊອບ
              </TableCell>
              <TableCell align="right">ຕຳແໜ່ງ</TableCell>
              <TableCell align="center">ເບີໂທຕິດຕໍ່</TableCell>
              <TableCell align="center">option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {dataadmin?.admin_detail?.length > 0 ?
              <>
                {dataadmin?.admin_detail?.map((row, idx) => (
                  // console.log(row)
                  <TableRow key={idx}>
                    <TableCell align="center">{row?.admin_id}</TableCell>
                    <TableCell>{row?.emp_code}</TableCell>
                    <TableCell>{row?.fname_lao}{" "}{row?.lname_lao}</TableCell>
                    <TableCell>{(row?.gender === "F") ? <>ຍິງ</> : <>ຊາຍ</>}</TableCell>
                    <TableCell>{dataROwner?.room_owner?.find(item => item?.ro_id === row.dep_id).owner_name}</TableCell>
                    <TableCell align="right" width={150}>{row?.sec_name}</TableCell>
                    <TableCell align="right" width={150}>{row?.position}</TableCell>
                    <TableCell align="right" width={150}>{row?.tel_number}</TableCell>
                    <TableCell align="right" width={50}>
                      <u onClick={() => EditMe(row.admin_id, row.admin_active)}>
                        <Delete className='delete' />
                      </u>
                    </TableCell>
                  </TableRow>
                ))}
              </> : <>
                <TableBody>
                  <TableCell style={{ justifyContent: "center", alignItems: 'center' }}>No Data...</TableCell>
                </TableBody>
              </> */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
