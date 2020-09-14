import {createAction, handleActions } from 'redux-actions';
import axios from 'axios';

//예약 목록
const RESERVATION_DATA_LOAD="RESERVATION_DATA_LOAD";
const RESERVATION_DATA_SUCCESS="RESERVATION_DATA_SUCCESS";
const RESERVATION_DATA_FAIL="RESERVATION_DATA_FAIL";
const res_load= createAction(RESERVATION_DATA_LOAD, (bool)=> bool);
const res_data= createAction(RESERVATION_DATA_SUCCESS, (data)=> data);
const res_fail= createAction(RESERVATION_DATA_FAIL, (err)=> err);

//예약 취소
const CANCEL_RESERVATION="CANCEL_RESERVATION";
const CANCEL_LOAD="CANCEL_LOAD";
const CANCEL_FAIL="CANCEL_FAIL";
const cancel_data= createAction(CANCEL_RESERVATION, (data)=> data);
const cancel_load= createAction(CANCEL_LOAD, (bool)=>bool);
const cancel_fail= createAction(CANCEL_FAIL, (err)=> err);


//예약목록 출력
export const getReservData =(param, config) => async (dispatch)=> {
dispatch(res_load(true));
    try{
        const {data}= await axios.post('/useresdata', param);
        dispatch(res_data(data));
    }catch(e){
        dispatch(res_fail(e));
    }
    dispatch(res_load(false));
}

//예역 취소
export const deleteReservData =(param, config) => async (dispatch)=> {
    dispatch(cancel_load(true));
        try{
            const {data}= await axios.post('/reservdelete', param);
            if(data !== "") {
                dispatch(cancel_load(false));
                return data
            }    
        }catch(e){
            dispatch(cancel_fail(e));
        }
        dispatch(cancel_load(false));
    }
    


const initalState ={
    res_load:false, //예약 목록 출력 bool 값
    res_err:'', //예약목록 출력 실패시 에러
    res_list:[], //예약목록
    cancel_load: false, //예약취소시 bool값
    calcel_data:'', // 예약취소 성공
    cancel_fail:'' //예약취소 실채시 에러

}

export default handleActions ({
    //예약목록 출력
    [RESERVATION_DATA_LOAD] : (state, action)=> ({
        ...state,
        res_load: action.payload
    }),
    [RESERVATION_DATA_SUCCESS]: (state, action) => ({
        ...state,
        res_list: action.payload

    }),
    [RESERVATION_DATA_FAIL]: (state, action)=> ({
        ...state,
        res_err:action.payload

    }),

    //예약취소
    [CANCEL_LOAD]: (state, action)=> ({
        ...state,
        cancel_load: action.payload
    }),
    [CANCEL_RESERVATION]: (state, action)=> ({
        ...state,
        cancel_data: action.payload
    }),
    [CANCEL_FAIL]: (state, action)=> ({
        ...state,
        cancel_fail: action.payload
    })
},
initalState
)