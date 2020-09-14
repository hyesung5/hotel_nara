import { createAction, handleActions } from "redux-actions";
import axios from "axios";

// //호텔 검색
const SEARCH_HOTELNAME_VALUE = "SEARCH_HOTELNAME_VALUE";
export const search_hotelname_value = createAction(
  SEARCH_HOTELNAME_VALUE,
  ({ key, value }) => ({ key, value })
);

//호텔 목록 출력
const HOTEL_LOADING = "HOTEL_LODING";
const HOTEL_FAILE = "HOTEL_FAILE";
const LOAD_SUCCESS = "LOAD_SUCCESS";
const loading = createAction(HOTEL_LOADING, (bool) => bool);
const loadsuccess = createAction(LOAD_SUCCESS, (data) => data);
const faile = createAction(HOTEL_FAILE, (err) => err);

//호텔 정보 모달창
const ONPEN_VIEW = "ONPEN_VIEW";
const CLOSE_VIEW = "CLOSE_VIEW";

export const closeView = createAction(CLOSE_VIEW);

//호텔 정보 출력
const LOAD_INFO = "LOAD_INFO";
const loadInfo = createAction(LOAD_INFO, (data) => data);

//정보 수정 모달창
const INFO_MODIFY = "INFO_MODIFY";
const CLOSE_MODIFY = "CLOSE_MODIFY";
export const infomodify = createAction(INFO_MODIFY);
export const closeModify = createAction(CLOSE_MODIFY);

//정보수정
const MODIFY_CHANGE_VALUE = "MODIFY_CHANGE_VALUE";
const MODIFY_CHANGE_EDITOR = "MODIFY_CHANGE_EDITOR";
const MODIFY_CHANGE_CHECK = "MODIFY_CHANGE_CHECK";
export const changeValue = createAction(
  MODIFY_CHANGE_VALUE,
  ({ key, value }) => ({ key, value })
);
export const modifyEditor = createAction(MODIFY_CHANGE_EDITOR, (data) => data);
export const changeCheck = createAction(
  MODIFY_CHANGE_CHECK,
  ({ key, checked }) => ({ key, checked })
);

//정보 수정처리
const MODIFY_SUCCESS = "MODIFY_SUCCESS";
const MODIFY_FILE = "MODIFY_FILE";
const FILE_DELETE = "FILE_DELETE";
const modifysuccess = createAction(MODIFY_SUCCESS, (data) => data);
export const modifyfile = createAction(MODIFY_FILE, ({ key, file }) => ({
  key,
  file,
}));
export const filedelete = createAction(FILE_DELETE);

//페이지 이동
const HOTEL_LIST_PAGE_CHANGE = "HOTEL_LIST_PAGE_CHANGE";
export const listpageChange = createAction(
  HOTEL_LIST_PAGE_CHANGE,
  (page) => page
);

//호텔 삭제
const HOTEL_DELETE_LOAD = "HOTEL_DELETE_LOAD";
const HOTEL_DELETE = "HOTEL_DELETE";
const HOTEL_DELETE_FAIL = "HOTEL_DHOTEL_DELETE_FAILELETE";
const delete_load = createAction(HOTEL_DELETE_LOAD, (bool) => bool);
const delete_success = createAction(HOTEL_DELETE, (bool) => bool);
const delete_fail = createAction(HOTEL_DELETE_FAIL, (bool) => bool);

const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
const UPDATE_START_END_PAGE = "UPDATE_START_END_PAGE";
export const updateCurrentPage = createAction(
  UPDATE_CURRENT_PAGE,
  (page) => page
);
export const updateStartEndPage = createAction(
  UPDATE_START_END_PAGE,
  ({ start, end }) => ({ start, end })
);

//스테이트 초기화
const STATE_CLEAN = "STATE_CLEAN";
export const stateClean = createAction(STATE_CLEAN);

