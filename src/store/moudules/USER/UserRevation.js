import { createAction, handleActions } from "redux-actions";
import axios from "axios";

//value 변경
const CHANGE_VALUE = "CHANGE_VALUE";
const CHANGE_CHK_VALUE = "CHANGE_CHK_VALUE";
export const changevalue = createAction(CHANGE_VALUE, ({ key, value }) => ({key,value}));
export const changechk = createAction(CHANGE_CHK_VALUE, ({ key, checked }) => ({key,checked}));

//전체 체크
const CHANGE_CHK_ALL = "CHANGE_CHK_ALL";
export const changechkall = createAction(CHANGE_CHK_ALL);

//결제방법
const CHOICE_PAYMENT = "CHOICE_PAYMENT";
export const choicepayment = createAction(CHOICE_PAYMENT, (data) => data);

//은행계좌변경
const CHANGE_ACCOUNT = "CHANGE_ACCOUNT";
export const changeaccount = createAction(CHANGE_ACCOUNT, ({ key, value }) => ({key,value}));

//예약정보 등록
const INIT_DATA_PASS = "INIT_DATA_PASS";
const INIT_DATA_SAVE = "INIT_DATA_SAVE";
const INIT_DATA_FAIL = "INIT_DATA_FAIL";
const initdatapass = createAction(INIT_DATA_PASS, (bool) => bool);
const initdatasave = createAction(INIT_DATA_SAVE, (data) => data);
const initdatafail = createAction(INIT_DATA_FAIL, (err) => err);


//예약등록
export const initReservData = (params, config) => async (dispatch) => {
  dispatch(initdatapass(true));
  try {
    const { data } = await axios.post("/reservation", params);
     if(data === 1){
      dispatch(initdatasave(data));
      return data;
     }
  } catch (e) {
    dispatch(initdatafail(e));
  }
  dispatch(initdatapass(false));
};

const initialState = {
  reserv_name: "", //예약자 이름
  reserv_phone_number: "", //예약자 전화번호
  TermsofUse_All: false, //약관동의 체크값
  TermsofUse_1: false,
  TermsofUse_2: false,
  TermsofUse_3: false,
  TermsofUse_4: false,
  TermsofUse_5: false,
  TermsofUse_6: false,
  payment: "", //결제방법
  account: "", //입금 계좌
  init_pass: false,  //예약정보 등록 처리 bool 값
  init_save: "", //예약정보 등록
  init_fail: "", //예약정보 등록 실패시 에러

};

export default handleActions(
  {
    [CHANGE_VALUE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    [CHANGE_CHK_VALUE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.checked,
    }),
    [CHANGE_CHK_ALL]: (state, action) => ({
      ...state,
      TermsofUse_All: !state.TermsofUse_All,
      TermsofUse_1: !state.TermsofUse_1,
      TermsofUse_2: !state.TermsofUse_2,
      TermsofUse_3: !state.TermsofUse_3,
      TermsofUse_4: !state.TermsofUse_4,
      TermsofUse_5: !state.TermsofUse_5,
      TermsofUse_6: !state.TermsofUse_6,
    }),
    [CHOICE_PAYMENT]: (state, action) => ({
      ...state,
      payment: action.payload,
    }),
    [INIT_DATA_PASS]: (state, action) => ({
      ...state,
      init_pass: action.payload,
    }),
    [INIT_DATA_SAVE]: (state, action) => ({
      ...state,
      init_save: action.payload,
    }),
    [INIT_DATA_FAIL]: (state, action) => ({
      ...state,
      init_fail: action.payload,
    }),
    [CHANGE_ACCOUNT]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
  },
  initialState
);
