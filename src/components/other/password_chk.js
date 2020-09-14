import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class password_chk extends Component {
    handleSubmit=()=>{

        const {onChkPassword}= this.props;
        const param = new URLSearchParams();
        const config = {
            headers: {
              "content-type": "application/json",
            },
          };

          if (localStorage.getItem("userInfo") !== null) {
            param.append("chk_id", JSON.parse(localStorage.getItem("userInfo")).id);
          } 

          param.append("chk_password", this.props.chk_password);
    
          onChkPassword(param, config);

    }
    render(){
        const {onhandleChange ,chk_password} = this.props;
        return(
            <div style={{
              width:"17%",
              margin: "0 auto",
              marginTop:"150px"
            }}>


<Card style={{ minWidth: "275"}}>
      <CardContent>
      <Typography style={{
        fontSize:"14px"
      }} color="textSecondary" gutterBottom>
       비밀번호 확인
        </Typography>
        <Typography variant="h5" component="h2">
        <input className="B_c1Hu" name="chk_password" style={{marginBottom: "7px", width:"100%"}} type="password" laceholder="비밀번호 " onChange={onhandleChange} value={chk_password} />
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" style={{display: "inline-block", margin:"0 auto"}} color="primary" disableElevation onClick={this.handleSubmit}>확인</Button>
      </CardActions>
    </Card>



                    {/* <p>비밀번호 입력</p>
                    <input name="chk_password" type="password" onChange={onhandleChange} value={chk_password}/>
                    <button onClick={this.handleSubmit}>확인</button> */}
            </div>
        )
    }
}


export default password_chk;
