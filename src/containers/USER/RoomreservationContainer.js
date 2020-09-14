import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderPage from "../../components/header/header";
import ReservPage from '../../components/user/reservation';
import FooterPage from "../../components/footer/footer";
import { changevalue, changechk, changechkall, choicepayment, initReservData, changeaccount} from '../../store/moudules/USER/UserRevation';
import queryStirng from 'query-string'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const useStyles =theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  });



class RoomreaservationContainer extends Component {



    componentDidMount(){
        if (localStorage.getItem("userInfo") === null) {
            alert("로그인후 이용이 가능합니다.");
            this.props.history.push("/login");
          }else{
    
    }
    }

    handleChangeValue =(e)=>{
        const {changevalue}= this.props;
        const {name, value}= e.target;

        changevalue({key:name, value});
    } 
    handleChangeChk =(e)=> {
        const{ changechk} =this.props;
        const {name, checked} =e.target;

        console.log("name:", name);
        console.log("checked", checked);
        changechk({key:name, checked});
    }
    choicepayment =(e)=> {
        const {choicepayment}= this.props;
        const {name}= e.target;
        choicepayment(name);
    }

    handleSubmit=(params, config)=>{
        const{initReservData}= this.props;
        initReservData(params, config).then((res) => {
            if (res === 1) {
                alert("예약이 정상적으로 완료되었습니다.");
                this.props.history.push("/");
              } else {
                alert("예약에 실패했습니다.");
              }
        });

    }
    
    handleChangeaccount=(e)=>{
        const {changeaccount} =this.props;
        const {name, value} =e.target;
        changeaccount({key:name, value});
    }

    render(){
        const classes = this.props;

      
        const { search } = this.props.location;	// 문자열 형식으로 결과값이 반환된다.
        const queryObj = queryStirng.parse(search);	// 문자열의 쿼리스트링을 Object로 변환
        
        const {HOTEL_NM,ROOM_NM,CHECK_IN,CHECK_OUT,PRICE, RESERV_DAYS,HOTEL_ID, ROOM_ID} = queryObj;

        const {payment,reserv_name, account,reserv_phone_number, changechkall, TermsofUse_All, TermsofUse_1,TermsofUse_2, TermsofUse_3, TermsofUse_4, TermsofUse_5, TermsofUse_6}= this.props;
        return (
            <div>
                <HeaderPage/>
                <div className={classes.root}>

            <Paper variant="outlined"  >
            <ReservPage 
                HOTEL_NM={HOTEL_NM}
                ROOM_NM={ROOM_NM}
                CHECK_IN={CHECK_IN}
                CHECK_OUT={CHECK_OUT}
                PRICE={PRICE}
                RESERV_DAYS={RESERV_DAYS}
                HOTEL_ID={HOTEL_ID}
                ROOM_ID={ROOM_ID}
                reserv_name={reserv_name}
                reserv_phone_number={reserv_phone_number}
                TermsofUse_All={TermsofUse_All}
                TermsofUse_1={TermsofUse_1}
                TermsofUse_2={TermsofUse_2}
                TermsofUse_3={TermsofUse_3}
                TermsofUse_4={TermsofUse_4}
                TermsofUse_5={TermsofUse_5}
                TermsofUse_6={TermsofUse_6}
                payment={payment}
                account={account}

                changeValue={this.handleChangeValue}
                changeChk={this.handleChangeChk}
                changechkall={changechkall}
                choicePayment={this.choicepayment}
                changeAccount={this.handleChangeaccount}
                onSubmit={this.handleSubmit}
                
            />
            </Paper>
            </div>
            <FooterPage />
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
data: state.UserReserVation.data,
reserv_name: state.UserReserVation.reserv_name,
reserv_phone_number:state.UserReserVation.reserv_phone_number,
TermsofUse_All:state.UserReserVation.TermsofUse_All,
TermsofUse_1:state.UserReserVation.TermsofUse_1,
TermsofUse_2:state.UserReserVation.TermsofUse_2,
TermsofUse_3:state.UserReserVation.TermsofUse_3,
TermsofUse_4:state.UserReserVation.TermsofUse_4,
TermsofUse_5:state.UserReserVation.TermsofUse_5,
TermsofUse_6:state.UserReserVation.TermsofUse_6,
payment:state.UserReserVation.payment,
account:state.UserReserVation.account,
});

const mapDispatchToProps={
  
    changevalue,
    changechk,
    changechkall,
    choicepayment,
    initReservData,
    changeaccount
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(RoomreaservationContainer));