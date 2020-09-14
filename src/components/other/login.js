import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class login extends Component {

  LoginSubmit = (e) => {
    e.preventDefault();
    const { id, password } = this.props;
    if (id === "") {
      alert("아이디를 입력해주세요");
      return;
    } else if (password === "") {
      alert("비밀번호를 입력해주세요");
    } else {
      this.props.onLogin(id, password);
    }
  };
  

  render() {
    const {
      id,
      password,
      handleChange,
      idModalopen,
      passModalopen,
    } = this.props;
    return (
      <div style={{textAlign:"center"}}>

  
      <form onSubmit={this.LoginSubmit} >
        <Card style={{ minWidth: "300" }} variant="outlined">
          <CardContent>
          <Typography variant="h5" component="h2">
          Login
        </Typography>
            <Typography color="textSecondary" gutterBottom>
              <input
                className="B_c1Hu"
                name="login_id"
                style={{ marginBottom: "7px" }}
                type="text"
                autocomplete="username"
                placeholder="아이디 "
                onChange={handleChange}
                value={id}
              />
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <input
                className="B_c1Hu"
                name="login_password"
                type="password"
                autocomplete="current-password"
                placeholder="비밀번호"
                onChange={handleChange}
                value={password}
              />
            </Typography>
            <Typography variant="body2" component="p"></Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              style={{ display: "inline-block", margin: "0 auto" }}
              color="primary"
              disableElevation
              type="submit"
            >
              로그인
            </Button>
          </CardActions>
          <CardActions>
            <Button
              variant="contained"
              style={{ display: "inline-block", margin: "0 auto" }}
              color="primary"
              disableElevation
              onClick={(e) => {
                e.preventDefault();
                idModalopen();
              }}
            >
              아이디 찾기
            </Button>
            &nbsp;
            &nbsp;
            <Button
              variant="contained"
              style={{ display: "inline-block", margin: "0 auto" }}
              color="primary"
              disableElevation
              onClick={(e) => {
                e.preventDefault();
                passModalopen();
              }}
            >
              비밀번호 찾기
            </Button>
          </CardActions>
        </Card>
      </form>
      </div>
    );
  }
}

export default login;
