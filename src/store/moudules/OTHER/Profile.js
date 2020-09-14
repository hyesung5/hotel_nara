import {handleActions, createAction} from 'redux-actions';
import axios from 'axios';

//회원 정보 출력
const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS';
const PROFILE_LOAD_LOADING ='PROFILE_LOAD_LOADING';
const PROFILE_LOAD_FAIL='PROFILE_LOAD_FAIL';
const profileload = createAction(PROFILE_LOAD_SUCCESS, (data) => data);
const loading = createAction(PROFILE_LOAD_LOADING, (bool)=> bool);
const fail= createAction(PROFILE_LOAD_FAIL, (err) => err )

//회원 정보 수정 value
const CHANGE_VALUE='CHANGE_VALUE';
export const changeValue = createAction(CHANGE_VALUE, ({ key, value }) => ({key,value}));

//회원 정보 수정 완료
const MODIFIED_SUCCESS='MODIFIED_SUCCESS';
const modifiedSuccess= createAction(MODIFIED_SUCCESS, (data)=> data);

//회원 정보 수정창 비밀번호 확인
const CHK_LOAD = "CHK_LOAD";
const CHK_PASSWORD ="CHK_PASSWORD";
const CHK_FAIL="CHK_FAIL";
const chkload=createAction(CHK_LOAD , (bool)=> bool);
const chkpassword=createAction(CHK_PASSWORD , (bool)=> bool);
const chkfail=createAction(CHK_FAIL , (err)=> err);

//회원 정보 수정창 주소검색 모달
const MODY_SEARCH_OPEN='MODY_SEARCH_OPEN';
const MODY_SEARCH_CLOSE='MODY_SEARCH_CLOSE';
export const mody_modal_open =createAction(MODY_SEARCH_OPEN);
export const mody_modal_close =createAction(MODY_SEARCH_CLOSE);

//검색된 주소 입력
const SET_ADDRESS="SET_ADDRESS";
export const setaddress = createAction(SET_ADDRESS, ({zipcode, address}) => ({zipcode, address}) );

//회원 정보 수정창 초기화
const PROFILE_CLEAN="PROFILE_CLEAN";
export const profileclean= createAction(PROFILE_CLEAN);

//회원 정보 출력
export const ProFileData =(params, config) => async (dispatch) =>{
    dispatch(loading(true));
    try{
        const {data} = await axios.post('/proflie', params);
        dispatch(profileload(data));
    }catch(e){
        dispatch(fail(e));
    }
    dispatch(loading(false));
}

//회원 정보 수정처리
export const modifiedInfo =(params, config) => async (dispatch) => {
    dispatch(loading(true));
    try{
        const {data} = await axios.post('/modified', params);  
        if(data===""){
        }else{
            dispatch(loading(false));
        return data;
        }
    }catch(e) {
        dispatch(fail(e))
    }    
}

//비밀번호 확인
export const chkPassword =(param, config) => async (dispatch) => {
    dispatch(chkload(true));
    try{
        const {data} = await axios.post('/chkpassword', param);
       if(data===""){
        dispatch(chkpassword(false));
       }else{
        dispatch(chkpassword(true));
       }
    }catch(e) {
        dispatch(chkfail(e))
    }
    dispatch(chkload(false));
}


const initialState ={
    loading: false, //회원정보 출력 bool값
    error: null, //회원 정보 출력 실패시 에러값
    pschk:false, //비밀번호 체크 결과값
    user_id: '', //회원 아이디
    password:'', //비밀번호
    password_check:'', //비밀번호 체크
    gender:'', //성별
    phone_number:'', //전화번호
    user_name:'', //회원 이름
    year: '', //년도
    month: '', //월
    day: '', //일
    user_kinds: '', //회원 종류
    chk_load:false, //비밀번화 확인 bool값
    chk_err:'', //비밀번호 확인 에러
    set_address:false, //수정창 주소검색 모달 열기/ 닫기
    zipcode:'', //우편번호
    address1:'', //주소
    address2:'' //상세주소
};


export default handleActions ({
[PROFILE_LOAD_SUCCESS]: (state, action)=> ({
    ...state,

    user_id: action.payload.USER_ID,
    gender: action.payload.GENDER,
    phone_number: action.payload.PHONE,
    user_name:action.payload.NAME,
    year: action.payload.YEAR,
    month: action.payload.MONTH,
    day: action.payload.DAY,
    user_kinds: action.payload.USER_KINDS,
    zipcode:action.payload.ZIPCODE,
    address1:action.payload.ADDRESS1,
    address2:action.payload.ADDRESS2
}),

[PROFILE_LOAD_LOADING]:(state, action) =>({
    ...state,
    loading: !state.loading

}),
[PROFILE_LOAD_FAIL]:(state, action) => ({
    ...state,
    error: action.payload
}),
[CHANGE_VALUE]: (state, action) => ({

    ...state,
    [action.payload.key]: action.payload.value
}),
[CHK_LOAD]: (state, action)=> ({
    ...state,
    chk_load: action.payload
}),
[CHK_PASSWORD]: (state, action)=> ({
    ...state,
     pschk: action.payload
}),
[CHK_FAIL]: (state, action)=> ({
    ...state,
    chk_err: action.payload
}),
[PROFILE_CLEAN]: (state, action)=> ({
    ...state,
    loading: false,
    error: null,
    pschk:false,
    user_id: '',
    password:'',
    password_check:'',
    gender:'',
    phone_number:'',
    user_name:'',
    year: '',
    month: '',
    day: '',
    user_kinds: '',
    chk_load:false,
    chk_err:''
}),
[MODY_SEARCH_OPEN]: (state, action)=> ({
    ...state,
    set_address: true
}),
[MODY_SEARCH_CLOSE]: (state, action)=> ({
    ...state,
    set_address: false
}),
[SET_ADDRESS]: (state, action) =>({
    ...state,
    zipcode: action.payload.zipcode,
    address1: action.payload.address
})

},
initialState);