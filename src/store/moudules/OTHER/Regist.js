import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';

//회원 가입처리
const REGIST_SUCCESS='REGIST_SUCECSS';
const REGIST_LOADING='REGIST_LOADING';
const REGIST_FAILE='REGIST_FAILE';
const registsuccess = createAction (REGIST_SUCCESS,(data) => data);
const registloading = createAction (REGIST_LOADING, (bool) => bool);
const registfaile = createAction (REGIST_FAILE, (err) => err);

//중복 아이디 체크
const CHECK_LOADING= 'CHECK_LOADING';
const CHECK_SUCCESS= 'CHECK_SUCCESS';
const CHECK_FAILE= 'CHECK_FAILE';
const checkloading = createAction (CHECK_LOADING, (bool) => bool);
const checksuccess = createAction (CHECK_SUCCESS,(id) => id);
const checkfaile = createAction (CHECK_FAILE, (err) => err);

//회원 종류 선택
const KINDE_PLUSE='KINDE_PLUSE';
const KINDE_MINUS='KINDE_MINUS';
export const kindpluse = createAction (KINDE_PLUSE);
export const kindminus = createAction(KINDE_MINUS);

//주소검색 모달창
const ADD_SEARCH_OPEN='ADD_SEARCH_OPEN';
const ADD_SEARCH_CLOSE='ADD_SEARCH_CLOSE';
export const add_modal_open =createAction(ADD_SEARCH_OPEN);
export const add_modal_close =createAction(ADD_SEARCH_CLOSE);

//검색한 주소값 
const GET_ADDRESS="GET_ADDRESS";
export const getaddress = createAction(GET_ADDRESS, ({zipcode, address}) => ({zipcode, address}) );

//vlaue 값 
const CHANGE_REGIST_VALUE='CHANGE_REGIST_VALUE';
export const changeValue = createAction(CHANGE_REGIST_VALUE, ({ key, value }) => ({key,value}));

//초기화
const STATE_CLEAN="STATE_CLEAN";
export const stateClean =createAction(STATE_CLEAN);


//회원 저장
export const Memberregistration = ( params, config) => async (dispatch) => {
    dispatch(registloading(true));
    try {
       const { data } = await axios.post('/add', params);
       dispatch(registsuccess(data));
       if(data !== ""){dispatch(registloading(false)); return data;}        
    } catch (e) {dispatch(registfaile(e));}
    dispatch(registloading(false));
};

//아이디 체크
export const User_idCheck = ( params, config) => async (dispatch) => {
    dispatch(checkloading(true));
    try { const { data } = await axios.post('/check_id',  params);
       dispatch(checksuccess(data));
       if(data !== ""){ dispatch(checkloading(false)); return data;}        
    } catch (e) {dispatch(checkfaile(e));}
    dispatch(checkloading(false));
};




const initialSate ={

    loading: false, // 회원가입 bool값
    error: null, //회원 가입 실패시 에러
    user_id: '', //아이디
    password:'', //비밀번호
    password_check:'', //비밀번호 체크
    gender:'', //성별
    phone_number:'', //전화번호
    user_name:'', //이름
    checked:'', //아이디 중복체크
    year: '', //년도
    month: '', //월
    day: '', //일
    user_kinds: 0, //회원 종류
    address_search:false, //주소검색 모달창 열기/ 닫기
    zipcode:'', //우편번호
    address1:'',//주소
    address2:'' //상세주소


};

export default handleActions (
    {
        [REGIST_LOADING]: (state, action) => ({
            ...state,
            loading: action.payload
        }),
        [REGIST_SUCCESS]: (state, action) => ({
            ...state,
            user_id: '',
            password:'',
            password_check:'',
            gender:'',
            phone_number:'',
            user_name:''
        }),
        [REGIST_FAILE]: (state, action) => ({
            ...state,
            error: action.payload
        }),
        [CHANGE_REGIST_VALUE]: (state, action) => ({

            ...state,
            [action.payload.key]: action.payload.value
        }),
        [CHECK_LOADING]: (state, action) => ({
            ...state,
            loading:action.password
        }),
        [CHECK_SUCCESS]: (state, action) => ({
            ...state,
            checked: action.payload
        }),
        [CHECK_FAILE]:(state, action) => ({
            ...state,
            error: action.password
        }),
        [KINDE_PLUSE]: (state, action) => ({
            ...state,
            user_kinds : 1
        }),
        [KINDE_MINUS]: (state, action) => ({
            ...state,
            user_kinds : 2
        }),
        [ADD_SEARCH_OPEN]: (state, action)=> ({
            ...state,
            address_search: true
        }),
        [ADD_SEARCH_CLOSE]: (state, action)=> ({
            ...state,
            address_search: false
        }),
        [GET_ADDRESS]: (state, action) =>({
            ...state,
            zipcode: action.payload.zipcode,
            address1: action.payload.address
        }),
        [STATE_CLEAN]: (state, action) => ({
            ...state,
            loading: false, // 회원가입 bool값
            error: null, //회원 가입 실패시 에러
            user_id: '', //아이디
            password:'', //비밀번호
            password_check:'', //비밀번호 체크
            gender:'', //성별
            phone_number:'', //전화번호
            user_name:'', //이름
            checked:'', //아이디 중복체크
            year: '', //년도
            month: '', //월
            day: '', //일
            user_kinds: 0, //회원 종류
            address_search:false, //주소검색 모달창 열기/ 닫기
            zipcode:'', //우편번호
            address1:'',//주소
            address2:'' //상세주소
        
        })

},

initialSate
);

