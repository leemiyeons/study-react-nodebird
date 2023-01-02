import { all, fork } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";

// takeEvery : 비동기로 동작,
// while(true) { take (); } : 동기적으로 동작 ,
// takeLatest : 마우스 클릭 두번이상 될 때 호출은 여러번 하지만 응답만 마지막꺼로 받는 것.
// throttle : 시간제한 두고 실행 한번만,,

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]); //fork or call :  제너레이터 함수를 실행하게 해준다
}
