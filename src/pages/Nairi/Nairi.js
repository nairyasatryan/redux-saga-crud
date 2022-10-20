import React from "react";
import CrudTable from "./CrudTable";
import store from "./redux_saga/store";
import { Provider } from "react-redux";
export default function Nairi() {
  return (
    <Provider store={store}>
      <CrudTable />
    </Provider>
  );
}
