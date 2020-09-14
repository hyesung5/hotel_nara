import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../css/logindialog.css";

class logindialog extends Component {

  //아아디 찾기
  findId = () => {
    const { handleFindId, f_name, f_number } = this.props;
    const params = new URLSearchParams();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    if (f_name === "") {
      alert("이름 입력란이 비어있습니다.");
    } else if (f_number === "") {
      alert("전화번호입력안이 비어있습니다.");
    } else {
      params.append("NAME", f_name);
      params.append("PHONE", f_number);
      handleFindId(params, config);
    }
  };

  //비밀번호 찾기
  findPass = () => {
    const { handleFindPass, f_id, f_name, f_number } = this.props;
    const params = new URLSearchParams();
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    if (f_id === "") {
      alert("아이디 입력안이 비어있습니다.");
    } else if (f_name === "") {
      alert("이름 입력란이 비어있습니다.");
    } else if (f_number === "") {
      alert("전화번호입력안이 비어있습니다.");
    } else {
      params.append("ID", f_id);
      params.append("NAME", f_name);
      params.append("PHONE", f_number);
      handleFindPass(params, config);
    }
  };

  render() {
    const {
      find_id_modal,
      find_id_password,
      idModalclose,
      passModalclose,
      f_id,
      f_name,
      f_number,
      onChange,
      find_id_data,
      find_pw_data,
    } = this.props;
    return (
      <div>
        <Dialog className="dialog_Modify findID_dialog" open={find_id_modal}>
          <DialogTitle>아이디 찾기</DialogTitle>
          <DialogContent>
            {find_id_data === "" ? (
              <div>
                <TextField
                  label="이름"
                  type="text"
                  name="f_name"
                  value={f_name}
                  onChange={onChange}
                />
                <TextField
                  label="전화번호"
                  type="text"
                  name="f_number"
                  value={f_number}
                  onChange={onChange}
                />
              </div>
            ) : (
              <TextField
                id="outlined-read-only-input"
                label="검색하신 아이디"
                defaultValue={find_id_data}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            )}

            <DialogActions>
              {find_id_data === "" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.findId}
                >
                  찾기
                </Button>
              ) : (
                ""
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={idModalclose}
              >
                닫기
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <Dialog className="dialog_Modify findID_dialog" open={find_id_password}>
          <DialogTitle>비밀번호 찾기</DialogTitle>
          <DialogContent>
            {find_pw_data === "" ? (
              <div>
                <TextField
                  label="이름"
                  type="text"
                  name="f_name"
                  value={f_name}
                  onChange={onChange}
                />
                <TextField
                  label="아이디"
                  type="text"
                  name="f_id"
                  value={f_id}
                  onChange={onChange}
                />
                <TextField
                  label="전화번호"
                  type="text"
                  name="f_number"
                  value={f_number}
                  onChange={onChange}
                />
              </div>
            ) : (
              <TextField
                id="outlined-read-only-input"
                label="검색하신 비밀번호"
                defaultValue={find_pw_data}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            )}
            <DialogActions>
              {find_pw_data === "" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.findPass}
                >
                  찾기
                </Button>
              ) : (
                ""
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={passModalclose}
              >
                닫기
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default logindialog;
