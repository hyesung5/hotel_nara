import React, { Component } from "react";
import "../css/ckEditor.css";
import "./hotel_regist.css";
import DaumPostcode from "react-daum-postcode";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import CkEditor from "../editor";

class hotel_regist extends Component {
  handelSubmit =()=>{
    const register=JSON.parse(localStorage.getItem("userInfo")).id;

    const formData = new FormData();
const {hotelName,hotelInfo,
  zonecode,
  addRess,
  addRess2,
  spa,
  restaurant,
  banquethall,
  parkinglot,
  buffet,
  desk,
  bar,
  Luggage,
  fitness,
  sauna,
  wifi,
  CoffeeShop,
  Paidlaundry,
  Smokingarea,
  Amenities,
  business,
  Breakfast,
  accommodation_type,
  location,
  thumbnail
}=this.props;



    let result = window.confirm("등록 하시겠습니까?");
    if(result){ 

      if(hotelName === ""){
          alert("업체명을 입력해주세요");
      }else if(zonecode===""){
        alert("주소를 검색해주세요");

      }else if(location === ""){
        alert("지역을 선택해주세요");

      }else if(accommodation_type === ""){
        alert("업소 종류를 선택해주세요");

      }else if(hotelInfo === ""){
        alert("호텔 소개를 입력해주세요");

      }else if(thumbnail === ""){
        alert("이미지는 필수 입니다.");
      }else{



    formData.append("hotelName", hotelName);
    formData.append("hotelInfo", hotelInfo);
    formData.append("zonecode", zonecode);
    formData.append("addRess", addRess);
    formData.append("addRess2",addRess2);
    formData.append("spa", spa);
    formData.append("restaurant", restaurant);
    formData.append("banquethall", banquethall);
    formData.append("parkinglot", parkinglot);
    formData.append("buffet", buffet);
    formData.append("desk", desk);
    formData.append("bar", bar);
    formData.append("Luggage", Luggage);
    formData.append("fitness",fitness);
    formData.append("sauna", sauna);
    formData.append("wifi", wifi);
    formData.append("CoffeeShop", CoffeeShop);
    formData.append("Paidlaundry", Paidlaundry);
    formData.append("Smokingarea", Smokingarea);
    formData.append("Amenities", Amenities);
    formData.append("business", business);
    formData.append("Breakfast", Breakfast);
    formData.append("accommodation_type", accommodation_type);
    formData.append("location", location);
    formData.append("register", register);
    formData.append("images", thumbnail)
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

 
     this.props.onHotelsubmit(formData, config);
    }
  }else{
    return
  }
  }


 
  onhandleChangeFile = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const file = e.target.files[0];
    const fileName = e.target.value;
    const {filechnage}= this.props;

