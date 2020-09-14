import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import imgSpa from "../../image/spa.png";
import imgRestaurant from "../../image/restaurant.png";
import imgBanquethall from "../../image/banquethall.png";
import imgParkinglot from "../../image/parkinglot.png";
import imgBuffet from "../../image/buffet.png";
import imgDesk from "../../image/desk.png";
import imgBar from "../../image/bar.png";
import imgLuggage from "../../image/luggage.png";
import imgFitness from "../../image/fitness.png";
import imgSauna from "../../image/sauna.png";
import imgWifi from "../../image/wifi.png";
import imgCoffeeshop from "../../image/coffeeshop.png";
import imgPaidlaundry from "../../image/paidlaundry.png";
import imgSmokingarea from "../../image/smokingarea.png";
import imgAmenities from "../../image/amenities.png";
import imgBusiness from "../../image/business.png";
import imgBreakfast from "../../image/breakfast.png";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

class hotel_list_dialog extends Component {
  handleView = (name) => {
    const params = new URLSearchParams();

    params.append("hotel_name", name);
  };
  createMarkup = () => {
    return { __html: this.props.hotelIf };
  };

  handleModify = () => {


    let result = window.confirm("수정 하시겠습니까?");
    if(result){ 

      const {filechk} = this.props;


    const formData = new FormData();


    if(this.props.thumbnail=== ""){
      alert("이미지는 필수입력 항목입니다.");
    }else{
      
    formData.append("hotel_id", this.props.hotel_id);
    formData.append("hotelname", this.props.hotelNm);
    formData.append("hotelinfo", this.props.hotelIf);
    formData.append("zipcode", this.props.hotelZip);
    formData.append("address1", this.props.hotelAdd1);
    formData.append("address2", this.props.hotelAdd2);
    formData.append("spa", this.props.spa);
    formData.append("restaurant", this.props.restaurant);
    formData.append("banquethall", this.props.banquethall);
    formData.append("parkinglot", this.props.parkinglot);
    formData.append("buffet", this.props.buffet);
    formData.append("desk", this.props.desk);
    formData.append("bar", this.props.bar);
    formData.append("luggage", this.props.luggage);
    formData.append("fitness", this.props.fitness);
    formData.append("sauna", this.props.sauna);
    formData.append("wifi", this.props.wifi);
    formData.append("coffeeshop", this.props.coffeeshop);
    formData.append("paidlaundry", this.props.paidlaundry);
    formData.append("smokingarea", this.props.smokingarea);
    formData.append("amenities", this.props.amenities);
    formData.append("business", this.props.business);
    formData.append("breakfast", this.props.breakfast);
    if(filechk === false){
      formData.append("filechk", filechk);
      formData.append("origonal_thumbnail", this.props.thumbnail);
   
    }else{
      formData.append("filechk", filechk);
    formData.append("images", this.props.thumbnail);
  }
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { hotelInfomodify } = this.props;

    hotelInfomodify(formData, config);
  }

  }else{

  }
  };

