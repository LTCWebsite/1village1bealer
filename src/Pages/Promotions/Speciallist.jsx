import React, { useState, useEffect } from "react";
import {
  Alert,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";
import { IconSearch } from "../Icon/Icon";
import OtherSelect from "react-select";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Axios from "../../Components/Axios/Axios";
import { USER_KEY } from "../../Constants";
import AxiosReq from "../../Components/Axios/AxiosReq";
import Lottie from "react-lottie-player";
import Loading from "../../Image/Lottie/Loading.json";
import { EditNote, Visibility } from "@mui/icons-material";
import DialogAddnewlist from "./View/DialogAddnewlist";
import DialogUpload from "../Dialog/DialogUpload";
import { Pagination } from "antd";
import { set } from "lodash";
import DialogUpdateSpeciallist from "../Dialog/DialogUpdateSpeciallist";

function Speciallist() {
  // const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const token = localStorage.getItem("Token");

  const header = {
    Authorization: `Bearer ${token}`,
  };
  // const userName = tokenData.user[0].value;
  const [getVIP, setGetVIP] = useState("all");
  const [dataVIPType, setDataVIPType] = useState([]);
  const [getNetwork, setGetNetwork] = useState("all");
  const [networkType, setnetworkType] = useState([]);
  const [searchnumber, setSearchNumber] = useState("");
  const [savePage, setsavePage] = useState(1);
  const [perPage] = useState(10);

  const [allpage, setAllpage] = useState(0);
  const [seletgroup, setseletgroup] = useState({ value: 0, label: "ທັງໝົດ" });
  const [selectCate, setSelectCate] = useState(0);
  const [selectPrmtId, setSelectPrmtId] = useState(0);

  const [dataTable, setdataTable] = useState([]);
  const [emptyPage, setEmptyPage] = useState(false);
  const [packages, setPK] = useState([]);
  const [listSpecial, setSpeciallist] = useState([]);
  const [isLoading, setLoading] = useState("no");
  const [getSpecial, setGetSpecial] = useState("all");
  // const [ByPrmtId, setByPrmtId] = useState([]);
  // const [idPrmtId, setIdPrmtId] = useState([]);
  const [slList, setslList] = useState(0);
  const [select, setSelect] = useState([]);
  const [List, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSpecial, setDataSpecial] = useState([]);
  const [open, setOpenDialog] = useState(false);
  const [load, setUpload] = useState(false);
  const [refesh, setRefesh] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(10); // Items per page
  const [totalItems, setTotalItems] = useState(0);
  const [idDL, setidDL] = useState("");
  const [n_refresh, setn_refresh] = useState(false);
  const [alert, setAlert] = useState(false);

  const [openPopup, setPopupUpdate] = useState(false);

  const his = useHistory();
  const dateNow = new Date();

  useEffect(() => {
    // console.log("currentPage:", currentPage);
    LoadData();
    LoadDataNew();
    Datapakage();
    // TableListSpecial();
  }, [currentPage, pageSize]);

  const LoadDataNew = () => {
    setLoading(true);
    setdataTable([]);
    let newValue = isNaN(parseInt(slList.value)) ? 0 : parseInt(slList);
    let newValue2 = isNaN(parseInt(seletgroup.value))
      ? 0
      : parseInt(seletgroup.value);
    let newValue3 = getSpecial === "ທັງໝົດ" ? "all" : getSpecial;
    // let newValue4 = getNetwork === "ທັງໝົດ" ? "all" : getNetwork;
    // console.log("NewVlue:", newValue);
    AxiosReq.post(
      `api/Special_Package/QuerySpecialPkList?page=${currentPage}&limit=${pageSize}`,
      {
        prmtId: newValue,
      },
      {
        headers: header,
      }
    ).then((res) => {
      // console.log("dataList", res?.data);
      if (res.status === 200) {
        setLoading(false);
        setsavePage(savePage);
        setSpeciallist(res.data?.data);
        setTotalItems(res?.data?.total);
        // console.log("object", res?.data?.total);
      }
    });
  };

  useEffect(() => {
    if (isLoading !== "no") {
      DataPackageList();
    }
  }, [slList]);

  function getValueSepcial(e) {
    setslList(e.value);
    // console.log(e.value)
  }

  // console.log("onChangSelectpage: ", currentPage);

  //Show list selection special package list
  const options_Speciallist = List?.map((x) => ({
    value: x.prmtId,
    label: x.code,
  }));
  const LoadData = () => {
    AxiosReq.get("api/ListPrmtId",{
      headers: header
    }).then((res) => {
      if (res.status === 200) {
        setList(res?.data);
        // console.log("ShowList", res?.data);
      }
    });
  };

  const DataPackageList = () => {
    setSpeciallist();
    AxiosReq.post(
      `api/Special_Package/QueryByPrmtIdSpecialPK?prmt_id=${slList}`,{},
      {
        headers: header
      }
    ).then((res) => {
      if (res?.status === 200) {
        // console.log("---===>:", res);
        // setSelect(res);
        setSpeciallist(res?.data);
      }
    });
  };

  function getValueNetwork(e) {
    setGetNetwork(e.value);
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      fontSize: "15px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
    control: (base) => ({
      ...base,
      borderRadius: "7px",
      textAlign: "center",
    }),
  };

  const option_VIP = dataVIPType.map((x) => ({
    value: x.viptype,
    label: x.viptype,
  }));

  // const option_cate = dataCate.map((x) => ({
  //   value: x.id,
  //   label: x.catename,
  // }));

  const option_NetworkTpre = networkType.map((x) => ({
    value: x.viptype,
    label: x.viptype,
  }));

  const Datapakage = () => {
    // AxiosReq.get("ListPrmtId")
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setPK(res);
    //     }
    //   })
    //   .catch((er) => {
    //     console.log(er);
    //   });
  };

  // console.log("PrmtId", dataListPrmtId);
  // console.log("Sepeciallist", listSpecial);

  const Row = ({ data }) => {
    const [openTable, setOpenTable] = useState(false);

    const findMsisdn = (e) => {
      setOpenTable(!openTable);
    };

    // const viewSpecial = () => {
    //   his.push("/home/viewspecial");
    // };

    // console.log("List: ", dataTable);
    return (
      <>
        {isLoading ? (
          <Grid className="Loading loading-size  ">
            <Lottie
              loop
              animationData={Loading}
              play
              style={{ width: "300px", height: "300px" }}
            />
          </Grid>
        ) : (
          <Table style={{ marginTop: 15 }}>
            <TableHead className="head-table-Speciallis">
              <TableRow>
                <TableCell width={"10%"} align="center">
                  <u>ລ/ດ.</u>
                </TableCell>
                <TableCell width={"12%"}>
                  {" "}
                  <u>ປະເພດແພັກແກັດ</u>
                </TableCell>
                <TableCell width={"10%"} align="center">
                  <u>ເບີໂທ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີເລີ່ມ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີສິ້ນສຸດ</u>
                </TableCell>
                <TableCell width={"8%"}>
                  {" "}
                  <u>ເເຂວງ</u>{" "}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <u>ສະຖານະ</u>{" "}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <u>ຈັດການ</u>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            {data?.map((res, idx) => {
              // console.log("Special list=========: ", res);
              let numDay = moment
                .duration(moment(res?.stopTime).diff(moment(dateNow)))
                .asDays()
                .toFixed(0);

              return (
                <>
                  <TableBody>
                    <TableCell align="center" width={"10%"}>
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left" width={"10%"}>
                      {res?.prmtId}
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      {res?.msisdn}
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      {moment(res?.startTime).format("DD-MM-YYYY HH:mm:ss")}
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      {moment(res?.stopTime).format("DD-MM-YYYY HH:mm:ss")}
                    </TableCell>
                    <TableCell align="left" width={"10%"}>
                      {res?.province}
                    </TableCell>
                    <TableCell align="center">
                      {numDay > 0 ? (
                        <MDBBtn rounded color="info">
                          Active
                        </MDBBtn>
                      ) : (
                        <MDBBtn rounded color="danger">
                          Deactive
                        </MDBBtn>
                      )}
                    </TableCell>
                    <TableCell width={"15%"} align="center">
                      <MDBBtn
                        color="warning"
                        // sx={{textAlign}}
                        variant="contained"
                        size="sm"
                        // className="btn-view"
                        onClick={() => setPopupUpdate(true)}
                      >
                        <EditNote />
                      </MDBBtn>
                    </TableCell>
                  </TableBody>
                </>
              );
            })}
          </Table>
        )}
      </>
    );
  };

  //search by msisdn
  const TableMSISDN = ({ row }) => {
    const [openTable, setOpenTable] = useState(false);

    // console.log("List: ", dataTable);
    return (
      <>
        {isLoading ? (
          <Grid className="Loading loading-size">
            <Lottie
              loop
              animationData={Loading}
              play
              style={{ width: "300px", height: "300px" }}
            />
          </Grid>
        ) : (
          <Table style={{ marginTop: 15 }}>
            <TableHead className="head-table-Speciallis">
              <TableRow>
                <TableCell width={"10%"} align="center">
                  <u>ລ/ດ.</u>
                </TableCell>
                <TableCell width={"12%"}>
                  {" "}
                  <u>ປະເພດແພັກແກັດ</u>
                </TableCell>
                <TableCell width={"10%"} align="center">
                  <u>ເບີໂທ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີເລີ່ມ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີສິ້ນສຸດ</u>
                </TableCell>
                <TableCell width={"8%"}>
                  {" "}
                  <u>ເເຂວງ</u>{" "}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <u>ສະຖານະ</u>{" "}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <u>ຈັດການ</u>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            {row?.map((res, idx) => {
              // console.log("Row:---->:", res);
              let status;
              let numDay = moment
                .duration(moment(res?.stopTime).diff(moment(dateNow)))
                .asDays()
                .toFixed(0);

              return (
                <>
                  <TableBody>
                    <TableCell align="center" width={"10%"}>
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left" width={"10%"}>
                      {res?.prmtId}
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      {res?.msisdn}
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      {moment(res?.startTime).format("DD-MM-YYYY HH:mm:ss")}
                    </TableCell>
                    <TableCell align="center" width={"15%"}>
                      {moment(res?.stopTime).format("DD-MM-YYYY HH:mm:ss")}
                    </TableCell>
                    <TableCell align="left" width={"10%"}>
                      {res?.province}
                    </TableCell>
                    <TableCell align="center">
                      {numDay > 0 ? (
                        <MDBBtn rounded color="success">
                          Active
                        </MDBBtn>
                      ) : (
                        <MDBBtn rounded color="danger">
                          Deactive
                        </MDBBtn>
                      )}
                    </TableCell>
                    <TableCell width={"15%"} align="center">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <MDBBtn
                            color="success"
                            // sx={{textAlign}}
                            variant="contained"
                            size="sm"
                            // className="btn-view"
                            onClick={() => setPopupUpdate(true)}
                          >
                            <EditNote />
                          </MDBBtn>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableBody>
                </>
              );
            })}
          </Table>
        )}
      </>
    );
  };

  // console.log("All list", options_Speciallist);

  // console.log("List:", listSpecial);

  //Search by msisdn
  const HandleSearch = () => {
    setLoading(true);
    
    if (search === "") {
      LoadData();
    } else {
      // console.log("HHHeader", header);
      setLoading(true);

      AxiosReq.post(
        `api/Special_Package/QueryByMsisdnSpecialPK?msisdn=${search}`,{},
        { headers: header }
      ).then((res) => {
        // console.log({ res });
        if (res.status === 200) {
          setdataTable(res?.data?.data);
          setLoading(false);
        } else if (res.status === 400) {
          setTimeout(() => {
            setAlert(true);
          }, 200);
        } else {
          setTimeout(() => {
            setAlert(true);
          }, 200);
        }
      });
    }
  };

  // console.log("dataTable:", dataTable);
  useEffect(() => {
    HandleSearch();
  }, []);

  const HandleBack = (e) => {
    if (search === "") {
      LoadData();
    }
  };

  const handleCloseAlert = () => {
    setAlert(false);
  };

  const onImport = () => {
    his.push({pathname:"/home/importspecaillist", state: List});
  };

  const onAddNewSpeciallist = () =>{
    his.push({pathname: "/home/addnewspeciallist", state: List})
  }

  return (
    <>
      <DialogUpdateSpeciallist
        isShow={openPopup}
        onHide={(e) => setPopupUpdate(e)}
        addNew={(e) => {
          setRefesh(e);
        }}
        data={listSpecial}
        refresh={n_refresh}
        cb_refresh={(e) => setn_refresh(e)}
        funtionLoad={() => LoadDataNew()}
      />
      <DialogAddnewlist
        isShow={open}
        onHide={(e) => setOpenDialog(e)}
        addNew={(e) => {
          setRefesh(e);
        }}
        data={List}
      />
      <DialogUpload
        isShow={load}
        onHide={(e) => setUpload(e)}
        data={List}
        // addNew={(e) => {
        //   setRefesh(e);
        // }}
      />

      {alert && (
        <Alert
          className="alert-wrapper "
          variant="filled"
          severity="error"
          onClose={handleCloseAlert}
        >
          <u>ເບີຂອງທ່ານບໍ່ມີໃນລະບົບ !</u>
        </Alert>
      )}

      <Grid container className="head-model">
        <Grid className="main" item xs={12}>
          <u>ຂໍ້ມູນເບີເເພັກເກັດພິເສດ</u>
          <Grid item xs={12}>
            <div
              style={{ display: "flex", padding: ".5rem", marginTop: "20px" }}
              className="wapper-manage wapper2"
            >
              <Grid xs={5} style={{ paddingRight: "5px" }}>
                <div>
                  <p className="manage-ft-text ">ປະເພດແພັກແກັດ</p>
                  <OtherSelect
                    className="input-search"
                    options={options_Speciallist}
                    defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    styles={customStyles}
                    onChange={(e) => getValueSepcial(e)}
                  />
                </div>
              </Grid>

              <Grid xs={5} style={{ paddingRight: "5px" }}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <div>
                    <p className="manage-ft-text">ຄົ້ນຫາ</p>
                    <TextField
                      className="input-search "
                      sx={{
                        width: { sm: 150, md: 150 },
                        "& .MuiInputBase-root": {
                          height: 38,
                          borderRadius: "7px",
                          fontFamily: "Poppins, Noto Sans Lao",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconSearch />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="off"
                      id="standard-basic"
                      variant="outlined"
                      placeholder="20 5x xxx xxx"
                      onKeyUp={HandleBack}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div style={{ marginLeft: "1.5rem", marginTop: "1.5rem" }}>
                    <Button
                      variant="contained"
                      className="btn-search"
                      onClick={HandleSearch}
                    >
                      ຄົ້ນຫາ
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid xs={2} style={{ paddingRight: "5px" }}>
                {/* <div>
                  <p className="manage-ft-text">ປະເພດເບີ</p>
                  <OtherSelect
                    className="input-search"
                    options={option_NetworkTpre}
                    defaultValue={{ value: "all", label: "ທັງໝົດ" }}
                    // styles={customStyles}
                    onChange={(e) => getValueNetwork(e)}
                    isDisabled
                  />
                </div> */}
              </Grid>
              <Grid
                style={{ display: "flex" }}
                xs={12}
                className="right"
              >
                <Grid
                  item
                  xs={12}
                  className="bt-group-import floatRight pdr-20 right"
                >
                  <MDBBtn
                    className="me-1 mt-20"
                    color="success"
                    // onClick={() => setUpload(true)}
                    onClick={onImport}
                  >
                    Import Excel
                  </MDBBtn>
                  <MDBBtn
                    className="me-1 mt-20"
                    color="danger"
                    // onClick={() => setOpenDialog(true)}
                    onClick={onAddNewSpeciallist}
                  >
                    ເພິ່ມໃໝ່
                  </MDBBtn>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid className="list-phone-special">
            <Grid item xs={12}>
              <div style={{ display: "flex", padding: "1em", float: "right" }}>
                <div style={{ paddingTop: ".25rem" }}>
                  <Stack spacing={1}>
                    {/* <Pagination
                      count={allpage}
                      page={savePage === 1 ? 1 : savePage}
                      defaultPage={1}
                      siblingCount={0}
                      shape="rounded"
                      onChange={(e, x) => handlePage(x)}
                      // className="pagination"
                    /> */}
                    <Pagination
                      // defaultCurrent={}
                      showSizeChanger
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalItems}
                      onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                        // console.log(pageSize);
                      }}
                    />
                  </Stack>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                {search === "" ? (
                  <>
                    <Row data={listSpecial} />
                  </>
                ) : (
                  <>
                    <div>
                      <TableMSISDN row={dataTable} />
                    </div>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Speciallist;
