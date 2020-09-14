import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DaumPostcode from "react-daum-postcode";

class dialog extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    let result = window.confirm("수정 하시겠습니까?");
    if (result) {
      const params = new URLSearchParams();
      params.append("user_id", this.props.user_id);
      params.append("user_name", this.props.user_name);
      params.append("password", this.props.password);
      params.append("gender", this.props.gender);
      params.append("year", this.props.year);
      params.append("month", this.props.month);
      params.append("day", this.props.day);
      params.append("phone_number", this.props.phone_number);
      params.append("user_kinds", this.props.user_kinds);
      params.append("zipcode", this.props.zipcode);
      params.append("address1", this.props.address1);
      params.append("address2", this.props.address2);
      // 파일이 있는 데이터를 보낼때는 파ㅏ일 형식에 맞는 타입을 지정해 주어야 한다.
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const id_chk = this.checkId(this.props.user_id);
      const hangul_chk = this.checkHangul(this.props.user_name);
      const pw_chk = this.checkPassword(
        this.props.password,
        this.props.user_id
      );
      const phone_chk = this.checkPhone(this.props.phone_number);
      if (id_chk === true) {
        if (hangul_chk === true) {
          if (this.props.checked === 0) {
            if (pw_chk === true) {
              if (phone_chk === true) {
                if (this.props.user_kinds === "") {
                  alert("회원을 선택해주세요");
                } else {
                  if (this.props.zipcode === "") {
                    alert("우편번호를 입력해주세요");
                  } else {
                    if (this.props.address1 === "") {
                      alert("주소를 입력해주세요");
                    } else {
                      alert("가입");

                      this.props.addCustomer(params, config);
                    }
                  }
                }
              }
            }
          } else {
            alert("아이디 중복체크를 해주세요");
          }
        }
      }
    }
  };

  checkHangul(text) {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (korean.test(text)) {
      return true;
    } else {
      alert("이름은 한글만 입력 가능합니다.");
      return false;
    }
  }

  checkPassword(password, id) {
    if (!/^[a-zA-Z0-9]{8,12}$/.test(password)) {
      alert("숫자와 영문자 조합으로 8~12자리를 사용해야 합니다.");
      return false;
    }
    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/gi);

    if (checkNumber < 0 || checkEnglish < 0) {
      alert("숫자와 영문자를 혼용하여야 합니다.");
      return false;
    }

    if (/(\w)\1\1\1/.test(password)) {
      alert("444같은 문자를 4번 이상 사용하실 수 없습니다.");
      return false;
    }

    if (password.search(id) > -1) {
      alert("비밀번호에 아이디가 포함되었습니다.");
      return false;
    }
    return true;
  }

  checkPhone = (phoneNumber) => {
    var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;

    if (regExp.test(phoneNumber)) {
      return true;
    } else {
      alert("전화번호 형식이 맞지않습니다.");
      return false;
    }
  };

  checkId = (id) => {
    const regExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,11}$/;
    if (regExp.test(id)) {
      return true;
    } else {
      alert("아이디는 영 소문자, 숫자 4~11자리로 입력해주세요.");
      return false;
    }
  };

  handleModify = (e) => {
    let result = window.confirm("수정 하시겠습니까?");
    if (result) {
      const { Customermodify } = this.props;
      e.preventDefault();
      const params = new URLSearchParams();
      params.append("user_id", this.props.user_id);
      params.append("name", this.props.user_name);
      params.append("gender", this.props.gender);
      params.append("year", this.props.year);
      params.append("month", this.props.month);
      params.append("day", this.props.day);
      params.append("phone", this.props.phone_number);
      params.append("user_kinds", this.props.user_kinds);
      params.append("zipcode", this.props.zipcode);
      params.append("address1", this.props.address1);
      params.append("address2", this.props.address2);
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      Customermodify(params, config);
    }
  };

  Duplicate_check = () => {
    const params = new URLSearchParams();
    params.append("user_id", this.props.user_id);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    this.props.addIdchk(params, config);
  };

  handlePwChange = (id) => {
    const { passwordmodify } = this.props;

    const params = new URLSearchParams();
    params.append("user_id", id);
    params.append("new_password", this.props.change_pw);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    this.props.addIdchk(params, config);

    passwordmodify(params, config);
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

      this.props.set_address({ zipcode: data.zonecode, address: fullAddress });

      this.props.postDialogclose();
    };

    const {
      user_id,
      password,
      password_check,
      gender,
      phone_number,
      user_name,
      checked,
      year,
      month,
      day,
      user_kinds,
      zipcode,
      address1,
      address2,
      addDialogclose,
      handleChange,
      add_modal,
      post_modal,
      postDialogopen,
      postDialogclose,
      info_modal,
      info_close,
      customer_modify,
      modify_open,
      modify_close,
      pwd_modify,
      pwd_close,
      pw_id,
      change_pw,
      change_pw_chk,
    } = this.props;
    return (
      <div>
        <Dialog open={add_modal}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <div>
              <TextField
                className="EnterID"
                name="user_id"
                id="filled-id-input"
                label="아이디"
                type="text"
                variant="outlined"
                value={user_id}
                onChange={handleChange}
                required
              />
              <Button
                className="id_chk_btn"
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.Duplicate_check(user_id);
                }}
              >
                아이디 체크
              </Button>
              {checked === 0 ? (
                <div style={{ color: "red" }}>사용가능한 아이디입니다.</div>
              ) : checked === 1 ? (
                <div style={{ color: "red" }}>사용불가능한 아이디 입니다.</div>
              ) : (
                ""
              )}
            </div>
            <div>
              <TextField
                className="EnterNAME"
                name="user_name"
                id="filled-name-input"
                label="이름"
                type="text"
                variant="outlined"
                value={user_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField
                className="EnterPASSWORD"
                name="password"
                id="filled-password-input"
                label="비밀번호"
                type="password"
                variant="outlined"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField
                className="EnterPASSWORD_chk"
                name="password_check"
                id="filled-passwordchk-input"
                label="비밀번호 체크"
                type="password"
                variant="outlined"
                value={password_check}
                onChange={handleChange}
                required
              />
              {password_check !== password && (
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </div>
            <div>
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
              <Button
                variant="contained"
                className="address_add_btn"
                color="secondary"
                onClick={postDialogopen}
              >
                우편번호 검색
              </Button>

              <Dialog open={post_modal} onClose={postDialogclose}>
                <DialogTitle>주소검색</DialogTitle>
                <DialogContent>
                  <DaumPostcode onComplete={handleComplete} />
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={postDialogclose}
                    >
                      닫기
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
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
              <TextField
                className="EnterADDRESS2"
                name="address2"
                label="상세주소"
                type="text"
                variant="outlined"
                value={address2 === "null" ? "":address2===""?"":address2}
                onChange={handleChange}
                required
              />
              <br />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  {" "}
                  성별
                </InputLabel>
                <Select
                  className="EnterGENDER"
                  native
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  label="성별"
                  inputProps={{
                    name: "gender",
                    id: "outlined-gender-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="1">남</option>
                  <option value="2">여</option>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                className="EnterYEAR"
                name="year"
                id="filled-passwordchk-input"
                label="년(4자)"
                type="text"
                variant="outlined"
                required
                value={year}
                inputProps={{
                  maxLength: 4,
                }}
                style={{ marginRight: "10px" }}
                onChange={handleChange}
              />
              <FormControl style={{ width: "15%", marginRight: "10px" }}>
                <InputLabel id="demo-simple-select-helper-label">월</InputLabel>
                <Select
                  className="EnterMONTH"
                  name="month"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={handleChange}
                  value={month}
                >
                  <MenuItem value="">
                    <em>선택</em>
                  </MenuItem>
                  <MenuItem value={1}>1월</MenuItem>
                  <MenuItem value={2}>2월</MenuItem>
                  <MenuItem value={3}>3월</MenuItem>
                  <MenuItem value={4}>4월</MenuItem>
                  <MenuItem value={5}>5월</MenuItem>
                  <MenuItem value={6}>6월</MenuItem>
                  <MenuItem value={7}>7월</MenuItem>
                  <MenuItem value={8}>8월</MenuItem>
                  <MenuItem value={9}>9월</MenuItem>
                  <MenuItem value={10}>10월</MenuItem>
                  <MenuItem value={11}>11월</MenuItem>
                  <MenuItem value={12}>12월</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className="EnterDAY"
                name="day"
                id="filled-passwordchk-input"
                label="일"
                type="text"
                variant="outlined"
                required
                value={day}
                inputProps={{
                  maxLength: 2,
                }}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                className="EnterPHONE"
                name="phone_number"
                id="filled-passwordchk-input"
                label="전화번호 입력"
                type="text"
                autoComplete="current-password"
                variant="filled"
                required
                value={phone_number}
                inputProps={{
                  maxLength: 11,
                }}
                onChange={handleChange}
              />
            </div>
            <br />
            <FormControl style={{ width: "15%", marginRight: "10px" }}>
              <InputLabel id="demo-simple-select-helper-label">
                회원종류
              </InputLabel>
              <Select
                name="user_kinds"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={handleChange}
                value={user_kinds}
              >
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                <MenuItem value={0}>일반회원</MenuItem>
                <MenuItem value={1}>사업자</MenuItem>
                <MenuItem value={2}>관리자</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <div style={{ marginTop: "10", textAlign: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={this.handleSubmit}
              >
                가입하기
              </Button>
              <Button onClick={addDialogclose}>닫기</Button>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog open={info_modal}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <div>
              <TextField
                className="EnterID"
                name="user_id"
                id="filled-id-input"
                label="아이디"
                type="text"
                variant="outlined"
                value={user_id}
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </div>
            <div>
              <TextField
                className="EnterNAME"
                name="user_name"
                id="filled-name-input"
                label="이름"
                type="text"
                variant="outlined"
                value={user_name}
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </div>
            <div>
              <TextField
                className="EnterZIPCODE"
                name="zipcode"
                label="우편번호"
                type="text"
                variant="outlined"
                value={zipcode}
                required
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                className="EnterADDRESS1"
                name="address1"
                label="주소"
                type="text"
                variant="outlined"
                value={address1}
                required
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                className="EnterADDRESS2"
                name="address2"
                label="상세주소"
                type="text"
                variant="outlined"
                value={
                  address2 === "null" ? "" : address2 === "" ? "" : address2
                }
                InputProps={{
                  readOnly: true,
                }}
              />
              <br />

              <TextField
                className="EnterGENDER"
                name="gender"
                label="성별"
                type="text"
                variant="outlined"
                value={gender === "1" ? "남" : "여"}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div>
              <TextField
                className="EnterYEAR"
                name="year"
                id="filled-passwordchk-input"
                label="년(4자)"
                type="text"
                variant="outlined"
                required
                value={year}
                style={{ marginRight: "10px" }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                className="EnterYEAR"
                name="month"
                id="filled-passwordchk-input"
                label="년(4자)"
                type="text"
                variant="outlined"
                required
                value={month}
                style={{ marginRight: "10px" }}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                className="EnterDAY"
                name="day"
                id="filled-passwordchk-input"
                label="일"
                type="text"
                variant="outlined"
                required
                value={day}
                inputProps={{
                  maxLength: 2,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div>
              <TextField
                className="EnterPHONE"
                name="phone_number"
                id="filled-passwordchk-input"
                label="전화번호"
                type="text"
                autoComplete="current-password"
                variant="filled"
                required
                value={phone_number}
                inputProps={{
                  maxLength: 11,
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <br />

            <TextField
              className="EnterPHONE"
              name="phone_number"
              id="filled-passwordchk-input"
              label="회원종류"
              type="text"
              autoComplete="current-password"
              variant="filled"
              required
              value={
                user_kinds === "0"
                  ? "일반회원"
                  : user_kinds === "1"
                  ? "사업자"
                  : "관리자"
              }
              inputProps={{
                maxLength: 11,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContent>

          <DialogActions>
            <div style={{ marginTop: "10", textAlign: "center" }}>
              <Button onClick={modify_open}>수정</Button>
              <Button onClick={info_close}>닫기</Button>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog open={customer_modify}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <div>
              <TextField
                className="EnterID"
                name="user_id"
                id="filled-id-input"
                label="아이디"
                type="text"
                variant="outlined"
                value={user_id}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div>
              <TextField
                className="EnterNAME"
                name="user_name"
                id="filled-name-input"
                label="이름"
                type="text"
                variant="outlined"
                value={user_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
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
              <Button
                variant="contained"
                className="address_add_btn"
                color="secondary"
                onClick={postDialogopen}
              >
                우편번호 검색
              </Button>

              <Dialog open={post_modal} onClose={postDialogclose}>
                <DialogTitle>주소검색</DialogTitle>
                <DialogContent>
                  <DaumPostcode onComplete={handleComplete} />
                  <DialogActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={postDialogclose}
                    >
                      닫기
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
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
              <TextField
                className="EnterADDRESS2"
                name="address2"
                label="상세주소"
                type="text"
                variant="outlined"
                value={address2}
                onChange={handleChange}
                required
              />
              <br />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  {" "}
                  성별
                </InputLabel>
                <Select
                  className="EnterGENDER"
                  native
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  label="성별"
                  inputProps={{
                    name: "gender",
                    id: "outlined-gender-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="1">남</option>
                  <option value="2">여</option>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                className="EnterYEAR"
                name="year"
                id="filled-passwordchk-input"
                label="년(4자)"
                type="text"
                variant="outlined"
                required
                value={year}
                inputProps={{
                  maxLength: 4,
                }}
                style={{ marginRight: "10px" }}
                onChange={handleChange}
              />
              <FormControl style={{ width: "15%", marginRight: "10px" }}>
                <InputLabel id="demo-simple-select-helper-label">월</InputLabel>
                <Select
                  className="EnterMONTH"
                  name="month"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={handleChange}
                  value={month}
                >
                  <MenuItem value="">
                    <em>선택</em>
                  </MenuItem>
                  <MenuItem value={1}>1월</MenuItem>
                  <MenuItem value={2}>2월</MenuItem>
                  <MenuItem value={3}>3월</MenuItem>
                  <MenuItem value={4}>4월</MenuItem>
                  <MenuItem value={5}>5월</MenuItem>
                  <MenuItem value={6}>6월</MenuItem>
                  <MenuItem value={7}>7월</MenuItem>
                  <MenuItem value={8}>8월</MenuItem>
                  <MenuItem value={9}>9월</MenuItem>
                  <MenuItem value={10}>10월</MenuItem>
                  <MenuItem value={11}>11월</MenuItem>
                  <MenuItem value={12}>12월</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className="EnterDAY"
                name="day"
                id="filled-passwordchk-input"
                label="일"
                type="text"
                variant="outlined"
                required
                value={day}
                inputProps={{
                  maxLength: 2,
                }}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                className="EnterPHONE"
                name="phone_number"
                id="filled-passwordchk-input"
                label="전화번호 입력"
                type="text"
                autoComplete="current-password"
                variant="filled"
                required
                value={phone_number}
                inputProps={{
                  maxLength: 11,
                }}
                onChange={handleChange}
              />
            </div>
            <br />
            <FormControl style={{ width: "15%", marginRight: "10px" }}>
              <InputLabel id="demo-simple-select-helper-label">
                회원종류
              </InputLabel>
              <Select
                name="user_kinds"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={handleChange}
                value={user_kinds}
              >
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                <MenuItem value={0}>일반회원</MenuItem>
                <MenuItem value={1}>사업자</MenuItem>
                <MenuItem value={2}>관리자</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <div style={{ marginTop: "10", textAlign: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={this.handleModify}
              >
                수정
              </Button>
              <Button onClick={modify_close}>닫기</Button>
            </div>
          </DialogActions>
        </Dialog>

        <Dialog open={pwd_modify} style={{ width: "37%", margin: "0 auto" }}>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                className="EnterPASSWORD"
                name="change_pw"
                id="filled-password-input"
                label="비밀번호"
                type="password"
                variant="outlined"
                value={change_pw}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextField
                className="EnterPASSWORD_chk"
                name="change_pw_chk"
                id="filled-passwordchk-input"
                label="비밀번호 체크"
                type="password"
                variant="outlined"
                value={change_pw_chk}
                onChange={handleChange}
                required
              />
              {change_pw_chk !== change_pw && (
                <div style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
            </div>
          </DialogContent>

          <DialogActions>
            <div style={{ marginTop: "10", textAlign: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  this.handlePwChange(pw_id);
                }}
              >
                수정
              </Button>
              &nbsp;
              <Button variant="contained" color="secondary" onClick={pwd_close}>
                닫기
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default dialog;
