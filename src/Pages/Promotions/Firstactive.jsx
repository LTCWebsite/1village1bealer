import React, { useState, useEffect, useRef } from "react";
import { Grid, Table, TableCell, TableHead } from "@mui/material";
import { IconSearch } from "../Icon/Icon";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { USER_KEY } from "../../Constants";
import {
  Add,
  DeleteForever,
  EditNote,
  Pages,
  Visibility,
} from "@mui/icons-material";
import AxiosReq from "../../Components/Axios/AxiosReq";
import DialogFirstAc from "../Dialog/DialogFirstAc";
import { Pagination } from "antd";
import Lottie from "react-lottie-player";
import Loading from "../../Image/Lottie/Loading.json";
import DialogDelete from "../Dialog/DialogDelete";
import { Toast } from "primereact/toast";

function Firstactive() {
  // const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const token = localStorage.getItem("Token")
  const header = {
    Authorization: `Bearer ${token}`,
  };

  // console.log("TKEN:", token)

  // console.log("Token: ", header)
  // const userName = tokenData.user[0].value;
  const [getVIP, setGetVIP] = useState("all");
  const [dataVIPType, setDataVIPType] = useState([]);
  const [getNetwork, setGetNetwork] = useState("all");
  const [networkType, setnetworkType] = useState([]);
  const [savePage, setsavePage] = useState(1);
  const history = useHistory();
  const [allpage, setAllpage] = useState(0);
  const [perPage] = useState(10);
  const [seletgroup, setseletgroup] = useState({ value: 0, label: "ທັງໝົດ" });
  const [selectCate, setSelectCate] = useState(0);
  const [dataTable, setdataTable] = useState([]);
  const [loading, setloading] = useState(true);
  const [emptyPage, setEmptyPage] = useState(false);
  const [dataFirst, setDataFirst] = useState(false);
  const [alldata, setAlldata] = useState([]);
  const [dataPackage, setDataPackage] = useState([]);
  const [refesh, setRefesh] = useState(false);
  const [load, setUpload] = useState(false);
  const [close, setClose] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(10); // Items per page
  const [totalItems, setTotalItems] = useState(0);
  const [slList, setslList] = useState(0);
  const [listSpecial, setSpeciallist] = useState([]);
  const [search, setSearch] = useState("");
  const [Delete, setDelete] = useState(false);
  const [idDL, setidDL] = useState("");
  const [n_refresh, setn_refresh] = useState(false);
  const dateNow = new Date();
  const toast = useRef();

  useEffect(() => {
    LoadDataNew();
    HandleSearch();
  }, [currentPage, pageSize, n_refresh]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     HandleSearch();
  //   }, 500);
  // }, [n_refresh]);

  // console.log("Delete", Delete);
  const LoadDataNew = () => {
    setDataPackage([]);
    setLoading(true);

    // AxiosReq.get(
    //   `/api/QueryFistac`,
    //   { headers: header },
    //   { username: `${userName}` }
    // ).then((res) => {
    //   // console.log("Data first active: ", res);
    //   if (res.status === 200) {
    //     setLoading(false);
    //     setSpeciallist(res?.data);
    //     console.log("dataPackage", res?.data);
    //     // setTimeout(() => {
    //     //   setloading(false);
    //     // }, 800);
    //     // setAllpage(ceil(res.data.total / pageSize));
    //   }
    // });

    let newValue = isNaN(parseInt(slList.value)) ? 0 : parseInt(slList);

    // console.log("Page:", pageSize);
    AxiosReq.post(
      `api/PaginationFirst/QueryPagination?page=${currentPage}&limit=${pageSize}`,
      {
        prmtId: newValue,
      },
      { headers: header }
    ).then((res) => {
      // console.log("dataList", res?.data);
      if (res.status === 200) {
        setLoading(false);
        setsavePage(savePage);
        setSpeciallist(res.data?.data);
        setTotalItems(res?.data?.total);
        setDelete(res?.data?.msisdn);
      }
    });
  };

  //Search by msisdn
  const HandleSearch = () => {
    setLoading(true);
    if (search === "") {
      LoadDataNew();
    } else {
      // console.log(search);
      // setdataTable([]);

      AxiosReq.get(
        `api/CheckNumberFirstac/CheckNumberFirstac?msisdn=${search}`,
        {
          headers: header,
        }
      )
        .then((res) => {
          // console.log({ res });
          if (res.status === 200) {
            setDataPackage(res?.data);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          toast.current.show({
            severity: "warn",
            summary: "ຍັງ".toUpperCase(),
            detail: "ເບີນີ້ຍັງບໍ່ທັນໄດ້ເປີດນຳໃຊ້ເບີໃຫມ່ !",
            life: 1000,
          });
        });
    }
  };

  // console.log("package:", dataPackage);

  const Row = ({ data }) => {
    const [openTable, setOpenTable] = useState(false);

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
                <TableCell width={"8%"} align="center">
                  <u>ລ/ດ.</u>
                </TableCell>
                <TableCell width={"10%"}>
                  {" "}
                  <u>ປະເພດເບີ</u>
                </TableCell>
                <TableCell align="center" width={"10%"}>
                  {" "}
                  <u>ເບີໂທ</u>
                </TableCell>
                {/* <TableCell width={"8%"} align="center">
                <u></u>
              </TableCell> */}
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີເລີ່ມ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີສິ້ນສຸດ</u>
                </TableCell>
                {/* <TableCell width={"10%"}>
                {" "}
                <u>ເເຂວງ, ເມືອງ</u>
              </TableCell> */}
                <TableCell align="center">
                  <u>ສະຖານະ</u>
                </TableCell>
                <TableCell>VGS Err</TableCell>
                <TableCell>OCS Err</TableCell>
                <TableCell align="center">
                  {" "}
                  <u>ຈັດການ</u>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            {/* {console.log("Data search: ", data)} */}
            {data?.map((res, idx) => {
              let status;
              let numDay = moment
                .duration(moment(res?.stopTime).diff(moment(dateNow)))
                .asDays()
                .toFixed(0);

              return (
                <>
                  {isLoading ? (
                    <Grid container className="Loading loading-size  ">
                      <Grid item xs={12}>
                        <div className="Loading-center">
                          <Lottie
                            loop
                            animationData={Loading}
                            play
                            style={{ width: "300px", height: "300px" }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  ) : (
                    <TableRow>
                      <TableCell align="center">{idx + 1}</TableCell>
                      <TableCell>{res?.subcode_id}</TableCell>
                      <TableCell align="center">{res?.msisdn}</TableCell>
                      <TableCell align="center">{res?.active_date}</TableCell>
                      <TableCell align="center">{res?.record_date}</TableCell>
                      <TableCell align="center">{res?.status}</TableCell>
                      <TableCell>{res?.vgs_err}</TableCell>
                      <TableCell>{res?.ocs_err}</TableCell>

                      <TableCell textAlign="center">
                        <Grid container spacing={2}>
                          {/* <Grid item xs={5} className="btn-view">
                    <MDBBtn
                      color="success"
                      // sx={{textAlign}}
                      variant="contained"
                      size="sm"
                      // className="btn-view"
                      // onClick={viewSpecial}
                    >
                      <Visibility className="icon-view" />
                    </MDBBtn>
                  </Grid> */}
                          <Grid item xs={12}>
                            <div className="optionS">
                              <MDBBtn
                                color="danger"
                                // sx={{textAlign}}
                                variant="contained"
                                size="sm"
                                // className="btn-view"
                                onClick={() => {
                                  setidDL(res?.msisdn);
                                  setDialogDelete(true);
                                }}
                              >
                                <DeleteForever />
                              </MDBBtn>
                            </div>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </Table>
        )}
      </>
    );
  };

  const TableFirstactive = ({ data }) => {
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
                <TableCell width={"8%"} align="center">
                  <u>ລ/ດ.</u>
                </TableCell>
                <TableCell width={"10%"}>
                  {" "}
                  <u>ປະເພດເບີ</u>
                </TableCell>
                <TableCell align="center" width={"10%"}>
                  {" "}
                  <u>ເບີໂທ</u>
                </TableCell>
                {/* <TableCell width={"8%"} align="center">
            <u></u>
          </TableCell> */}
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີເລີ່ມ</u>
                </TableCell>
                <TableCell width={"15%"} align="center">
                  <u>ວັນທີສິ້ນສຸດ</u>
                </TableCell>
                {/* <TableCell width={"10%"}>
            {" "}
            <u>ເເຂວງ, ເມືອງ</u>
          </TableCell> */}
                <TableCell align="center">
                  <u>ສະຖານະ</u>
                </TableCell>
                <TableCell>VGS Err</TableCell>
                <TableCell>OCS Err</TableCell>
                <TableCell align="center">
                  {" "}
                  <u>ຈັດການ</u>{" "}
                </TableCell>
              </TableRow>
            </TableHead>

            {data?.map((res, idx) => {
              // console.log("res:", res);
              return (
                <>
                  {isLoading ? (
                    <Grid container className="Loading loading-size  ">
                      <Grid item xs={12}>
                        <div className="Loading-center">
                          <Lottie
                            loop
                            animationData={Loading}
                            play
                            style={{ width: "300px", height: "300px" }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  ) : (
                    <TableRow>
                      <TableCell align="center">{idx + 1}</TableCell>
                      <TableCell>{res?.subcode_id}</TableCell>
                      <TableCell align="center">{res?.msisdn}</TableCell>
                      <TableCell align="center">{res?.active_date}</TableCell>
                      <TableCell align="center">{res?.record_date}</TableCell>
                      <TableCell align="center">{res?.status}</TableCell>
                      <TableCell>{res?.vgs_err}</TableCell>
                      <TableCell>{res?.ocs_err}</TableCell>

                      <TableCell textAlign="center">
                        <Grid container spacing={2}>
                          {/* <Grid item xs={5} className="btn-view">
            <MDBBtn
              color="success"
              // sx={{textAlign}}
              variant="contained"
              size="sm"
              // className="btn-view"
              // onClick={viewSpecial}
            >
              <Visibility className="icon-view" />
            </MDBBtn>
          </Grid> */}
                          <Grid item xs={12}>
                            <div className="optionS">
                              <MDBBtn
                                color="danger"
                                // sx={{textAlign}}
                                variant="contained"
                                size="sm"
                                // className="btn-view"
                                onClick={() => {
                                  setidDL(res?.msisdn);
                                  setDialogDelete(true);
                                }}
                              >
                                <DeleteForever />
                              </MDBBtn>
                            </div>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </Table>
        )}
      </>
    );
  };

  return (
    <>
      <Toast ref={toast} position={"top-right"} style={{ marginTop: 100 }} />

      <DialogDelete
        isShow={dialogDelete}
        onHide={(e) => setDialogDelete(e)}
        addNew={(e) => {
          setRefesh(e);
        }}
        data={idDL}
        refresh={n_refresh}
        cb_refresh={(e) => setn_refresh(e)}
      />
      <DialogFirstAc
        isShow={load}
        onHide={(e) => setUpload(e)}
        addNew={(e) => {
          setRefesh(e);
        }}
        data={dataPackage}
      />
      {/* <DialogUpload
        isShow={load}
        onHide={(e) => setUpload(e)}
        addNew={(e) => {
          setRefesh(e);
        }}
        data={dataPackage}
      /> */}
      <Grid container className="head-model">
        <Grid className="main" item xs={12}>
          <u>ຂໍ້ມູນເບີເເພັກເກັດພິເສດ</u>
          <Grid xs={12}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", padding: ".5rem", marginTop: "20px" }}
              className="wapper-manage "
            >
              <Grid xs={12}>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <div>
                    <p className="manage-ft-text">ຄົ້ນຫາ</p>
                    <TextField
                      type="number"
                      className="input-search "
                      sx={{
                        width: { sm: 300, md: 400 },
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
                      placeholder="205xxxxxxx"
                      // onKeyUp={HandleBack}
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
              <Grid
                style={{
                  display: "flex",
                  marginTop: "5px",
                }}
                xs={12}
              >
                <Grid xs={12} className="bt-group-import floatRight pdr-20">
                  {/* <MDBBtn
                    className=" mt-20 btn-import"
                    color="success"
                    size="sm"
                    onClick={() => setUpload(true)}
                  >
                    <Add /> Import Excel
                  </MDBBtn> */}
                  <MDBBtn
                    className="me-1 mt-20"
                    color="success"
                    onClick={() => setUpload(true)}
                  >
                    Import Excel
                  </MDBBtn>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="list-phone-special">
            <Grid item xs={12}>
              <div style={{ display: "flex", padding: "1em", float: "right" }}>
                <div style={{ paddingTop: ".25rem" }}>
                  <Stack spacing={1}>
                    <Pagination
                      // defaultCurrent={}
                      showSizeChanger
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalItems}
                      onChange={(page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                        // console.log("PageFirst", pageSize);
                      }}
                    />
                  </Stack>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                {search == "" ? (
                  <>
                    <TableFirstactive data={listSpecial} />
                  </>
                ) : (
                  <>
                    <div>
                      <Row data={dataPackage} />
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

export default Firstactive;
