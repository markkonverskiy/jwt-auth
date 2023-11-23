import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import "./index.css";
import store from "./redux/store";
import App from "./App";

const AppContainer = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAuthMe());
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route path="/" element={<Welcome />} />
        ) : (
          <Route path="/" element={<App />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
