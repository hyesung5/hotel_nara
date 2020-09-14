import { createAction, handleActions } from "redux-actions";
import { modifyFiles } from "../../utils/modifyFiles";
import { modifyFilenames } from "../../utils/modifyFilename";
import axios from "axios";
import { toArray } from "lodash";

//모달
const ROOM_MODAL_OPEN = "ROOM_MODAL_OPEN";
const ROOM_MODAL_CLOSE = "ROOM_MODAL_CLOSE";
export const roommodalopen = createAction(ROOM_MODAL_OPEN);
export const roommodalclose = createAction(ROOM_MODAL_CLOSE);

const ROOM_INFO_OPEN = "ROOM_INFO_OPEN";
const ROOM_INFO_CLOSE = "ROOM_INFO_CLOSE";
export const infomodalopen = createAction(ROOM_INFO_OPEN);
export const infomodalclose = createAction(ROOM_INFO_CLOSE);

const ROOM_MODY_OPEN = "ROOM_MODY_OPEN";
const ROOM_MODY_CLOSE = "ROOM_MODY_CLOSE";
export const modymodalopen = createAction(ROOM_MODY_OPEN);
export const modymodalclose = createAction(ROOM_MODY_CLOSE);

const RESERVATION_LIST_OPEN = "RESERVATION_LIST_OPEN";
const RESERVATION_LIST_CLOSE = "RESERVATION_LIST_CLOSE";
export const reslistopen = createAction(RESERVATION_LIST_OPEN);
export const reslistclose = createAction(RESERVATION_LIST_CLOSE);

//velue
const ROOM_VALUE_CHANGE = "ROOM_VALUE_CHANGE";
const ROOM_INFO_CHANGE = "ROOM_INFO_CHANGE";
const ROOM_RESERV_CHANGE = "ROOM_RESERV_CHANGE";
const ROOM_CANCLE_CHANGE = "ROOM_CANCLE_CHANGE";
const ROOM_FILE_CHANGE = "ROOM_FILE_CHANGE";
const ROOM_SEARCH_VALUE = "ROOM_SEARCH_VALUE";
export const roomvaluechange = createAction(
  ROOM_VALUE_CHANGE,
  ({ key, value }) => ({ key, value })
);
export const roominfochange = createAction(ROOM_INFO_CHANGE, (data) => data);
export const roomreservchange = createAction(
  ROOM_RESERV_CHANGE,
  (data) => data
);
export const roomcanclechange = createAction(
  ROOM_CANCLE_CHANGE,
  (data) => data
);
export const roomfilechange = createAction(
  ROOM_FILE_CHANGE,
  ({ files, fileName }) => ({ files, fileName })
);
export const search_room_value = createAction(
  ROOM_SEARCH_VALUE,
  ({ key, value }) => ({ key, value })
);

//방정보등록
const ROOM_REG_LOAD = "ROOM_REG_LOAD";
const ROOM_REG_SUCCESS = "ROOM_REG_SUCCESS";
const ROOM_REG_FAIL = "ROOM_REG_FAIL";
const roomRegload = createAction(ROOM_REG_LOAD, (bool) => bool);
const roomRegsuccess = createAction(ROOM_REG_SUCCESS, (data) => data);
const roomRegfail = createAction(ROOM_REG_FAIL, (err) => err);

//호텔이름 출력
const HOTEL_NAME_LOAD = "HOTEL_NAME_LOAD";
const HOTEL_NAME_LOAD_SUCCESS = "HOTEL_NAME_LOAD_SUCCESS";
const HOTEL_NAME_LOAD_FAIL = "HOTEL_NAME_LOAD_FAIL";
const hotelNameload = createAction(HOTEL_NAME_LOAD, (bool) => bool);
const hotelNamesuccess = createAction(HOTEL_NAME_LOAD_SUCCESS, (data) => data);
const hotelNamefail = createAction(HOTEL_NAME_LOAD_FAIL, (err) => err);

//select box value 값 변경
const SELECT_HOTEL_VALUE = "SELECT_HOTEL_VALUE";
export const selectHotelvalue = createAction(
  SELECT_HOTEL_VALUE,
  ({ key, value }) => ({ key, value })
);

