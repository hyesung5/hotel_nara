import { createAction, handleActions } from "redux-actions";
import axios from "axios";

//사용자 목록 조회
const CUSTOMER_LIST_LOAD = "CUSTOMER_LIST_LOAD";
const CUSTOMERLIST_LOAD_SUCCESS = "CUSTOMERLIST_LOAD_SUCCESS";
const CUSTOMER_LIST_LOAD_FAIL = "CUSTOMER_LIST_LOAD_FAIL";
const customerload = createAction(CUSTOMER_LIST_LOAD, (bool) => bool);
const customerdata = createAction(CUSTOMERLIST_LOAD_SUCCESS, (data) => data);
const customerfail = createAction(CUSTOMER_LIST_LOAD_FAIL, (err) => err);

//초기화
const CUSTOMER_LIST_CLEAN = "CUSTOMER_LIST_CLEAN";
export const cusrtomer_clean = createAction(CUSTOMER_LIST_CLEAN);

//value 체인지
const CUSTOMER_CHANGE_VALUE = "CUSTOMER_CHANGE_VALUE";
export const customer_change_value = createAction(CUSTOMER_CHANGE_VALUE, ({ key, value }) => ({ key, value}));

//회원추가
const CUSTOMER_ADD_SUCCESS = "CUSTOMER_ADD_SUCCESS";
const CUSTOMER_LOADING = "CUSTOMER_LOADING";
const CUSTOMER_ADD_FAILE = "CUSTOMER_ADD_FAILE";
const addsuccess = createAction(CUSTOMER_ADD_SUCCESS, (data) => data);
const addloading = createAction(CUSTOMER_LOADING, (bool) => bool);
const addfaile = createAction(CUSTOMER_ADD_FAILE, (err) => err);

//아이디 체크
const ID_CHECK_LOADING = "ID_CHECK_LOADING";
const ID_CHECK_SUCCESS = "ID_CHECK_SUCCESS";
const ID_CHECK_FAILE = "ID_CHECK_FAILE";
const idchecksuccess = createAction(ID_CHECK_SUCCESS, (id) => id);
const idcheckloading = createAction(ID_CHECK_LOADING, (bool) => bool);
const idcheckfaile = createAction(ID_CHECK_FAILE, (err) => err);

//회원추가 모달
const CUSTOMER_ADD_SEARCH_OPEN = "CUSTOMER_ADD_SEARCH_OPEN";
const CUSTOMER_ADD_SEARCH_CLOSE = "CUSTOMER_ADD_SEARCH_CLOSE";
export const add_modal_open = createAction(CUSTOMER_ADD_SEARCH_OPEN);
export const add_modal_close = createAction(CUSTOMER_ADD_SEARCH_CLOSE);

//회원정보 모달
const CUSTOMER_INFO_OPEN = "CUSTOMER_INFO_OPEN";
const CUSTOMER_INFO_CLOSE = "CUSTOMER_INFO_CLOSE";
export const info_open = createAction(CUSTOMER_INFO_OPEN);
export const info_close = createAction(CUSTOMER_INFO_CLOSE);

//회원추가 모달
const ADD_DIALOG_OPEN = "ADD_DIALOG_OPEN";
const ADD_DIALOG_CLOSE = "ADD_DIALOG_CLOSE";
export const addDialogopen = createAction(ADD_DIALOG_OPEN);
export const addDialogclose = createAction(ADD_DIALOG_CLOSE);

//주소검색 모달
const POST_DIALOG_OPEN = "POST_DIALOG_OPEN";
const POST_DIALOG_CLOSE = "POST_DIALOG_CLOSE";
export const postDialogopen = createAction(POST_DIALOG_OPEN);
export const postDialogclose = createAction(POST_DIALOG_CLOSE);

//주소 값 
const SET_ADDRESS = "SET_ADDRESS";
export const set_address = createAction(SET_ADDRESS,({ zipcode, address }) => ({ zipcode, address }));

