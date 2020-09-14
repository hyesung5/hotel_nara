import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderPage from "../../components/header/header";
import UserReservPage from "../../components/user/reservinfo";
import {getReservData, deleteReservData} from "../../store/moudules/USER/UserReservationInfo";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

class UserReservInfoContainer extends Component {

   componentDidMount(){
     if(localStorage.getItem("userInfo") === null){
        alert("로그인후 이용이 가능합니다.");
        this.props.history.push('/');
     }else{
       this.getData(JSON.parse(localStorage.getItem("userInfo")).id);
     }
   }
   
    getData =(id)=> {
        const {getReservData}= this.props;
        const param = new URLSearchParams();
        param.append("user_id", id);
        const config = {
            headers: {
              "content-type": "application/json",
            },
          };
         getReservData(param, config)
    }

    handleDalete =(id)=> {
      const {deleteReservData} = this.props;
      let result = window.confirm("삭제 하시겠습니까?");
      if(result){
     

      const param = new URLSearchParams();
      param.append("id", id);

      const config = {
          headers: {
            "content-type": "application/json",
          },
        };
         deleteReservData(param, config).then((res)=> {
            if(res === 1){
              alert("정상적으로 취소되었습니다.")
            }else{
              alert("취소에 실패했습니다.");
            }
        })
      }else{
        
      }
      
      }

        
    render(){
      const {res_list}= this.props;
        return(
          <div>
          <HeaderPage/>
          <Paper>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>번호</TableCell>
            <TableCell>호텔이름</TableCell>
            <TableCell>방</TableCell>
            <TableCell>체크인/체크아웃</TableCell>
            <TableCell>결제방법</TableCell>
            <TableCell>가격</TableCell>
            <TableCell>예약자</TableCell>
            <TableCell>예약취소</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {res_list.map((c,i) => { return (
          <UserReservPage
            key={i}
            p_num={i}
            id={c.ID}
            re_hotel={c.RE_HOTEL}
            re_room={c.RE_ROOM}
            re_check_in={c.RE_CHECKIN}
            re_check_out={c.RE_CHECKOUT}
            re_payment={c.RE_PAYMENT}
            re_account={c.RE_ACCOUNT}
            re_price={c.RE_PRICE}
            re_name={c.RE_NAME}
            onDelete={this.handleDalete}
          />
        );
      })}
        </TableBody>
      </Table>
      </Paper>
           
               
               

            </div>
        )
    }
}

const mapStateToProps =(state)=> ({
    re_hotel:state.UserResInfor.re_hotel,
    re_room:state.UserResInfor.re_room,
    re_check_in:state.UserResInfor.re_check_in,
    re_check_out:state.UserResInfor.re_check_out,
    re_payment:state.UserResInfor.re_payment,
    re_account:state.UserResInfor.re_account,
    re_price:state.UserResInfor.re_price,
    re_hotel_id:state.UserResInfor.re_hotel_id,
    re_room_id:state.UserResInfor.re_room_id,
    re_name:state.UserResInfor.re_name,
    re_number:state.UserResInfor.re_number,
    res_list:state.UserResInfor.res_list
});

const mapDispatchToProps ={
    getReservData,
    deleteReservData
}

export default connect(mapStateToProps, mapDispatchToProps)(UserReservInfoContainer);