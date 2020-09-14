import { createAction, handleActions } from "redux-actions";
import axios  from "axios";

//value 변경
const VALUECHANGE = "VALUECHANGE";
export const valuechange = createAction(VALUECHANGE, ({ key, value }) => ({
  key,
  value,
}));

//에디터 내용 변경
const EDITORCHANGE = "EDITORCHANGE";
export const editorChange = createAction(EDITORCHANGE, (data) => data);

//체크값 변경
const CHECKEDCHANGE = "CHECKEDCHANGE";
export const checkedChange = createAction(
  CHECKEDCHANGE,
  ({ key, checked }) => ({
    key,
    checked,
  })
);

//주소 찾기 모달창 열기/ 닫기
const MODALOPEN = "MODALOPEN";
const MODALCLOSE = "MODALCLOSE";
export const modalchangeOpen = createAction(MODALOPEN);
export const modalchangeClose = createAction(MODALCLOSE);

//찾은 주소값 입력
const DAUMADDERSSCHANGE = "DAUMADDERSSCHANGE";
export const daumaddress = createAction(
  DAUMADDERSSCHANGE,
  ({ address, zonecode }) => ({ address, zonecode })
);

//호텔 등록
const REGIST_SUCCESS = "REGIST_SUCCESS";
const REGIST_LOADING = "REGIST_LOADING";
const REGIST_FAILE = "REGIST_FAILE";
const registsuccess = createAction(REGIST_SUCCESS, (data) => data);
const registloading = createAction(REGIST_LOADING, (bool) => bool);
const registfaile = createAction(REGIST_FAILE, (err) => err);

//이미지파일 등록
const FILE_CHANGE= "FILE_CHANGE";
export const filechnage = createAction(FILE_CHANGE, ({key, file, fileName})=> ({key, file, fileName}));


//초기화
const STATE_CLEAN="STATE_CLEAN";
export const stateClean = createAction(STATE_CLEAN);

//호텔 등록 처리
export const hotelRegist = (url, formData, config) => async (dispatch) => {

  dispatch(registloading(true));
  try {
    const { data } = await axios.post(url, formData);

    dispatch(registsuccess(data));
      return data;
  } catch (e) {

    dispatch(registfaile(e));
  }
  dispatch(registloading(false));
};



const initialState = {
  hotelName: "", //호텔이름
  hotelInfo: "", //호텔 정보
  zonecode: "", // 우편번호
  addRess: "", //주소
  addRess2: "", //상세주소
  
  //호텔 옵션
  spa: false, 
  restaurant: false,
  banquethall: false, 
  parkinglot: false,
  buffet: false,
  desk: false,
  bar: false,
  Luggage: false,
  fitness: false,
  sauna: false,
  wifi: false,
  CoffeeShop: false,
  Paidlaundry: false,
  Smokingarea: false,
  Amenities: false,
  business: false,
  Breakfast: false,
  Modalopen: false,
 
  loading: false, //등록시 dispatch bool 값
  error: "", //등록 실패시 에러
  location:'', //지역
  accommodation_type:'', //업체 종류
  register:'', //등록자
  thumbnail: "", //이미지파일
  thumbnail_name: "" //이미지파일 이름
};

export default handleActions(
  {
    //value 체인지
    [VALUECHANGE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    //에디터 내용 변경
    [EDITORCHANGE]: (state, action) => ({
      ...state,
      hotelInfo: action.payload,
    }),
    //체크값 변경
    [CHECKEDCHANGE]: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.checked,
    }),
    //모달 열기
    [MODALOPEN]: (state, action) => ({
      ...state,
      Modalopen: true,
    }),
    //모달 닫기
    [MODALCLOSE]: (state, action) => ({
      ...state,
      Modalopen: false,
    }),
    //주소값 입력
    [DAUMADDERSSCHANGE]: (state, action) => ({
      ...state,
      addRess: action.payload.address,
      zonecode: action.payload.zonecode,
    }),

    //등록시/후 bool값 변경
    [REGIST_LOADING]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    //등록후 
    [REGIST_SUCCESS]: (state, action) => ({
      ...state,
      hotelName: "",
      hotelInfo: "",
      addRess: "",
      addRess2: "",
      spa: false,
      restaurant: false,
      banquethall: false,
      parkinglot: false,
      buffet: false,
      desk: false,
      bar: false,
      Luggage: false,
      fitness: false,
      sauna: false,
      wifi: false,
      CoffeeShop: false,
      Paidlaundry: false,
      Smokingarea: false,
      Amenities: false,
      business: false,
      Breakfast: false,
      zonecode: "",
      register:''
    }),
    //등록실패시 에러
    [REGIST_FAILE]: (state, action) => ({
      ...state,
      error: action.payload
    }),

    //파일 변경
    [FILE_CHANGE]: (state, action)=>({
      ...state,
      [action.payload.key]: action.payload.file,
      thumbnail_name: action.payload.fileName
    }),
    [STATE_CLEAN]: (state, action) => ({
      ...state,
      hotelName: "", //호텔이름
      hotelInfo: "", //호텔 정보
      zonecode: "", // 우편번호
      addRess: "", //주소
      addRess2: "", //상세주소
      
      //호텔 옵션
      spa: false, 
      restaurant: false,
      banquethall: false, 
      parkinglot: false,
      buffet: false,
      desk: false,
      bar: false,
      Luggage: false,
      fitness: false,
      sauna: false,
      wifi: false,
      CoffeeShop: false,
      Paidlaundry: false,
      Smokingarea: false,
      Amenities: false,
      business: false,
      Breakfast: false,
      Modalopen: false,
     
      loading: false, //등록시 dispatch bool 값
      error: "", //등록 실패시 에러
      location:'', //지역
      accommodation_type:'', //업체 종류
      register:'', //등록자
      thumbnail: "", //이미지파일
      thumbnail_name: "" //이미지파일 이름
    })
  },
  initialState
);
