import React from "react";
import { useDispatch } from "react-redux";
import { CLEAR_LOCAL_STORAGE } from "../localStorage/localStorage";
import { AuthHelper } from "../routes/Auth/helpers/authHelper";
import { setAppUser, setToken } from "../slices/appAuthSlice";

const PageHeader = () => {
  const isAuthorized = AuthHelper();
  const dispatch = useDispatch();
  return (
    <div className="d-flex bg-white" style={{ height: 100 }}>
      <div className="m-4" style={{ marginLeft: 50 }}>
        <img
          src="https://playablefactory.com/wp-content/uploads/2022/01/animated_dark_with_title_logo_pf.gif"
          height={48}
        />
      </div>
      {isAuthorized && (
        <button
          onClick={() => {
            CLEAR_LOCAL_STORAGE();
            dispatch(setToken({ token: undefined }));
            dispatch(setAppUser({ user: undefined }));
            document.location.reload();
          }}
          type="button"
          className="btn btn-danger position-absolute "
          style={{ top: 30, right: 85 }}
        >
          Log Out
        </button>
      )}
    </div>
  );
};

export default PageHeader;
