import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';

//로그인
const LOGIN_USER = 'LOGIN_USER';
const LODING = 'LODING';
const FAIL= 'FAIL';

const loginuser = createAction(LOGIN_USER, (data)=> data);
const loading = createAction(LODING);
const fail = createAction(FAIL);

//value 체인지
const CHANGE_VALUE='CHANGE_VALUE';
export const changeValue = createAction(CHANGE_VALUE, ({ key, value }) => ({
    key,
    value,
  }));


//로그인 성공
const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const loginsuccess = createAction(LOGIN_SUCCESS);

//아이디 체크
const ID_CHK_LOAD="ID_CHK_LOAD";
const ID_CHK_SUCCESS="ID_CHK_SUCCESS";
const ID_CHK_FAIL="ID_CHK_FAIL";
const id_chk_load = createAction(ID_CHK_LOAD, (bool)=> bool);
const id_chk_success = createAction(ID_CHK_SUCCESS, (data)=> data);
const id_chk_fail = createAction(ID_CHK_FAIL, (err)=> err);

//아이디 찾기 모달
const ID_MODAL_OPEN="ID_MODAL_OPEN";
const ID_MODAL_CLOSE="ID_MODAL_CLOSE";
export const idModalopen= createAction(ID_MODAL_OPEN);
export const idModalclose= createAction(ID_MODAL_CLOSE);

//비밀번호 찾기 모달
const PASSWORD_MODAL_OPEN="PASSWORD_MODAL_OPEN";
const PASSWORD_MODAL_CLOSE="PASSWORD_MODAL_CLOSE";
export const passModalopen= createAction(PASSWORD_MODAL_OPEN);
export const passModalclose= createAction(PASSWORD_MODAL_CLOSE);

//아이디 찾기
const FIND_ID_LOAD="FIND_ID_LOAD";
const FIND_ID_DATA="FIND_ID_DATA";
const FIND_ID_FAIL="FIND_ID_FAIL";
const find_id_load = createAction(FIND_ID_LOAD, (bool)=> bool);
const find_id_success = createAction(FIND_ID_DATA, (data)=> data);
const find_id_fail = createAction(FIND_ID_FAIL, (err)=> err);

//비밀번호 찾기
const FIND_PASS_LOAD="FIND_PASS_LOAD";
const FIND_PASS_DATA="FIND_PASS_DATA";
const FIND_PASS_FAIL="FIND_PASS_FAIL";
const find_pass_load = createAction(FIND_PASS_LOAD, (bool)=> bool);
const find_pass_success = createAction(FIND_PASS_DATA, (data)=> data);
const find_pass_fail = createAction(FIND_PASS_FAIL, (err)=> err);

//클린
const FIND_INPUT_CLEAN="FIND_INPUT_CLEAN";
const LOGIN_CLEAN="LOGIN_CLEAN";
export const find_input_clean= createAction(FIND_INPUT_CLEAN);
export const login_clean = createAction(LOGIN_CLEAN);


//로그인 처리
export const LoginUser =(params, config) => async (dispatch) =>{
    dispatch(loading(true));
    try{
        const {data} = await axios.post('/login', params);
        dispatch(loginuser(data));
        if(data.count === undefined){
            dispatch(loading(false));
           return 0;
        }else{
            dispatch(loading(false));
            return data;
        }
    }catch(e){
        dispatch(fail(e));
    }
    dispatch(loading(false));
    
}

//아이디 체크
export const login_chk_id =(params, config) => async (dispatch) => {
   dispatch(id_chk_load(true));
    try{
        const {data} = await axios.post('/login_id_chk', params);
        dispatch(id_chk_success(data));
        if(data.count >= 1){
            dispatch(id_chk_load(false));
            return data.count;
        }
    }catch(e){
        dispatch(id_chk_fail(e))
    }
    dispatch(id_chk_load(false));
}

//아이디 찾기
export const findID =(params, config) => async (dispatch) => {
    dispatch(find_id_load(true));
     try{

         const {data} = await axios.post('/findID', params);
         dispatch(find_id_success(data));
         if(data === ""){
            dispatch(find_id_load(false));
            return 0;
         }
       
     }catch(e){
         dispatch(find_id_fail(e))
     }
     dispatch(find_id_load(false));
 }

 //비밀번호 찾기
 export const findPASS =(params, config) => async (dispatch) => {
    dispatch(find_pass_load(true));
     try{
         const {data} = await axios.post('/findPASSWORD', params);
         dispatch(find_pass_success(data));
         dispatch(find_id_success(data));
         if(data === ""){
            dispatch(find_pass_load(false));
            return 0;
         }
     }catch(e){
         dispatch(find_pass_fail(e))
     }
     dispatch(find_pass_load(false));
 }