  render() {
    const {
      onClose,
      infoView,
      hotelNm,
      hotelTel,
      hotelZip,
      hotelAdd1,
      hotelAdd2,
      spa,
      restaurant,
      banquethall,
      parkinglot,
      buffet,
      desk,
      bar,
      luggage,
      fitness,
      sauna,
      wifi,
      coffeeshop,
      paidlaundry,
      smokingarea,
      amenities,
      business,
      breakfast,
      infomodify,
      closeModify,
      onMody,
      hotelIf,
      onChangeValue,
      onChangeEditor,
      onChangeCheck,
      thumbnail,
      onFileChange,
      filedelete,
      filechk
    } = this.props;
    return (
        <div>
          <Dialog className="dialog_Modify" open={infoView} onClose={onClose}>
            <DialogTitle>상세보기</DialogTitle>
            <DialogContent>
              {hotelNm} <br />
              <div
                dangerouslySetInnerHTML={this.createMarkup()}
                className="editor"
              ></div>
              {thumbnail !== "" ? (
                <img style={{ width: 200 }} src={thumbnail} alt="thumbnail"/>
              ) : (
                ""
              )}
              {hotelTel} <br />
              {hotelZip} <br />
              {hotelAdd1} <br />
              {hotelAdd2} <br />
              <div>
                {spa === "true" ? <img src={imgSpa} alt="imgSpa" /> : ""}
                {restaurant === "true" ? <img src={imgRestaurant} alt="imgRestaurant" /> : ""}
                {banquethall === "true" ? <img src={imgBanquethall} alt="imgBanquethall" /> : ""}
                {parkinglot === "true" ? <img src={imgParkinglot} alt="imgParkinglot" /> : ""}
                {buffet === "true" ? <img src={imgBuffet} alt="imgBuffet" /> : ""}
                {desk === "true" ? <img src={imgDesk} alt="imgDesk" /> : ""}
                {bar === "true" ? <img src={imgBar} alt="imgBar" /> : ""}
                {luggage === "true" ? <img src={imgLuggage} alt="imgLuggage" /> : ""}
                {fitness === "true" ? <img src={imgFitness} alt="imgFitness" /> : ""}
                {sauna === "true" ? <img src={imgSauna} alt="imgSauna" /> : ""}
                {wifi === "true" ? <img src={imgWifi} alt="imgWifi" /> : ""}
                {coffeeshop === "true" ? <img src={imgCoffeeshop} alt="imgCoffeeshop" /> : ""}
                {paidlaundry === "true" ? <img src={imgPaidlaundry} alt="imgPaidlaundry" /> : ""}
                {smokingarea === "true" ? <img src={imgSmokingarea} alt="imgSmokingarea" /> : ""}
                {amenities === "true" ? <img src={imgAmenities} alt="imgAmenities" /> : ""}
                {business === "true" ? <img src={imgBusiness} alt="imgBusiness" /> : ""}
                {breakfast === "true" ? <img src={imgBreakfast} alt="imgBreakfast" /> : ""}
              </div>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    infomodify();
                  }}
                >
                  수정
                </Button>
                <Button variant="contained" color="primary" onClick={onClose}>
                  닫기
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <Dialog open={onMody} onClose={closeModify}>
            <DialogTitle>수정 페이지</DialogTitle>
            <DialogContent>
              <TextField
                label="호텔명"
                type="text"
                name="hotelNm"
                value={hotelNm}
                onChange={onChangeValue}
              />
              <br />
              <CKEditor
                data={hotelIf}
                onInit={(editor) =>
                  console.log("Editor is ready to use!", editor)
                }
                onChange={(event, editor) => {
                  onChangeEditor(editor.getData());
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", { event, editor });
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", { event, editor });
                }}
                editor={ClassicEditor}
                config={{
                  ckfinder: {
                    uploadUrl: "/uploads",
                  },
                }}
              />
              <br />
              <TextField
                label="호텔 우편번호"
                type="text"
                name="hotelZip"
                value={hotelZip}
                onChange={onChangeValue}
              />
              <br />
              <TextField
                label="호텔 주소"
                type="text"
                name="hotelAdd1"
                value={hotelAdd1}
                onChange={onChangeValue}
              />
              <br />
              <TextField
                label="호텔 주소2"
                type="text"
                name="hotelAdd2"
                value={hotelAdd2}
                onChange={onChangeValue}
              />
              <br />
              <label>스타/월풀</label>
              <input
                type="checkbox"
                name="spa"
                defaultChecked={spa === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>레스토랑</label>
              <input
                type="checkbox"
                name="restaurant"
                defaultChecked={restaurant === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>연회장</label>
              <input
                type="checkbox"
                name="banquethall"
                defaultChecked={banquethall === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>주차징</label>
              <input
                type="checkbox"
                name="parkinglot"
                defaultChecked={parkinglot === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>뷔페</label>
              <input
                type="checkbox"
                name="buffet"
                defaultChecked={buffet === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>24시 안내 데스크</label>
              <input
                type="checkbox"
                name="desk"
                defaultChecked={desk === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>바</label>
              <input
                type="checkbox"
                name="bar"
                defaultChecked={bar === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <br />
              <label>짐보관</label>
              <input
                type="checkbox"
                name="luggage"
                defaultChecked={luggage === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>피트니스</label>
              <input
                type="checkbox"
                name="fitness"
                defaultChecked={fitness === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>사우나</label>
              <input
                type="checkbox"
                name="sauna"
                defaultChecked={sauna === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>와이파이</label>
              <input
                type="checkbox"
                name="wifi"
                defaultChecked={wifi === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>커피샵</label>
              <input
                type="checkbox"
                name="coffeeshop"
                defaultChecked={coffeeshop === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>유료세탁</label>
              <input
                type="checkbox"
                name="paidlaundry"
                defaultChecked={paidlaundry === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>흡연구역</label>
              <input
                type="checkbox"
                name="smokingarea"
                defaultChecked={smokingarea === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <br />
              <label>어메니티</label>
              <input
                type="checkbox"
                name="amenities"
                defaultChecked={amenities === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>비지니스</label>
              <input
                type="checkbox"
                name="business"
                defaultChecked={business === "true" ? true : false}
                onChange={onChangeCheck}
              />
              <label>조식</label>
              <input
                type="checkbox"
                name="breakfast"
                defaultChecked={breakfast === "true" ? true : false}
                onChange={onChangeCheck}
              />

              {/* Display all selected images. */}
              {thumbnail && thumbnail !== "" ? (
                <div>
                  <Card className="cardroot" variant="outlined">
                    <CardContent>
                      {filechk === false ? (
                        <img className="modal_Img_view" src={thumbnail} alt="thumbnail" />
                      ) : (
                        <img
                          className="modal_Img_view"
                          src={URL.createObjectURL(thumbnail)}
                          alt="thumbnail"
                        />
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.preventDefault();
                          filedelete();
                        }}
                      >
                        삭제
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ) : (
                <div>
                  <input
                    className="ck-hidden"
                    accept="image/*"
                    id="raised=button-file"
                    multiple
                    type="file"
                    name="thumbnail"
                    onChange={onFileChange}
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
              )}
            </DialogContent>

            <br />
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleModify}
              >
                저장
              </Button>
              <Button variant="contained" color="primary" onClick={closeModify}>
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}

export default hotel_list_dialog;
