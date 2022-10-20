import { sagaActions } from "./sagaActions";
import { takeEvery, call, put } from "redux-saga/effects";
import { fetchBook } from "./store";
import axios from "axios";
const getBook = async (url) => {
  return await axios({
    url: "http://localhost:5000/books",
  });
};
export function* getBookSaga() {
  console.log(1234);
  const result = yield call(getBook);
  yield put(fetchBook(result.data));
  console.log(result);
}

export default function* watchBookSaga() {
  yield takeEvery(sagaActions.GET_BOOKS, getBookSaga);
}
