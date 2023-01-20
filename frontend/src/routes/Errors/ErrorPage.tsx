import { Route, Link, Routes, Outlet } from "react-router-dom";
import { Error404 } from "./Error404";

const ErrorsLayout = () => {
  return (
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-column flex-center flex-column-fluid p-5 position-relative ps-0"
        style={{ background: `#c8dfff`, height: "100vh" }}
      >
        <div className="d-flex flex-column flex-column-fluid text-center p-5 pb-lg-5">
          <div className="pt-lg-5 mb-5">
            <Outlet />
            <div className="text-center">
              <Link
                to="/"
                className="btn btn-lg btn-primary fw-bolder mt-5 mb-5"
              >
                Anasayfa Dön
              </Link>
            </div>
          </div>
          <div
            className="
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          bgi-position-y-bottom
          min-h-100px min-h-lg-350px
        "
            style={{
              background: `black`,
            }}
          ></div>
        </div>

        <div className="d-flex flex-center flex-column-auto p-2 bg-light w-100 position-absolute bottom-0 ">
          <div className="d-flex align-items-center fw-bold fs-6">
            <span className="text-muted text-hover-primary px-2">
              <a href="https://www.bestera.com.tr/rutist">Yunus Yavuz</a>{" "}
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path="404" element={<Error404 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
);

export { ErrorPage };