// 관리자전용 호텔 목록 출력
export const getHotellist_admin = (param, config) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const { data } = await axios.post("/getHotellist/admin", param);
    dispatch(loadsuccess(data));
  } catch (e) {
    dispatch(faile(e));
  }
  dispatch(loading(false));
};

//사업자 전용 호텔목록
export const getHootellist = (param, config) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const { data } = await axios.post("/getHotellist", param);
    dispatch(loadsuccess(data));
  } catch (err) {
    dispatch(faile(err));
  }

  dispatch(loading(false));
};

//호텔 정보 출력
// export const openView = createAction(ONPEN_VIEW);
export const openView = (params, config) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const { data } = await axios.post("/viewHotel", params);
    dispatch(loadInfo(data));
  } catch (err) {
    dispatch(faile(err));
  }
  dispatch(loading(false));
};

//호텔 정보 수정
export const hotelInfomodify = (formData, conmfig) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const { data } = await axios.post("/HotelMod", formData);
    dispatch(modifysuccess(data));
    return data;
  } catch (err) {
    dispatch(faile(err));
    dispatch(loading(false));
  }
  dispatch(loading(false));
};

//호텔 삭제
export const hoteldelete = (param, conmfig) => async (dispatch) => {
  dispatch(delete_load(true));
  try {
    const { data } = await axios.post("/HotelDelete", param);
    dispatch(delete_success(data));
  } catch (err) {
    dispatch(delete_fail(err));
  }
  dispatch(delete_load(false));
};

const initialState = {
  hotellist: [], // 호텔 목록
  loding: false, //목록 풀력전 bool값
  err: "", // 목록 출력 실패시 에러
  infoView: false, //호텔 정보 모달창 열기/ 닫기
  hotelNm: "", //호텔 이름
  hotelIf: "", //호텔 정보
  hotelTel: "", //호텔 전화번호
  hotelZip: "", //호텔 우편번호
  hotelAdd1: "", //호텔 주소
  hotelAdd2: "", //호텔 상세주소
  spa: false, //호텔 옵션
  restaurant: false,
  banquethall: false,
  parkinglot: false,
  buffet: false,
  desk: false,
  bar: false,
  luggage: false,
  fitness: false,
  sauna: false,
  wifi: false,
  coffeeshop: false,
  paidlaundry: false,
  smokingarea: false,
  amenities: false,
  business: false,
  breakfast: false,
  onMody: false, // 수정 모달창 열기/ 닫기
  msucc: "", //수정 완료
  hotel_id: "", //호텔 아이디
  thumbnail: "", //호텔 이미지파일
  filechk: false, // 파일수정시 체크값
  pageSize: 10, //출력갯수
  currentPage: 1, //현제 페이지
  hotel_delate_load: false, //호텔 삭제 bool값
  hotel_delate_data: "", //호텔 삭제 처리
  hotel_delate_fail: "", //호텔 삭제 처리 실패 에러
  search: "", //검색어
  start: 0,
  end: 10,
};

