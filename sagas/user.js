import { fork, takeLatest, all, delay, put } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../reducers/user";

function logInApi(data) {
  return axios.post("/api/login", data);
}

function logOutApi() {
  return axios.post("/api/logout");
}

function signUpApi() {
  return axios.post("/api/signup");
}

function* logIn(action) {
  try {
    console.log("saga login");
    //const result = yield call(logInApi, action.data); //call : 동기 fork : 비동기
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      //put === dispatch 라고 생각하면 된다..
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function* logOut() {
  try {
    //const result = yield call(logOutApi); //call : 동기 fork : 비동기
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      //put === dispatch 라고 생각하면 된다..
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function* signUp() {
  try {
    //const result = yield call(logOutApi); //call : 동기 fork : 비동기
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      //put === dispatch 라고 생각하면 된다..
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn); // LOG_IN 액션이  실행될 때 까지 기다리겠다..
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