//방목록
const ROOM_LIST_LOAD = "ROOM_LIST_LOAD";
const ROOM_LIST_LOAD_SUCCESS = "ROOM_LIST_LOAD_SUCCESS";
const ROOM_LIST_LOAD_FAIL = "ROOM_LIST_FAIL";
const roomListload = createAction(ROOM_LIST_LOAD, (bool) => bool);
const roomListsuccess = createAction(ROOM_LIST_LOAD_SUCCESS, (data) => data);
const roomListfail = createAction(ROOM_LIST_LOAD_FAIL, (err) => err);

//방정보
const ROOM_INFO_LOAD = "ROOM_INFO_LOAD";
const ROOM_INFO_LOAD_SUCCESS = "ROOM_INFO_LOAD_SUCCESS";
const ROOM_INFO_LOAD_FAIL = "ROOM_INFO_FAIL";
const roomInfoload = createAction(ROOM_INFO_LOAD, (bool) => bool);
const roomInfosuccess = createAction(ROOM_INFO_LOAD_SUCCESS, (data) => data);
const roomInfofail = createAction(ROOM_INFO_LOAD_FAIL, (err) => err);

//방 정보 수정
const ROOM_MODY_LOAD = "ROOM_MODY_LOAD";
const ROOM_MODY_SUCCESS = "ROOM_MODY_SUCCESS";
const ROOM_MODY_FAIL = "ROOM_MODY_FAIL";
const roomModyload = createAction(ROOM_MODY_LOAD, (bool) => bool);
const roomModysuccess = createAction(ROOM_MODY_SUCCESS, (data) => data);
const roomModyfail = createAction(ROOM_MODY_FAIL, (err) => err);

//이미지 삭제
const IMG_FILE_DELETE = "IMG_FILE_DELETE";
const NEW_IMG_DELETE = "NEW_IMG_DELETE";
export const imgFiledelete = createAction(IMG_FILE_DELETE, (id) => id);
export const newImgdelete = createAction(NEW_IMG_DELETE, (id) => id);

//방 정보 삭제
const ROOM_DELETE_LOAD = "ROOM_DELETE_LOAD";
const ROOM_DELETE_SUCCESS = "ROOM_DELETE_SUCCESS";
const ROOM_DELETE_FAIL = "ROOM_DELETE_FAIL";
const roomDeleteload = createAction(ROOM_DELETE_LOAD, (bool) => bool);
const roomDeleteuccess = createAction(ROOM_DELETE_SUCCESS, (data) => data);
const roomDeletefail = createAction(ROOM_DELETE_FAIL, (err) => err);

//예약정보 출력
const LIST_RESERVATION_LOAD = "LIST_RESERVATION_LOAD";
const LIST_RESERVATION_SUCCESS = "LIST_RESERVATION_SUCCESS";
const LIST_RESERVATION_FAIL = "LIST_RESERVATION_FAIL";
const listresvation_load = createAction(LIST_RESERVATION_LOAD, (bool) => bool);
const listresvation_success = createAction(
  LIST_RESERVATION_SUCCESS,
  (data) => data
);
const listresvation_fail = createAction(LIST_RESERVATION_FAIL, (err) => err);

//페이지 이동
const PAGE_CHANGE = "PAGE_CHANGE";
export const pageChange = createAction(PAGE_CHANGE, (page) => page);

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

//초기화
const STATE_CLEAN ="STATE_CLEAN";
export const stateClean = createAction(STATE_CLEAN);


//호텔 목록 출력
export const getHotellist = (params, config) => async (dispatch) => {
  dispatch(hotelNameload(true));
  try {
    const { data } = await axios.post("/hotelNameList", params);
    dispatch(hotelNamesuccess(data));
  } catch (e) {
    dispatch(hotelNamefail(e));
  }
  dispatch(hotelNameload(true));
};
//방목록 출력
export const getRoomlist = (params, config) => async (dispatch) => {
  dispatch(roomListload(true));
  try {
    const { data } = await axios.post("/hotelRoomlist", params);
    dispatch(roomListsuccess(data));
  } catch (e) {
    dispatch(roomListfail(e));
  }
  dispatch(roomListload(true));
};

//방등록 처리
export const roomRegist = (formData, config) => async (dispatch) => {
  dispatch(roomRegload(true));
  try {
    const { data } = await axios.post("/roomregist", formData);
    dispatch(roomRegsuccess(data));
    if (data !== "") {
      dispatch(roomRegload(false));
      return data;
    }
  } catch (e) {
    dispatch(roomRegfail(e));
  }
  dispatch(roomRegload(false));
};

