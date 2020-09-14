import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DaumPostcode from "react-daum-postcode";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from '@material-ui/core/TextField';


class profile extends Component {

  handleSubmit = () => {

if(this.f3() === true){

    const params = new URLSearchParams();
    params.append("user_id", this.props.user_id);
    params.append("gender", this.props.gender);
    params.append("year", this.props.year);
    params.append("month", this.props.month);
    params.append("day", this.props.day);
    params.append("phone", this.props.phone_number);
    params.append("zipcode", this.props.zipcode);
    params.append("address1", this.props.address1);
    params.append("address2", this.props.address2);



     const {onModified} = this.props;
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    onModified(params, config);

  }else{
    return
  }
   
  };

  f3 = () => {
    // 3. 확인,취소 알림창
    // 입력 결과값이 리턴된다. (확인 true, 취소 false)
   const result= window.confirm("수정하시겠습니까?")

   return result;
  }

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

      this.props.setaddress({zipcode: data.zonecode, address: fullAddress});
      this.props.mody_modal_close();
    };

    const { onBack, user_id, gender, phone_number, user_name, year, month, day, user_kinds, onhandleChange ,set_address,
      zipcode,
      address1,
      address2,
      mody_modal_open,
      mody_modal_close} = this.props;
    return (
      <div style={{width:"25%", margin:"0 auto"}}>


        <form style={{ padding: 10 }} >

<Card style={{ height: "690px"}}>
      <CardContent>
      <Typography  color="textSecondary" component="h2" variant="h5" gutterBottom>
      회원정보 수정
        </Typography>
        <Typography style={{
        fontSize:"17px",
        paddingTop:"5px"
      }} color="textSecondary">
               <TextField
                      name="user_id"
          label="아이디"
          type="text"
          variant="outlined"
          value={user_id}
          required
          readOnry
        
        />
        </Typography>
        <Typography style={{
        fontSize:"17px",
        paddingTop:"5px"
      }} color="textSecondary">
                       <TextField
                      name="user_name"
          label="이름"
          type="text"
          variant="outlined"
          value={user_name}
          required
          readOnry
        
        />
        </Typography>
        <Typography style={{
        fontSize:"17px",
        paddingTop:"5px"
      }} color="textSecondary">

<TextField
                      name="gender"
          label="성별"
          type="text"
          variant="outlined"
          value={gender === "1" ? "남":"여"} 
          required
          readOnry
        
        />
  
        </Typography>
        <Typography style={{
        fontSize:"17px",
        paddingTop:"5px"
      }} color="textSecondary">

<TextField
                      name="gender"
          label="생년월일"
          type="text"
          variant="outlined"
          value={year+'.'+month+'.'+day} 
          required
          readOnry
        
        />
        </Typography>
        <TextField
                      className="EnterZIPCODE"
                      name="zipcode"
          label="우편번호"
          type="text"
          variant="outlined"
          value={zipcode}
          required
          readOnry
        />
   <Button variant="contained" className="address_add_btn" color="secondary" onClick={mody_modal_open} >우편번호 검색</Button>
   <br/>


        <TextField
                      className="EnterADDRESS1"
                      name="address1"
          label="주소"
          type="text"
          variant="outlined"
          value={address1}
          required
          readOnry
        
        />
        <br/>
        <TextField
                      className="EnterADDRESS2"
                      name="address2"
          label="상세주소"
          type="text"
          variant="outlined"
          value={address2}
          onChange={onhandleChange}
        
        />
          <Dialog open={set_address}  onClose={mody_modal_close}>
            <DialogTitle>주소검색</DialogTitle>
            <DialogContent>
              <DaumPostcode onComplete={handleComplete} />
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={mody_modal_close}
                >
                  닫기
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

        <Typography style={{
        fontSize:"17px",
        paddingTop:"5px"
      }} color="textSecondary">

<TextField
                      className="EnterPHONE"
                      name="phone_number"
          label="전화번호"
          type="text"
          variant="outlined"
          value={phone_number}
          required
          onChange={onhandleChange}
        />
        </Typography>
        <Typography style={{
        fontSize:"17px",
        paddingTop:"5px"
      }} color="textSecondary" >
        <TextField
                      className="EnterUSERKIND"
                      name="user_kinds"
          label="회원종류"
          type="text"
          variant="outlined"
          value=  {user_kinds === '0' ? "일반회원" : "사업자"}
          required
          readOnry
        
        />

        </Typography>
      </CardContent>
      <CardActions>
        <div  style={{margin: "0 auto"}}>
      <Button variant="contained" color="primary" onClick={this.handleSubmit}>수정하기</Button>
            <Button variant="contained" color="primary" onClick={onBack}>뒤로가기</Button>
            </div>
      </CardActions>
    </Card>
        </form>
      </div>
    );
  }
}

export default profile;