const inintialState ={
    login_id:'', //로그인 아이디
    login_password:'', //로그인 비밀번호
    fail:'', //로그인 실패시 에러내용
    loding:false,  //로그인 dispatch 로딩 bool 처리
    login_data:'', //로그인 성공시 데이터 담김
    id_chk_load: false, //아이디 찾기 dispatch 로딩 bool
    id_chk_data:'', //아이디 찾기 결과 값
    id_chk_fail:'', //아이디 찾기 실패시 에러 값 
    find_id_modal: false, //아이디 찾기 모달창 open/close 값
    find_id_password: false, //비밀번호 찾기 모달창 open/close 값
    f_id:'', //비밀번호 찾기 아이디 값
    f_name:'', //아이디,비밀번호 찾기 이름 값
    f_number:'', //아이디, 비밀번호 찾기 전화번호 값
    find_id_data:'', //아이디 찾기 값
    find_pw_data:'', //비밀번호 찾기 값
    find_load: false, //아이디, 비밀번호 찾기 dispatch 로딩 bool 처리
    find_fail: '' //아이디, 비밀번호 찾기 실패시 에러값
 


};

export default handleActions ({
    //value 값 저장
    [CHANGE_VALUE]: (state, action) => ({

        ...state,
        [action.payload.key]: action.payload.value
    }),
    //로그인 처리
    [LOGIN_USER]: (state, action)=> ({
        ...state,
        login_data: action.payload,

    }),
    [LODING]:(state, action)=> ({
        ...state,
        loding:!state.loding
    }),
    [FAIL]: (state, action) => ({
        ...state,
        fail:action.payload
    }),

    //로그인 성공후 스토리지에 필요값을 넣은후 초기화
    [LOGIN_SUCCESS]:(state, action) => ({
        ...state,
        login_id:'', //로그인 아이디
        login_password:'', //로그인 비밀번호
        fail:'', //로그인 실패시 에러내용
        loding:false,  //로그인 dispatch 로딩 bool 처리
        login_data:'', //로그인 성공시 데이터 담김
        id_chk_load: false, //아이디 체크 dispatch 로딩 bool
        id_chk_data:'', //아이디 체크 결과 값
        id_chk_fail:'', //아이디 체크 실패시 에러 값 
        find_id_modal: false, //아이디 찾기 모달창 open/close 값
        find_id_password: false, //비밀번호 찾기 모달창 open/close 값
        f_id:'', //비밀번호 찾기 아이디 값
        f_name:'', //아이디,비밀번호 찾기 이름 값
        f_number:'', //아이디, 비밀번호 찾기 전화번호 값
        find_id_data:'', //아이디 찾기 값
        find_pw_data:'', //비밀번호 찾기 값
        find_load: false, //아이디, 비밀번호 찾기 dispatch 로딩 bool 처리
        find_fail: '' //아이디, 비밀번호 찾기 실패시 에러값
    }),

    //아이디 찾기 모달창
    [ID_MODAL_OPEN]: (state, action)=> ({
        ...state,
        find_id_modal:true
    }),
    [ID_MODAL_CLOSE]: (state, action)=> ({
        ...state,
        find_id_modal:false,
        find_data:'',
        f_id:'',
    f_name:'',
    f_number:'',
    }),
    //아이디 체크
    [ID_CHK_LOAD]:(state, action)=> ({
        ...state,
        id_chk_load:action.payload
    }),
    [ID_CHK_SUCCESS]: (state, action) => ({
        ...state,
        id_chk_data:action.payload
    }),
    [ID_CHK_FAIL]:(state, action) => ({
        id_chk_fail: action.payload

    }),

    // 비밀번호 찾기 모달창
    [PASSWORD_MODAL_OPEN]: (state, action)=> ({
        ...state,
        find_id_password:true
    }),
    [PASSWORD_MODAL_CLOSE]: (state, action)=> ({
        ...state,
        find_id_password:false,
        find_data:'',
        f_id:'',
        f_name:'',
        f_number:'',
    }),
    // 아이디찾기
    [FIND_ID_LOAD]:(state, action)=> ({
        ...state,
        find_load: action.payload
    }),
    [FIND_ID_DATA]:(state, action)=> ({
            ...state,
            find_id_data:action.payload.USER_ID
    }),
    [FIND_ID_FAIL]:(state, action)=> ({
            ...state,
            find_fail:action.payload
    }),
    // 비밀번호 찾기
    [FIND_PASS_LOAD]:(state, action)=> ({
        ...state,
        find_load: action.payload
    }),
    [FIND_PASS_DATA]:(state, action)=> ({
        ...state,
        find_pw_data:action.payload.PASSWORD
    }),
    [FIND_PASS_FAIL]:(state, action)=> ({
        ...state,
        find_fail:action.payload
    }),
    // 인풋창 클린
    [FIND_INPUT_CLEAN]:(state, action) => ({
        ...state,
        f_id:'',
        f_name:'',
        f_number:'',
        find_data:'',
    }),
    // state 클린
    [LOGIN_CLEAN]: (state, action)=> ({
        ...state,
        login_id:'',
        login_password:'',
        success:false,
        fail:'',
        loding:false,
        login_data:'',
        id_chk_load: false,
        id_chk_data:'',
        id_chk_fail:'',
        find_id_modal: false,
        find_id_password: false,
        f_id:'',
        f_name:'',
        f_number:'',
        find_data:'',
        find_load: false,
    find_fail: ''
    })


},
inintialState
);