//방정보 출력
export const roomInfo = (params, config) => async (dispatch) => {
  dispatch(roomInfoload(true));
  try {
    const { data } = await axios.post("/hotelRoomInfo", params);
    dispatch(roomInfosuccess(data));

    dispatch(infomodalopen());
  } catch (e) {
    dispatch(roomInfofail(e));
  }
  dispatch(roomInfoload(false));
};

//방정보 수정
export const roomInfomody = (formData, config) => async (dispatch) => {
  dispatch(roomModyload(true));
  try {
    const { data } = await axios.post("/roomInfomody", formData);
    dispatch(roomModysuccess(data));
    return data;
  } catch (e) {
    dispatch(roomModyfail(e));
  }
  dispatch(roomModyload(false));
};

//방 정보 삭제
export const roomInfodelete = (param, config) => async (dispatch) => {
  dispatch(roomDeleteload(true));
  try {
    const { data } = await axios.post("/RoomDelete", param);
    dispatch(roomDeleteuccess(data));
    return data;
  } catch (e) {
    dispatch(roomDeletefail(e));
  }
  dispatch(roomDeleteload(false));
};

//예약 목록
export const RV_list = (params, config) => async (dispatch) => {
  dispatch(listresvation_load(true));
  try {
    const { data } = await axios.post("/getReservation_list", params);
    dispatch(listresvation_success(data));
    //  return data;
  } catch (e) {
    dispatch(listresvation_fail(e));
  }
  dispatch(listresvation_load(false));
};

//관리자용 호텔목록 출력
export const getHotellistAdmin = (params, config) => async (dispatch) => {
  dispatch(hotelNameload(true));
  try {
    const { data } = await axios.post("/hotelNameList/admin", params);
    dispatch(hotelNamesuccess(data));
  } catch (e) {
    dispatch(hotelNamefail(e));
  }
  dispatch(hotelNameload(true));
};

//관리자용 호텔방목록 출력
export const getRoomlistAdmin = (params, config) => async (dispatch) => {
  dispatch(roomListload(true));
  try {
    const { data } = await axios.post("/hotelRoomlist/admin", params);
    dispatch(roomListsuccess(data));
  } catch (e) {
    dispatch(roomListfail(e));
  }
  dispatch(roomListload(true));
};

const initalState = {
  room_list: [], //방 목록
  room_list_load: false, //방목록 출력 처리전 bool값 처리
  room_list_fail: "", //방목록 출력 실패시 에러
  hotellist: [], //호텔 목록
  hotelList_load: false, //호텔목록 출력 처리전 bool값 처리
  hotelList_fail: "", //호텔목록 출력실패시 에러
  hotel_name: "", //호텔이름
  hotel_id: "", //호텔 아이디
  hotel_location: "", //호텔 지역
  hotel_accommodation_type: "", //사업체 종류
  room_modal: false, // 방등록 모달창 열기/ 닫기
  room_name: "", //방이름
  room_info: "", //방정보
  reservationnotice: "", //예약규정
  cancellationpolicy: "", //취소약관
  checkin: "", //체크인 시간
  checkout: "", //체크아웃 시간
  price: "", //가격
  imgfile: "", //이미지 파일
  imgfilename: "", //이미지 파일 이름
  imgfilenames: {
    type: Array,
  }, //파일 이름 목록
  imgfiles: {
    type: Array,
  }, //파일 목록
  room_reg_load: false, //방정보 등록 처리전 bool값
  room_reg_fail: "", //방정보 등록 실패시 에러
  room_reg_success: "", //방정보 등록 성공시 값저장
  roominfo_load: false, //방정보 출력전 bool값
  roominfo_success: "", //방정보 출력 성공
  roominfo_fail: "", //방정보 로딩 실패시 에러
  roominfo_modal: false, // 방정보 출력 모달창 열기/ 닫기
  info_img: [], //방정보 출력시 이미지 목록
  mody_modal: false, // 방정보 수정 모달창 열기/ 닫기
  info_mody: false, //방정보 수정저 bool값
  info_mody_success: "", // 방정보 수정 성공
  info_mody_fail: "", //방정보 수정 실패시 에러
  room_id: "", //방 아이디
  room_delete_load: false, //방정보 삭제전 bool값
  room_delete_data: "", //방정보 삭제 성공
  room_delete_fail: "", // 방 정보 삭제 실패시 에러
  reservation_modal: false, // 예약 목록 모달창 열기/ 닫기
  reservation_list: [], //예약 목록
  reservation_list_load: false, //예약 목록 출력전 bool 값
  reservation_list_fail: "", // 예약목록 출력 실패시 에러
  search_room: "", //검색창 검색어
  pageSize: 10, //출력 페이지 갯수
  currentPage: 1, //현재페이지
  pageNum: 10,
  start: 0,
  end: 10,
};