//회원 정보 조회
const CUSTOMER_INFO_SUCCESS = "CUSTOMER_INFO_SUCCESS";
const CUSTOMER_INFO_LOADING = "CUSTOMER_INFO_LOADING";
const CUSTOMER_INFO_FAILE = "CUSTOMER_INFO_FAILE";
const customerinfodata = createAction(CUSTOMER_INFO_SUCCESS, (data) => data);
const customerinfoload = createAction(CUSTOMER_INFO_LOADING, (bool) => bool);
const customerinfofail = createAction(CUSTOMER_INFO_FAILE, (err) => err);

//회원 정보 수정 모달
const CUSTOMER_MODIFY_OPEN = "CUSTOMER_MODIFY_OPEN";
const CUSTOMER_MODIFY_CLOSE = "CUSTOMER_MODIFY_CLOSE";
export const modify_open = createAction(CUSTOMER_MODIFY_OPEN);
export const modify_close = createAction(CUSTOMER_MODIFY_CLOSE);

//회원 수정처리
const CUSTOMER_MODIFY_SUCCESS = "CUSTOMER_MODIFY_SUCCESS";
const CUSTOMER_MODIFY_LOADING = "CUSTOMER_MODIFY_LOADING";
const CUSTOMER_MODIFY_FAILE = "CUSTOMER_MODIFY_FAILE";
const modifydata = createAction(CUSTOMER_MODIFY_SUCCESS, (data) => data);
const modifyload = createAction(CUSTOMER_MODIFY_LOADING, (bool) => bool);
const modifyfail = createAction(CUSTOMER_MODIFY_FAILE, (err) => err);


//비밀번호 수정처리
const PASSWORD_MODIFY_OPEN = "PASSWORD_MODIFY_OPEN";
const PASSWORD_MODIFY_CLOSE = "PASSWORD_MODIFY_CLOSE";
export const pwd_open = createAction(PASSWORD_MODIFY_OPEN, (data) => data);
export const pwd_close = createAction(PASSWORD_MODIFY_CLOSE);

//페이징
const CUSTOMER_PAGE="CUSTOMER_PAGE";
const UPDATE_START_END_PAGE="UPDATE_START_END_PAGE";
export const updateStartEndPage = createAction(UPDATE_START_END_PAGE, ({start, end})=>({start, end}));
export const pageChange = createAction(CUSTOMER_PAGE, (page)=> page);

//회원목록 출력
export const getHootelslist = () => async (dispatch) => {
  dispatch(customerload(true));
  try {
    const { data } = await axios.get("/getCustomers");
    dispatch(customerdata(data));
  } catch (e) {
    dispatch(customerfail(e));
  }

  dispatch(customerload(false));
};

//회원추가
export const addCustomer = (params, config) => async (dispatch) => {
  dispatch(addloading(true));
  try {
    const { data } = await axios.post("/add", params);
    dispatch(addsuccess(data));
    // return data;
  } catch (e) {
    dispatch(addfaile(e));
  }
  dispatch(addloading(false));
};

//아이디 체크
export const addIdchk = (params, config) => async (dispatch) => {
  dispatch(idcheckloading(true));
  try {
    const { data } = await axios.post("/check_id", params);
    dispatch(idchecksuccess(data));
  } catch (e) {
    dispatch(idcheckfaile(e));
  }
  dispatch(idcheckloading(false));
};

//회원 정보
export const CustomerInfo = (param, config) => async (dispatch) => {
    dispatch(customerinfoload(true));
    try {
      const { data } = await axios.post("/proflie", param);
      dispatch(customerinfodata(data));
    } catch (e) {
      dispatch(customerinfofail(e));
    }
    dispatch(customerinfoload(false));
  };

  //회원정보 수정
export const Customermodify =(params, config) => async (dispatch) => {
    dispatch(modifyload(true));
    try{
        const {data} = await axios.post('/customermodify', params);
       dispatch(modifydata(data));

    }catch(e) {
        dispatch(modifyfail(e))
    }
    dispatch(modifyload(false));
    
}

//비밀번호 수정
export const passwordmodify =(params, config) => async (dispatch) => {
    dispatch(modifyload(true));
    try{
        const {data} = await axios.post('/passwordmodify', params);
       dispatch(modifydata(data));

    }catch(e) {
        dispatch(modifyfail(e))
    }
    dispatch(modifyload(false));
    
}




