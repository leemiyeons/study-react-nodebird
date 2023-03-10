import { fork, takeLatest, all, delay, put } from "redux-saga/effects";
import axios from "axios";
import {
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
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

function followApi(data) {
  return axios.post("/api/follow", data);
}

function unFollowApi(data) {
  return axios.post("/api/unfollow", data);
}

function logInApi(data) {
  return axios.post("/api/login", data);
}

function logOutApi() {
  return axios.post("/api/logout");
}

function signUpApi() {
  return axios.post("/api/signup");
}

function* follow(action) {
  try {
    //const result = yield call(followApi, action.data); //call : 동기 fork : 비동기
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function* unfollow(action) {
  try {
    //const result = yield call(unFollowApi, action.data); //call : 동기 fork : 비동기
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      //put === dispatch 라고 생각하면 된다..
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
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

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
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
  yield all([
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