export default handleActions(
  {
    //방등록 모달창 오픈
    [ROOM_MODAL_OPEN]: (state, action) => ({
      ...state,
      room_modal: !state.room_modal,
      room_name: "",
      room_info: "",
      reservationnotice: "",
      cancellationpolicy: "",
      checkin: "",
      checkout: "",
      price: "",
      imgfile: "",
      imgfilename: "",
      imgfilenames: {
        type: Array,
      },
      imgfiles: {
        type: Array,
      },
      hotel_name: "",
    }),
    //방등록 모달창 닫기
    [ROOM_MODAL_CLOSE]: (state, action) => ({
      ...state,
      room_modal: !state.room_modal,
      room_name: "",
      room_info: "",
      reservationnotice: "",
      cancellationpolicy: "",
      checkin: "",
      checkout: "",
      price: "",
      imgfile: "",
      imgfilename: "",
      imgfilenames: {
        type: Array,
      },
      imgfiles: {
        type: Array,
      },
      hotel_name: "",
    }),
    //방 등록 value값
    [ROOM_VALUE_CHANGE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    //예약 규정 value
    [ROOM_RESERV_CHANGE]: (state, action) => ({
      ...state,
      reservationnotice: action.payload,
    }),
    //취소 규정 value
    [ROOM_CANCLE_CHANGE]: (state, action) => ({
      ...state,
      cancellationpolicy: action.payload,
    }),
    //방 정보 value
    [ROOM_INFO_CHANGE]: (state, action) => ({
      ...state,
      room_info: action.payload,
    }),
    //파일 변경값
    [ROOM_FILE_CHANGE]: (state, action) => ({
      ...state,
      imgfile: action.payload.files[0],
      imgfilename: action.payload.fileName,

      imgfilenames: {
        ...state.imgfilenames,
        ...modifyFilenames(
          state.imgfilenames,
          action.payload.files,
          action.payload.fileName,
          action.payload.previewURL
        ),
      },
      imgfiles: {
        ...state.imgfiles,
        ...modifyFiles(state.imgfiles, action.payload.files),
      },
    }),
    // 방정보 등록 bool
    [ROOM_REG_LOAD]: (state, action) => ({
      ...state,
      room_reg_load: action.payload,
    }),
    //등록 성공
    [ROOM_REG_SUCCESS]: (state, action) => ({
      ...state,
      room_reg_success: action.payload,
      room_modal: !state.room_modal,
      room_name: "",
      room_info: "",
      reservationnotice: "",
      cancellationpolicy: "",
      checkin: "",
      checkout: "",
      price: "",
      imgfile: "",
      imgfilename: "",
      imgfilenames: {
        type: Array,
      },
      imgfiles: {
        type: Array,
      },
      hotel_name: "",
      regist: true,
    }),

    //등록 실패시 에러
    [ROOM_REG_FAIL]: (state, action) => ({
      ...state,
      room_reg_fail: action.payload,
    }),

    //호텔 이름 목록
    [HOTEL_NAME_LOAD]: (state, action) => ({
      ...state,
      hotelList_load: !state.hotelList_load,
    }),
    [HOTEL_NAME_LOAD_SUCCESS]: (state, action) => ({
      ...state,
      hotellist: action.payload,
    }),
    [HOTEL_NAME_LOAD_FAIL]: (state, action) => ({
      ...state,
      hotelList_fail: action.payload,
    }),
    [SELECT_HOTEL_VALUE]: (state, action) => ({
      ...state,
      hotel_name: action.payload.value,
      // hotel_id:action.payload.value.id,
      // hotel_location:action.payload.value.LOCATION,
      // hotel_accommodation_type:action.payload.value.ACCOMMODATION_TYPE,
    }),
    [ROOM_LIST_LOAD]: (state, action) => ({
      ...state,
      room_list_load: !state.room_list_load,
    }),
    [ROOM_LIST_LOAD_SUCCESS]: (state, action) => ({
      ...state,
      room_list: action.payload,
    }),
    [ROOM_LIST_LOAD_FAIL]: (state, action) => ({
      ...state,
      room_list_fail: action.payload,
    }),
    [ROOM_INFO_LOAD]: (state, action) => ({
      ...state,
      roominfo_load: !state.room_list_load,
    }),
    [ROOM_INFO_LOAD_SUCCESS]: (state, action) => ({
      ...state,
      room_name: action.payload.ROOM_NAME,
      room_info: action.payload.ROOM_INFO,
      reservationnotice: action.payload.RESERVATION_NOTICE,
      cancellationpolicy: action.payload.CANCELLATION_POLICY,
      checkin: action.payload.CHECK_IN,
      checkout: action.payload.CHECK_OUT,
      price: action.payload.PRICE,
      hotel_name: action.payload.HOTEL_NAME,
      // roominfo_modal: !state.roominfo_modal,
      info_img: action.payload.IMAGE_FILES === ""? []:action.payload.IMAGE_FILES.split(","),
      room_id: action.payload.ID,
      hotel_id: action.payload.HOTEL_ID,
      hotel_location: action.payload.LOCATION,
      hotel_accommodation_type: action.payload.ACCOMMODATION_TYPE,
    }),
    [ROOM_INFO_LOAD_FAIL]: (state, action) => ({
      ...state,
      roominfo_fail: action.payload,
    }),
    [ROOM_INFO_OPEN]: (state, action) => ({
      ...state,
      roominfo_modal: !state.roominfo_modal,
    }),
    [ROOM_INFO_CLOSE]: (state, action) => ({
      ...state,
      roominfo_modal: !state.roominfo_modal,
      room_name: "",
      room_info: "",
      reservationnotice: "",
      cancellationpolicy: "",
      checkin: "",
      checkout: "",
      price: "",
      hotel_name: "",
      info_img: [],
      imgfilenames: {
        type: Array,
      },
      imgfiles: {
        type: Array,
      },
    }),
    [ROOM_MODY_OPEN]: (state, action) => ({
      ...state,
      roominfo_modal: !state.roominfo_modal,
      mody_modal: !state.mody_modal,
    }),
    [ROOM_MODY_CLOSE]: (state, action) => ({
      ...state,

      mody_modal: !state.mody_modal,

      room_name: "",
      room_info: "",
      reservationnotice: "",
      cancellationpolicy: "",
      checkin: "",
      checkout: "",
      price: "",
      imgfile: "",
      imgfilename: "",
      imgfilenames: "",
      imgfiles: "",
      hotel_name: "",
      room_id: "",
      room_list_load: false,
      room_list_fail: "",
      hotelList_load: false,
      hotelList_fail: "",
      hotel_id: "",
      hotel_location: "",
      hotel_accommodation_type: "",
      room_modal: false,
      room_reg_load: false,
      room_reg_fail: "",
      room_reg_success: "",
      roominfo_load: false,
      roominfo_success: "",
      roominfo_fail: "",
      roominfo_modal: false,
      info_img: [],
      info_mody: false,
      info_mody_success: "",
      info_mody_fail: "",
      room_delete_load: false,
      room_delete_data: "",
      room_delete_fail: "",
      reservation_modal: false,
      reservation_list: [],
      reservation_list_load: false,
      reservation_list_fail: "",
      search_room: "",
    }),
    [ROOM_MODY_LOAD]: (state, action) => ({
      ...state,
      info_mody: !state.info_mody,
    }),
    [ROOM_MODY_SUCCESS]: (state, action) => ({
      ...state,
      info_mody_success: action.payload,
      room_name: "",
      room_info: "",
      reservationnotice: "",
      cancellationpolicy: "",
      checkin: "",
      checkout: "",
      price: "",
      imgfile: "",
      imgfilename: "",
      imgfilenames: {
        type: Array,
      },
      imgfiles: {
        type: Array,
      },
      hotel_name: "",
      mody_modal: !state.mody_modal,
      room_id: "",
    }),
    [ROOM_MODY_FAIL]: (state, action) => ({
      ...state,
      info_mody_fail: action.payload,
    }),
    [IMG_FILE_DELETE]: (state, action) => ({
      ...state,
      info_img: state.info_img.filter((file) => file !== action.payload),
    }),
    [NEW_IMG_DELETE]: (state, action) => ({
      ...state,

      imgfilenames: toArray(state.imgfilenames).filter(
        (ifile) => ifile.id !== action.payload
      ),
      imgfiles: toArray(state.imgfiles).filter(
        (file) => file.id !== action.payload
      ),
    }),
    [PAGE_CHANGE]: (state, action) => ({
      ...state,

      currentPage: action.payload,
    }),
    [ROOM_DELETE_LOAD]: (state, action) => ({
      ...state,
      room_delete_load: action.payload,
    }),
    [ROOM_DELETE_SUCCESS]: (state, action) => ({
      ...state,
      room_delete_data: action.payload,
    }),
    [ROOM_DELETE_FAIL]: (state, action) => ({
      ...state,
      room_delete_fail: action.payload,
    }),
    [RESERVATION_LIST_OPEN]: (state, action) => ({
      ...state,
      reservation_modal: true,
    }),
    [RESERVATION_LIST_CLOSE]: (state, action) => ({
      ...state,
      reservation_modal: false,
    }),
    [LIST_RESERVATION_LOAD]: (state, action) => ({
      ...state,
      reservation_list_load: action.payload,
    }),
    [LIST_RESERVATION_SUCCESS]: (state, action) => ({
      ...state,
      reservation_list: action.payload,
    }),
    [LIST_RESERVATION_FAIL]: (state, action) => ({
      ...state,
      reservation_list_fail: action.payload,
    }),
    [ROOM_SEARCH_VALUE]: (state, action) => ({
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
    [STATE_CLEAN]: (state, action)=> ({
      ...state,
      room_list: [], //방 목록
  room_list_load: false, //방목록 출력 처리전 bool값 처리
  room_list_fail: "", //방목록 출력 실패시 에러
  hotellist: [], //호텔 목록
  hotelList_load: false, //호텔목록 출력 처리전 bool값 처리
  hotelList_fail: "", //호텔목록 출력실패시 에러
  hotel_name: "", //호텔이름
  hotel_id: "", //호텔 아이디
  hotel_location: "", //호텔 지역
  hotel_accommodation_type: "", //사업체 종류
  room_modal: false, // 방등록 모달창 열기/ 닫기
  room_name: "", //방이름
  room_info: "", //방정보
  reservationnotice: "", //예약규정
  cancellationpolicy: "", //취소약관
  checkin: "", //체크인 시간
  checkout: "", //체크아웃 시간
  price: "", //가격
  imgfile: "", //이미지 파일
  imgfilename: "", //이미지 파일 이름
  imgfilenames: {
    type: Array,
  }, //파일 이름 목록
  imgfiles: {
    type: Array,
  }, //파일 목록
  room_reg_load: false, //방정보 등록 처리전 bool값
  room_reg_fail: "", //방정보 등록 실패시 에러
  room_reg_success: "", //방정보 등록 성공시 값저장
  roominfo_load: false, //방정보 출력전 bool값
  roominfo_success: "", //방정보 출력 성공
  roominfo_fail: "", //방정보 로딩 실패시 에러
  roominfo_modal: false, // 방정보 출력 모달창 열기/ 닫기
  info_img: [], //방정보 출력시 이미지 목록
  mody_modal: false, // 방정보 수정 모달창 열기/ 닫기
  info_mody: false, //방정보 수정저 bool값
  info_mody_success: "", // 방정보 수정 성공
  info_mody_fail: "", //방정보 수정 실패시 에러
  room_id: "", //방 아이디
  room_delete_load: false, //방정보 삭제전 bool값
  room_delete_data: "", //방정보 삭제 성공
  room_delete_fail: "", // 방 정보 삭제 실패시 에러
  reservation_modal: false, // 예약 목록 모달창 열기/ 닫기
  reservation_list: [], //예약 목록
  reservation_list_load: false, //예약 목록 출력전 bool 값
  reservation_list_fail: "", // 예약목록 출력 실패시 에러
  search_room: "", //검색창 검색어
  pageSize: 10, //출력 페이지 갯수
  currentPage: 1, //현재페이지
  pageNum: 10,
  start: 0,
  end: 10,
    })
  },
  initalState
);