const initalState = {
  customer_load: false, //회원목록 출력 bool  
  customer_list: [], //회원 목록
  customer_fail: "", //회원 목록 출력 실패 에러
  customer_search: "", //검색어

  add_modal: false, //회원 추가 모달창 열기/닫기

  loading: false, //로드 bool값
  error: null, // 에러값
  data: null, //데이터

  user_id: "", //유저아이디
  password: "", //비밀번호
  password_check: "", //비밀번호 확인
  gender: "", //성별
  phone_number: "", //전화번호
  user_name: "", //이름
  year: "", //년도
  month: "", //월
  day: "", //일
  user_kinds: "", //회원 종류
  zipcode: "",// 우편번호
  address1: "", //주소
  address2: "", //상세주소
  post_modal: false, //주소검색 모달창 열기/ 닫기

  info_modal:false, //회원정보 모달 열기/ 닫기
  info_load:false, //회원정보 출력 bool
  info_data:'', //회원 정보
  info_fail:'', //회원정보 출력실패 에러

  customer_modify: false, //회원정보 수정 모달창 열기/닫기

  pwd_modify:false, //비밀번호 수정 모달창 열기/닫기
  pw_id:'', //비밀번호 수정할 아이디
  change_pw:'', //바꿀 비밀번호
  change_pw_chk:'', //비밀번호 체크
  pageSize:10, //화면에 출력 목록갯수
currentPage:1, //현제 페이지
start: 0, //시작페이지
end:10 //끝페이지
};

