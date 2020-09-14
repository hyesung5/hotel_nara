import { createAction, handleActions } from "redux-actions";

//value 체인지
const CHANGE_VALUE = "CHANGE_VALUE";
export const changeValue = createAction(CHANGE_VALUE, ({ key, value }) => ({
  key,
  value,
}));
//check 체인지
const CHANGE_CHECK = "CHANGE_CHECK";
export const changeCheck = createAction(CHANGE_CHECK, ({ key, checked }) => ({
  key,
  checked,
}));
//전체 체크
const ALL_CHECKE = "ALL_CHECKE";
export const AllCheck = createAction(ALL_CHECKE, ({ key, checked }) => ({
  key,
  checked,
}));

//체크값 초기화
const CHK_CLEAN = "CHK_CLEAN";
export const chkclean = createAction(CHK_CLEAN);





const initialState = {
  checked: false, //체크 값
  All_chekced: false, //전체 체크 값
  Terms_of_Use: false, //약관동의(필수) 체크값
  Collection_of_personal_information: false, //개인정보 제공동의(필수) 체크값
  Location_information: false, //위치정보제공 동의(선택) 체크값
  Collection_of_personal_information2: false, //개인정보 동의 (선택) 체크값
};

export default handleActions(
  {
    //value 체인지
    [CHANGE_VALUE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    //체크값 체인지
    [CHANGE_CHECK]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.checked,
    }),
    //전체 체크
    [ALL_CHECKE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.checked,
      Terms_of_Use: action.payload.checked,
      Collection_of_personal_information: action.payload.checked,
      Location_information: action.payload.checked,
      Collection_of_personal_information2: action.payload.checked,
    }),
    //체크값 초기화
    [CHK_CLEAN]: (state, action) => ({
      ...state,
      checked: false,
      dis: true,
      All_chekced: false,
      Terms_of_Use: false,
      Collection_of_personal_information: false,
      Location_information: false,
      Collection_of_personal_information2: false,
    }),
  },
  initialState
);