export default handleActions(
  {
    [HOTEL_LOADING]: (state, action) => ({
      ...state,
      loding: action.payload,
    }),
    [LOAD_SUCCESS]: (state, action) => ({
      ...state,
      hotellist: action.payload,
    }),
    [HOTEL_FAILE]: (state, action) => ({
      ...state,
      err: action.payload,
    }),
    [ONPEN_VIEW]: (state, action) => ({
      ...state,
      infoView: true,
    }),
    [CLOSE_VIEW]: (state, action) => ({
      ...state,
      infoView: false,
    }),
    [LOAD_INFO]: (state, action) => ({
      ...state,
      infoView: true,
      hotelNm: action.payload.HOTEL_NAME,
      hotelIf: action.payload.HOTEL_INFO,
      hotelZip: action.payload.ZIPCODE,
      hotelAdd1: action.payload.ADDRESS1,
      hotelAdd2: action.payload.ADDRESS2,
      spa: action.payload.SPA,
      restaurant: action.payload.RESTAURANT,
      banquethall: action.payload.BANQUEATHALL,
      parkinglot: action.payload.PARKING_LOT,
      buffet: action.payload.BUFFET,
      desk: action.payload.DESK,
      bar: action.payload.BAR,
      luggage: action.payload.LUGGAGE,
      fitness: action.payload.FITNESS,
      sauna: action.payload.SAUNA,
      wifi: action.payload.WIFI,
      coffeeshop: action.payload.COFFEESHOP,
      paidlaundry: action.payload.PAIDLAUNDRY,
      smokingarea: action.payload.SMOKINGAREA,
      amenities: action.payload.AMENITIES,
      business: action.payload.BUSINESS,
      breakfast: action.payload.BREAKFAST,
      hotel_id: action.payload.id,
      thumbnail: action.payload.THUMBNAIL,
    }),
    [INFO_MODIFY]: (state, action) => ({
      ...state,
      infoView: false,
      onMody: true,
    }),
    [CLOSE_MODIFY]: (state, action) => ({
      ...state,
      onMody: false,
      filechk: false,
    }),
    [MODIFY_CHANGE_VALUE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    [MODIFY_CHANGE_EDITOR]: (state, action) => ({
      ...state,
      hotelIf: action.payload,
    }),
    [MODIFY_CHANGE_CHECK]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.checked,
    }),
    [MODIFY_SUCCESS]: (state, action) => ({
      ...state,
      msucc: action.payload,
      onMody: false,
      filechk: false,
    }),
    [MODIFY_FILE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.file,
      filechk: true,
    }),
    [FILE_DELETE]: (state, action) => ({
      ...state,
      thumbnail: "",
      filechk: true,
    }),
    [HOTEL_LIST_PAGE_CHANGE]: (state, action) => ({
      ...state,

      currentPage: action.payload,
    }),
    [HOTEL_DELETE_LOAD]: (state, action) => ({
      ...state,
      hotel_delate_load: action.payload,
    }),
    [HOTEL_DELETE]: (state, action) => ({
      ...state,
      hotel_delate_data: action.payload,
    }),
    [HOTEL_DELETE_FAIL]: (state, action) => ({
      ...state,
      hotel_delate_fail: action.payload,
    }),
    [SEARCH_HOTELNAME_VALUE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    [UPDATE_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload,
    }),
    [UPDATE_START_END_PAGE]: (state, action) => ({
      ...state,
      start: action.payload.start,
      end: action.payload.end,
    }),
    [STATE_CLEAN]: (state, action) => ({
      ...state,
      hotellist: [], // 호텔 목록
      loding: false, //목록 풀력전 bool값
      err: "", // 목록 출력 실패시 에러
      infoView: false, //호텔 정보 모달창 열기/ 닫기
      hotelNm: "", //호텔 이름
      hotelIf: "", //호텔 정보
      hotelTel: "", //호텔 전화번호
      hotelZip: "", //호텔 우편번호
      hotelAdd1: "", //호텔 주소
      hotelAdd2: "", //호텔 상세주소
      spa: false, //호텔 옵션
      restaurant: false,
      banquethall: false,
      parkinglot: false,
      buffet: false,
      desk: false,
      bar: false,
      luggage: false,
      fitness: false,
      sauna: false,
      wifi: false,
      coffeeshop: false,
      paidlaundry: false,
      smokingarea: false,
      amenities: false,
      business: false,
      breakfast: false,
      onMody: false, // 수정 모달창 열기/ 닫기
      msucc: "", //수정 완료
      hotel_id: "", //호텔 아이디
      thumbnail: "", //호텔 이미지파일
      filechk: false, // 파일수정시 체크값
      pageSize: 10, //출력갯수
      currentPage: 1, //현제 페이지
      hotel_delate_load: false, //호텔 삭제 bool값
      hotel_delate_data: "", //호텔 삭제 처리
      hotel_delate_fail: "", //호텔 삭제 처리 실패 에러
      search: "", //검색어
      start: 0,
      end: 10,
    }),
  },

  initialState
);
