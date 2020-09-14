import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../css/RoomList.css";
import { toArray } from "lodash";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class room_dialog extends Component {
  id = 0;
  state = {
    filelist: [],
    fileArray: null,
    imgfiles: [],
  };

  onhandleChangeFile = (e) => {

    e.preventDefault();
    const { filelist } = this.state;
    const files = e.target.files;
    const fileName = e.target.value;
    const file = e.target.files[0];

   if(e.target.files.length !== 0){
    this.setState({
      filelist: filelist.concat({ id: this.id++, file }),
    });
    this.props.onFilechange({ files, fileName });
  }
  };

  handleModalclose = (e) => {

    const { onModalclose } = this.props;
    this.setState({
      filelist: [],
      imgfiles: [],
    });
    onModalclose();
  };

  handleModifyModalclose = (e) => {

    const { onModyclose } = this.props;
    this.setState({
      filelist: [],
      imgfiles: [],
    });
    onModyclose();
  };


  handleSubmit = (e) => {
    e.preventDefault();

    const {
      hotel_name,
      room_name,
      room_info,
      reservationnotice,
      cancellationpolicy,
      checkin,
      checkout,
      price,
    } = this.props;
    if (hotel_name === "") {
      alert("호텔을 선택해주세요");
      return;
    } else if (room_name === "") {
      alert("방이름 란을 입력해주세요");
      return;
    } else if (room_info === "") {
      alert("방정보 란를 입력해주세요");
      return;
    } else if (reservationnotice === "") {
      alert("예약공지 란를 입력해주세요");
      return;
    } else if (cancellationpolicy === "") {
      alert("취소규정 란을 입력해주세요");
      return;
    } else if (checkin === "") {
      alert("체크인 시간 란을 입력해주세요");
      return;
    } else if (checkout === "") {
      alert("체크아웃 시간 란을 입력해주세요");
      return;
    } else if (price === "") {
      alert("가격 란을 입력해주세요");
      return;
    } else {
      const { onSubmitroom } = this.props;
      const { imgfiles } = this.props;
      const register = JSON.parse(localStorage.getItem("userInfo")).id;
      const formData = new FormData();

      let result = window.confirm("저장 하시겠습니까?");
      if(result){ 
      formData.append("room_name", this.props.room_name);
      formData.append("hotel_name", this.props.hotel_name.HOTEL_NAME);
      formData.append("room_info", this.props.room_info);
      formData.append("reservation_notice", this.props.reservationnotice);
      formData.append("cancellation_notice", this.props.cancellationpolicy);
      formData.append("check_in", this.props.checkin);
      formData.append("check_out", this.props.checkout);
      formData.append("price", this.props.price);
      formData.append("hotel_id", this.props.hotel_name.id);
      formData.append("hotel_location", this.props.hotel_name.LOCATION);
      formData.append(
        "hotel_accommodation_type",
        this.props.hotel_name.ACCOMMODATION_TYPE
      );
      formData.append("register", register);

      toArray(imgfiles).map((file) => formData.append("images", file.file));

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      onSubmitroom(formData, config);
    }else{

    }
    }
  };

  makeArray = (data) => {};

  createMarkupInfo = () => {
    return { __html: this.props.room_info };
  };
  createMarkupResev = () => {
    return { __html: this.props.reservationnotice };
  };
  createMarkupCancel = () => {
    return { __html: this.props.cancellationpolicy };
  };

  hnadelModify = () => {
    const formData = new FormData();
    const { imgfiles } = this.props;

    let result = window.confirm("수정 하시겠습니까?");
    if(result){ 
    formData.append("room_name", this.props.room_name);
    formData.append("room_info", this.props.room_info);
    formData.append("reservation_notice", this.props.reservationnotice);
    formData.append("cancellation_notice", this.props.cancellationpolicy);
    formData.append("check_in", this.props.checkin);
    formData.append("check_out", this.props.checkout);
    formData.append("price", this.props.price);
    formData.append("info_img", this.props.info_img);
    formData.append("room_id", this.props.room_id);

    toArray(imgfiles).map((file) => formData.append("images", file.file));

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { onModysubmit } = this.props;

    onModysubmit(formData, config);
  }else{

  }
  };

  handleNewimgdelste = (id) => {
    console.log(id);

    console.log(this.state.filelist);

    this.setState({
      filelist: this.state.filelist.filter((fi) => fi.id !== id),
    });
    const { onNewimgdelete } = this.props;

    onNewimgdelete(id);
  };

  render() {
    const {
      room_modal,
      onValuechange,
      room_name,
      room_info,
      reservationnotice,
      cancellationpolicy,
      checkin,
      checkout,
      price,
      onInfochange,
      onReservchange,
      onCanclechange,
      hotellist,
      hotel_name,
      onSelectchange,
      roominfo_modal,
      onInfoModalclose,
      info_img,
      onModyopen,
      mody_modal,
      onFiledelete,
      reslistclose,
      reservation_modal,
      reservation_list
    } = this.props;

    return (
 <div>
          <Dialog
            className="dialog_Modify"
            open={room_modal}
            onClose={this.handleModalclose}
          >
            <DialogTitle>방등록</DialogTitle>
            <DialogContent>
              <form className="form-product" encType="multipart/form-data">
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    호텔이름
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="hotel_name"
                    onChange={onSelectchange}
                    value={hotel_name}
                    label="호텔 이름"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {hotellist.map((hotel) => (
                      <MenuItem
                        value={
                          hotel.HOTEL_NAME === hotel_name.HOTEL_NAME
                            ? hotel_name
                            : hotel
                        }
                      >
                        {hotel.HOTEL_NAME}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <TextField
                  className="RoomNm"
                  label="방이름"
                  type="text"
                  name="room_name"
                  onChange={onValuechange}
                  value={room_name}
                  required
                />
                <br />
                <div className="imgView">
                  {/* Display all selected images. */}
                  {this.state.filelist &&
                    this.state.filelist.map((file, i) => (
                      <img
                      alt=""
                        key={i}
                        className="modal_Img_view"
                        src={URL.createObjectURL(file.file)}
                      />
                    ))}
                </div>
                <div>
                  <input
                    className="ck-hidden"
                    accept="image/*"
                    id="raised=button-file"
                    multiple
                    type="file"
                    onChange={this.onhandleChangeFile}
                  />
                  <label className="file_label" htmlFor="raised=button-file">
                    <Button
                      className="addImg"
                      variant="contained"
                      color="primary"
                      component="span"
                      name="imgfile"
                    >
                      이미지 추가
                    </Button>
                  </label>
                </div>
                <br />
                <InputLabel className="editor_Label">방정보</InputLabel>
                <CKEditor
                  data={room_info}
                  onChange={(event, editor) => {
                    onInfochange(editor.getData());
                  }}
                  editor={ClassicEditor}
                  config={{
                    removePlugins: ["ImageUpload", "MediaEmbed"],

                    // plugins:[EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload],
                    ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command
                      // You have to change this address to your server that has the ckfinder php connector
                      uploadUrl: "/uploads",
                    },
                  }}
                />
                <InputLabel className="editor_Label">예약공지</InputLabel>
                <CKEditor
                  data={reservationnotice}
                  onChange={(event, editor) => {
                    onReservchange(editor.getData());
                  }}
                  editor={ClassicEditor}
                  config={{
                    removePlugins: ["ImageUpload", "MediaEmbed"],
                    // plugins:[EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload],
                    ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command
                      // You have to change this address to your server that has the ckfinder php connector
                      uploadUrl: "/uploads",
                    },
                  }}
                />
                <InputLabel className="editor_Label">취소규정</InputLabel>
                <CKEditor
                  data={cancellationpolicy}
                  onChange={(event, editor) => {
                    onCanclechange(editor.getData());
                  }}
                  editor={ClassicEditor}
                  config={{
                    removePlugins: ["ImageUpload", "MediaEmbed"],
                    // plugins:[EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload],
                    ckfinder: {
                      // Upload the images to the server using the CKFinder QuickUpload command
                      // You have to change this address to your server that has the ckfinder php connector
                      uploadUrl: "/uploads",
                    },
                  }}
                />
                <br />
                <TextField
                  label="체크인 시간"
                  type="text"
                  name="checkin"
                  onChange={onValuechange}
                  value={checkin}
                  required
                />
                <br />
                <TextField
                  required
                  label="체크아웃 시간"
                  type="text"
                  name="checkout"
                  onChange={onValuechange}
                  value={checkout}
                />
                <br />
                <TextField
                  required
                  label="가격"
                  type="text"
                  name="price"
                  onChange={onValuechange}
                  value={price}
                />
                <br />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                저장
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleModalclose}
              >
                닫기
              </Button>
            </DialogActions>
          </Dialog>






          {/* 상세페이지 */}
          <Dialog
            className="dialog_Modify"
            open={roominfo_modal}
            onClose={onInfoModalclose}
          >
            <DialogTitle>상세 정보</DialogTitle>
            <DialogContent>
              <TextField
                id="outlined-read-only-input"
                label="호텔 이름"
                className="HotelNmField"
                defaultValue={hotel_name}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <br />
              <TextField
                id="outlined-read-only-input"
                label="방 이름"
                className="RoomNmField"
                defaultValue={room_name}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <br />

              <label>
                기본정보 :{" "}
                <div
                  dangerouslySetInnerHTML={this.createMarkupInfo()}
                  className="editor"
                />
              </label>
                <br />
              <label>
                예약공지 :{" "}
                <div
                  dangerouslySetInnerHTML={this.createMarkupResev()}
                  className="editor"
                ></div>
              </label>
              <br />
              <label>
                취소규정 :{" "}
                <div
                  dangerouslySetInnerHTML={this.createMarkupCancel()}
                  className="editor"
                ></div>
              </label>
              <br />
              <TextField
                id="outlined-read-only-input"
                label="체크인 시간"
                defaultValue={checkin}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="체크아웃 시간"
                defaultValue={checkout}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="가격"
                defaultValue={price}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
              <div className="infoImgview">
                {/* Display all selected images. */}
                {info_img &&
                  info_img.map((file, i = 1) => <img key={i} src={file} />)}
              </div>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={onModyopen}>
                수정
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={onInfoModalclose}
              >
                닫기
              </Button>
            </DialogActions>
          </Dialog>

          {/* 수정페이지 */}
          <Dialog className="dialog_Modify" open={mody_modal}>
            <DialogTitle>정보 수정 페이지</DialogTitle>
            <DialogContent>
              <form className="form-product" encType="multipart/form-data">
                <TextField
                  id="outlined-read-only-input"
                  label="호텔 이름"
                  className="HotelNmField"
                  defaultValue={hotel_name}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
                <br />
                <br />
                <TextField
                  className="RoomNm"
                  label="방이름"
                  type="text"
                  name="room_name"
                  value={room_name}
                  onChange={onValuechange}
                  required
                />
                <br />
                <div className="imgView">
                  {/* Display all selected images. */}
                  {info_img &&
                    info_img.map((file, i) => (
                      <Card className="cardroot" variant="outlined">
                        <CardContent>
                          <img key={i} className="modal_Img_view" src={file} />
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={(e) => {
                              e.preventDefault();
                              onFiledelete(file);
                            }}
                          >
                            삭제
                          </Button>
                        </CardActions>
                      </Card>
                    ))}
                  {this.state.filelist &&
                    this.state.filelist.map((file, i = 1) => (
                      <Card className="cardroot" variant="outlined">
                        <CardContent>
                          <img
                            key={i}
                            className="modal_Img_view"
                            src={URL.createObjectURL(file.file)}
                          />
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleNewimgdelste(file.id);
                            }}
                          >
                            삭제
                          </Button>
                        </CardActions>
                      </Card>
                    ))}
                </div>
                <div>
                  <input
                    className="ck-hidden"
                    accept="image/*"
                    id="raised=button-file"
                    multiple
                    type="file"
                    onChange={this.onhandleChangeFile}
                  />
                  <label className="file_label" htmlFor="raised=button-file">
                    <Button
                      className="addImg"
                      variant="contained"
                      color="primary"
                      component="span"
                      name="imgfile"
                    >
                      이미지 추가
                    </Button>
                  </label>
                </div>
                <br />

                <div className="infoImgview">
                </div>
                <br />
                <InputLabel className="editor_Label">방정보</InputLabel>
                <CKEditor
                  data={room_info}
                  onChange={(event, editor) => {
                    onInfochange(editor.getData());
                  }}
                  editor={ClassicEditor}
                  config={{
                    removePlugins: ["ImageUpload", "MediaEmbed"],
                  }}
                />
                <InputLabel className="editor_Label">예약공지</InputLabel>
                <CKEditor
                  data={reservationnotice}
                  onChange={(event, editor) => {
                    onReservchange(editor.getData());
                  }}
                  editor={ClassicEditor}
                  config={{
                    removePlugins: ["ImageUpload", "MediaEmbed"],
                  }}
                />
                <InputLabel className="editor_Label">취소규정</InputLabel>
                <CKEditor
                  data={cancellationpolicy}
                  onChange={(event, editor) => {
                    onCanclechange(editor.getData());
                  }}
                  editor={ClassicEditor}
                  config={{
                    removePlugins: ["ImageUpload", "MediaEmbed"],
                  }}
                />
                <br />
                <TextField
                  label="체크인 시간"
                  type="text"
                  name="checkin"
                  onChange={onValuechange}
                  value={checkin}
                  required
                />
                <br />
                <TextField
                  required
                  label="체크아웃 시간"
                  type="text"
                  name="checkout"
                  onChange={onValuechange}
                  value={checkout}
                />
                <br />
                <TextField
                  required
                  label="가격"
                  type="text"
                  name="price"
                  onChange={onValuechange}
                  value={price}
                />
                <br />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.hnadelModify();
                }}
              >
                저장
              </Button>
              <Button variant="contained" color="primary" onClick={() => {this.handleModifyModalclose()}}>
                닫기
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            className="dialog_Modify"
            open={reservation_modal}
            onClose={reslistclose}
          >
            <DialogTitle>예약 내역</DialogTitle>
            <DialogContent>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>예약자</TableCell>
                <TableCell>예약자 번호</TableCell>
                <TableCell>체크인</TableCell>
                <TableCell>체크아웃</TableCell>
                <TableCell>지불방법</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservation_modal === true ? reservation_list.map((c) => (
                  <TableRow>
                <TableCell>{c.RE_NAME}</TableCell>
                <TableCell>{c.RE_NUMBER}</TableCell>
                <TableCell>{c.RE_CHECKIN}</TableCell>
                  <TableCell>{c.RE_CHECKOUT}</TableCell>
                  <TableCell>{c.RE_PAYMENT}</TableCell>
                  </TableRow>
                  )): ""}
            </TableBody>
          </Table>

            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={()=> {reslistclose()}}
              >
                닫기
              </Button>
            </DialogActions>
          </Dialog>

    </div>
    );
  }
}

export default room_dialog;
