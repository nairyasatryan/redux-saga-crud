import { createSlice, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import watchBookSaga from "./saga";

const bookSlice = createSlice({
  name: "Name",
  initialState: {
    data: [],
  },
  reducers: {
    fetchBook: (state, action) => {
      console.log(state, action);
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export const { fetchBook } = bookSlice.actions;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    booksData: bookSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchBookSaga);
export default store;
