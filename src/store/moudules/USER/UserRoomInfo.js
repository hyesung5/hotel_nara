import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import moment from "moment";

// 방정보 출력
const USER_ROOM_INFO_LOAD = "USER_ROOM_INFO_LOAD";
const USER_ROOM_INFO_SUCCESS = "USER_ROOM_INFO_SUCCESS";
const USER_ROOM_INFO_FAIL = "USER_ROOM_INFO_FAIL";
const roominfoload = createAction(USER_ROOM_INFO_LOAD, (bool) => bool);
const roominfodata = createAction(USER_ROOM_INFO_SUCCESS, (data) => data);
const roominfofail = createAction(USER_ROOM_INFO_FAIL, (err) => err);

//예약 날짜 선택
const SELECTED_STARTDATE = "SELECTED_STARTDATE";
const SELECTED_ENDDATE = "SELECTED_ENDDATE";
export const seletedstartdate = createAction(SELECTED_STARTDATE,(startDate) => startDate);
export const seletedenddate = createAction(SELECTED_ENDDATE, (endDate) => endDate);

//선택한 기간
const SELECTED_DAYS = "SELECTED_DAYS";
export const selectdays = createAction(SELECTED_DAYS, (days) => days);

//달력 모달창
const CALENDAR_DIALOG_OPEN = "CALENDAR_DIALOG_OPEN";
const CALENDAR_DIALOG_CLOSE = "CALENDAR_DIALOG_CLOSE";
export const calendaropen = createAction(CALENDAR_DIALOG_OPEN);
export const calendarclose = createAction(CALENDAR_DIALOG_CLOSE);

//다른 유저의 예약정보 출력(날짜만 출력)
const GET_RESERV_LOAD = "GET_RESERV_LOAD";
const GET_RESERV_DATA = "GET_RESERV_DATA";
const GET_RESERV_FAIL = "GET_RESEGET_RESERV_FAILRV_DATA";
const getreservload = createAction(GET_RESERV_LOAD, (bool) => bool);
const getreserdata = createAction(GET_RESERV_DATA, (data) => data);
const getreservfail = createAction(GET_RESERV_FAIL, (err) => err);

//초기화
const CLEAN_INFO = "CLEAN_INFO";
export const cleaninfo = createAction(CLEAN_INFO);


//방정보 출력
export const getRoominfoData = (param, config) => async (dispatch) => {
  dispatch(roominfoload(true));
  try {
    const { data } = await axios.post("/getUserRoomInfo", param);
    dispatch(roominfodata(data));
  } catch (e) {
    dispatch(roominfofail(e));
  }
  dispatch(roominfoload(false));
};

//다른 유저의 예약 날짜출력
export const getReservinfoData = (param, config) => async (dispatch) => {
  dispatch(getreservload(true));
  try {
    const { data } = await axios.post("/getReservInfo", param);
    dispatch(getreserdata(data));
  } catch (e) {
    dispatch(getreservfail(e));
  }
  dispatch(getreservload(false));
};

//기본날짜 저장을 위한 값
var today = new Date();
var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

const initialState = {
  room_data: "", //방정보 출력
  data_load: false, //방정보 출력 bool
  data_load_fail: "", //방정보 출력 실패시 에러
  setDate: false, //예약 시작날과 마지막날 저장을 위한 스테이트
  reserv_days: [], // 예약자가 선택한 시간의 날짜들
  reserv_data: [], // 다른 유저의 예약날짜
  reserv_load: false, // 다른 유저의 예약날 출력 bool
  reserv_fail: "", // 다른 유저의 예약날 출력 실패시 에러
  calendarmodal: false, //달력 모달 열기/ 닫기
  startDate: moment(today).format("YYYY-MM-DD"), //예약 시작날
  endDate: moment(tomorrow).format("YYYY-MM-DD"), //예약 마지막날
  imgfiles: [], // 방정보의 이미지
  room_id: "", // 방 아이디
  room_name: "", //방이름
  hotel_name: "", //호텔이름
  room_info: "", //방정보
  reservation_notice: "", //예약 공지
  cancellation_policy: "", //취소 규정
  check_in: "", //체크인 가능시간
  check_out: "", //체크아웃 가능시간
  price: "", //가격
  hotel_id: "", //호텔아이디
  location: "", // 호텔 구역
  accommodation_type: "", // 업체 종류
  address: "", // 주소
};

export default handleActions(
  {
    [USER_ROOM_INFO_LOAD]: (state, action) => ({
      ...state,
      data_load: action.payload,
    }),
    [USER_ROOM_INFO_SUCCESS]: (state, action) => ({
      ...state,
      room_data: action.payload,
      room_id: action.payload.ROOM_ID,
      room_name: action.payload.ROOM_NAME,
      hotel_name: action.payload.HOTEL_NAME,
      room_info: action.payload.ROOM_INFO,
      reservation_notice: action.payload.RESERVATION_NOTICE,
      cancellation_policy: action.payload.CANCELLATION_POLICY,
      check_in: action.payload.CHECK_IN,
      check_out: action.payload.CHECK_OUT,
      price: action.payload.PRICE,
      hotel_id: action.payload.HOTEL_ID,
      location: action.payload.LOCATION,
      accommodation_type: action.payload.ACCOMMODATION_TYPE,

      imgfiles: action.payload.IMAGE_FILES.split(","),

      address: action.payload.ADDRESS1,
    }),
    [USER_ROOM_INFO_FAIL]: (state, action) => ({
      state,
      data_load_fail: action.payload,
    }),
    [SELECTED_STARTDATE]: (state, action) => ({
      ...state,

      startDate: action.payload,
      endDate: "",
      setDate: !state.setDate,
    }),
    [SELECTED_ENDDATE]: (state, action) => ({
      ...state,

      endDate: action.payload,
      setDate: !state.setDate,
    }),
    [SELECTED_DAYS]: (state, action) => ({
      ...state,
      reserv_days: action.payload,
    }),
    [CALENDAR_DIALOG_OPEN]: (state, action) => ({
      ...state,
      calendarmodal: !state.calendarmodal,
    }),
    [CALENDAR_DIALOG_CLOSE]: (state, action) => ({
      ...state,
      calendarmodal: !state.calendarmodal,
    }),
    [CLEAN_INFO]: (state, action) => ({
      ...state,
      room_data: "",
      data_load: false,
      data_load_fail: "",
      setDate: false,
      reserv_days: "",
      reserv_data: "",
      calendarmodal: false,
      startDate: "",
      endDate: "",
      imgfiles: [],
      room_id: "",
      room_name: "",
      hotel_name: "",
      room_info: "",
      reservation_notice: "",
      cancellation_policy: "",
      check_in: "",
      check_out: "",
      price: "",
      hotel_id: "",
      location: "",
      accommodation_type: "",
      address: "",
    }),
    [GET_RESERV_LOAD]: (state, action) => ({
      ...state,
      reserv_load: action.payload,
    }),
    [GET_RESERV_DATA]: (state, action) => ({
      ...state,
      reserv_data: action.payload.RE_DATES.split(","),
    }),
    [GET_RESERV_FAIL]: (state, action) => ({
      ...state,
      reserv_fail: action.payload,
    }),
  },
  initialState
);