export default handleActions(
  {
    [CUSTOMER_LIST_LOAD]: (state, action) => ({
      ...state,
      customer_load: !state.user_hotels_load,
    }),
    [CUSTOMERLIST_LOAD_SUCCESS]: (state, action) => ({
      ...state,

      customer_list: action.payload,
    }),
    [CUSTOMER_LIST_LOAD_FAIL]: (state, action) => ({
      ...state,
      customer_fail: action.payload,
    }),
    [CUSTOMER_LIST_CLEAN]: (state, action) => ({
      ...state,
      customer_load: false, //회원목록 출력 bool  
      customer_list: [], //회원 목록
      customer_fail: "", //회원 목록 출력 실패 에러
      customer_search: "", //검색어
    
      add_modal: false, //회원 추가 모달창 열기/닫기
    
      loading: false, //로드 bool값
      error: null, // 에러값
      data: null, //데이터
    
      user_id: "", //유저아이디
      password: "", //비밀번호
      password_check: "", //비밀번호 확인
      gender: "", //성별
      phone_number: "", //전화번호
      user_name: "", //이름
      year: "", //년도
      month: "", //월
      day: "", //일
      user_kinds: "", //회원 종류
      zipcode: "",// 우편번호
      address1: "", //주소
      address2: "", //상세주소
      post_modal: false, //주소검색 모달창 열기/ 닫기
    
      info_modal:false, //회원정보 모달 열기/ 닫기
      info_load:false, //회원정보 출력 bool
      info_data:'', //회원 정보
      info_fail:'', //회원정보 출력실패 에러
    
      customer_modify: false, //회원정보 수정 모달창 열기/닫기
    
      pwd_modify:false, //비밀번호 수정 모달창 열기/닫기
      pw_id:'', //비밀번호 수정할 아이디
      change_pw:'', //바꿀 비밀번호
      change_pw_chk:'', //비밀번호 체크
      pageSize:10, //화면에 출력 목록갯수
    currentPage:1, //현제 페이지
    start: 0, //시작페이지
    end:10 //끝페이지
    }),
    [CUSTOMER_CHANGE_VALUE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    [CUSTOMER_LOADING]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    [CUSTOMER_ADD_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload,
      user_id: "",
      password: "",
      password_check: "",
      gender: "",
      birthday: "",
      phone_number: "",
      user_name: "",
      add_modal: false,
      zipcode: "",
      address1: "",
      address2: "",
      year: "",
      month: "",
      day: "",
      user_kinds: "",
    }),
    [CUSTOMER_ADD_FAILE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [ID_CHECK_LOADING]: (state, action) => ({
      ...state,
      loading: action.password,
    }),
    [ID_CHECK_SUCCESS]: (state, action) => ({
      ...state,
      checked: action.payload,
    }),
    [ID_CHECK_FAILE]: (state, action) => ({
      ...state,
      error: action.password,
    }),
    [ADD_DIALOG_OPEN]: (state, action) => ({
      ...state,
      add_modal: true,
    }),
    [ADD_DIALOG_CLOSE]: (state, action) => ({
      ...state,
      add_modal: false,
      user_id: "", //유저아이디
      password: "", //비밀번호
      password_check: "", //비밀번호 확인
      gender: "", //성별
      phone_number: "", //전화번호
      user_name: "", //이름
      year: "", //년도
      month: "", //월
      day: "", //일
      user_kinds: "", //회원 종류
      zipcode: "",// 우편번호
      address1: "", //주소
      address2: "", //상세주소
    }),
    [POST_DIALOG_OPEN]: (state, action) => ({
      ...state,
      post_modal: true,
    }),
    [POST_DIALOG_CLOSE]: (state, action) => ({
      ...state,
      post_modal: false,
    }),
    [SET_ADDRESS]: (state, action) => ({
      ...state,
      zipcode: action.payload.zipcode,
      address1: action.payload.address,
    }),
    [CUSTOMER_INFO_OPEN]: (state, action) => ({
        ...state,
        info_modal: true,
      }),
      [CUSTOMER_INFO_CLOSE]: (state, action) => ({
        ...state,
        info_modal: false,
      }),
      [CUSTOMER_INFO_LOADING]: (state, action) => ({
          ...state,
            info_load: action.payload
      }),
      [CUSTOMER_INFO_SUCCESS]: (state, action) => ({
        ...state,
          user_id: action.payload.USER_ID,
      gender: action.payload.GENDER,
      phone_number: action.payload.PHONE,
      user_name: action.payload.NAME,
      zipcode: action.payload.ZIPCODE,
      address1: action.payload.ADDRESS1,
      address2: action.payload.ADDRESS2,
      year: action.payload.YEAR,
      month: action.payload.MONTH,
      day: action.payload.DAY,
      user_kinds: action.payload.USER_KINDS,

    }),
    [CUSTOMER_INFO_FAILE]: (state, action) => ({
        ...state,
          info_fail: action.payload
    }),
    [CUSTOMER_MODIFY_OPEN]: (state, action) => ({
        ...state,
        info_modal: false,
        customer_modify: true
    }),
    [CUSTOMER_MODIFY_CLOSE]: (state, action) => ({
        ...state,
        customer_modify: false
    }),
    [CUSTOMER_MODIFY_LOADING]: (state, action) => ({
        ...state,
          info_load: action.payload
    }),
    [CUSTOMER_MODIFY_SUCCESS]: (state, action) => ({
      ...state,
      user_id: "",
      password: "",
      password_check: "",
      gender: "",
      birthday: "",
      phone_number: "",
      user_name: "",
      add_modal: false,
      zipcode: "",
      address1: "",
      address2: "",
      checked: "",
      year: "",
      month: "",
      day: "",
      user_kinds: "",
      post_modal: false,
      info_modal:false,
      info_load:false,
     customer_modify: false,
     pwd_modify: false
  }),
  [CUSTOMER_MODIFY_FAILE]: (state, action) => ({
      ...state,
        info_fail: action.payload
  }),
  [PASSWORD_MODIFY_OPEN]: (state, action) => ({
    ...state,
    pwd_modify: true,
    pw_id: action.payload,      
    change_pw:'', 
    change_pw_chk:'', 
    
}),
[PASSWORD_MODIFY_CLOSE]: (state, action) => ({
    ...state,
    pw_id:'',
    change_pw:'', 
    change_pw_chk:'', 
    pwd_modify: false,
}),
[CUSTOMER_PAGE]: (state, action)=>({
    ...state,
    currentPage: action.payload
}),
[UPDATE_START_END_PAGE]: (state, action)=> ({
  ...state,
  start: action.payload.start,
  end: action.payload.end
}),
  },
  initalState
);