    filechnage({key:name, file, fileName})
  };

  render() {
    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }

      this.props.onaddressChange(fullAddress, data.zonecode);
      this.props.onModalclose();
    
    };
    const {
      onhandleChenge,
      hotelName,
      addRess,
      addRess2,
      zonecode,
      oneditorChange,
      oncheckChange,
      Modalopen,
      onModalopen,
      onModalclose,
      location,
      accommodation_type,
      thumbnail,
      goBack
    } = this.props;
    return (
      <div style={{width:"55%", margin:"0 auto", background:"white"}}>
        <form  style={{marginLeft:"30px"}}>
         
          
          <div>

          <p>호텔명</p>
          <input
            type="text"
            name="hotelName"
            onChange={onhandleChenge}
            value={hotelName}
          />
          </div>
          <br />
          <div>
          <p>주소</p>

          <input
            type="text"
            className="zipcode"
            onChange={onhandleChenge}
            name="zonecode"
            value={zonecode}
          />
          <Button variant="contained" color="primary" onClick={onModalopen}>
            주소검색
          </Button>
          <br />
          <input
            type="text"
            readOnly={true}
            className="address"
            name="addRess"
            onChange={onhandleChenge}
            value={addRess}
          />

          <Dialog open={Modalopen} onClose={onModalclose}>
            <DialogTitle>주소검색</DialogTitle>
            <DialogContent>
              <DaumPostcode onComplete={handleComplete} />
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onModalclose}
                >
                  닫기
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          
          <br />
          <input
            className="address2"
            name="addRess2"
            onChange={onhandleChenge}
            value={addRess2}
          />
          </div>
         
          <div className="select_div">
          <label>지역
            <select className="regist_select" name="location" required value={location}   onChange={onhandleChenge}>
              <option >선택하세요</option>
              <option value="Seoul">서울</option>
              <option value="Gyeonggi" >경기</option>
              <option value="Incheon" >인천</option>
              <option value="Busan" >부산</option>
              <option value="Gangwon" >강원</option>
              <option value="Gyeongsang" >경상</option>
              <option value="Jeolla" >전라</option>
              <option value="Chungcheong" >충청</option>
              <option value="Jeju" >제주</option>
            </select>
            </label>
            <br/>
          
            <label> 숙박업소
            <select className="regist_select" name="accommodation_type" value={accommodation_type} onChange={onhandleChenge}>
              <option >선택하세요</option>
              <option value="HOTEL">호텔</option>
              <option value="MOTEL">모텔</option>
              <option value="GUEST_HOUSE">게스트하우스</option>
              <option value="CAMPSITE">캠핑장</option>
              <option value="PENSION">펜션</option>
            </select>
            </label>

          </div>
          <div>
          <p>호텔소개</p>
          <CkEditor handleChange={oneditorChange} />
          </div>
          <div>
          <p>편의 시설 및 테마</p>
          <ul>
            <li>
              <p>스파/월풀</p>
              <input
                name="spa"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="spa"
              />
            </li>
            <li>
              <p>레스토랑</p>
              <input
                name="restaurant"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="restaurant"
              />
            </li>
            <li>
              <p>연회장</p>
              <input
                name="banquethall"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="banquethall"
              />
            </li>
            <li>
              <p>주차가능</p>
              <input
                name="parkinglot"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="parkinglot"
              />
            </li>
            <li>
              <p>뷔페</p>
              <input
                name="buffet"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="buffet"
              />
            </li>
            <li>
              <p>24시간데스크</p>
              <input
                name="desk"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="desk"
              />
            </li>
            <li>
              <p>바</p>
              <input
                name="bar"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="bar"
              />
            </li>
            <li>
              <p>수화물보관</p>
              <input
                name="Luggage"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="Luggage"
              />
            </li>
            <li>
              <p>커피숍</p>
              <input
                name="CoffeeShop"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="CoffeeShop"
              />
            </li>
            <li>
              <p>유료세탁</p>
              <input
                name="Paidlaundry"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="Paidlaundry"
              />
            </li>
            <li>
              <p>흡연구역</p>
              <input
                name="Smokingarea"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="Smokingarea"
              />
            </li>
            <li>
              <p>어메니티</p>
              <input
                name="Amenities"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="Amenities"
              />
            </li>
            <li>
              <p>비지니스</p>
              <input
                name="business"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="business"
              />
            </li>
            <li>
              <p>피트니스</p>
              <input
                name="fitness"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="fitness"
              />
            </li>
            <li>
              <p>사우나</p>
              <input
                name="sauna"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="sauna"
              />
            </li>
            <li>
              <p>와이파이</p>
              <input
                name="wifi"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="wifi"
              />
            </li>
            <li>
              <p>조식운영</p>
              <input
                name="Breakfast"
                type="checkbox"
                readOnly
                onChange={oncheckChange}
                value="Breakfast"
              />
            </li>
          </ul>
          </div>
          <br />
          <div className="imgView">
                {/* Display all selected images. */}
                {thumbnail === "" ? "":
                    <img alt=""
                      className="modal_Img_view"
                      src={URL.createObjectURL(thumbnail)}
                    />
                  }
              </div>
              <div>
                <input
                  className="ck-hidden"
                  accept="image/*"
                  id="raised=button-file"
                  multiple
                  type="file"
                  name="thumbnail"
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

        </form>

        <div style={{textAlign:"center"}}>
            <button onClick={(e) => {e.preventDefault();  this.handelSubmit();}}>등록</button>
            &nbsp;
            &nbsp;
            <button onClick={goBack}>뒤로가기</button>
          </div>

      </div>
    );
  }
}

export default hotel_regist;
