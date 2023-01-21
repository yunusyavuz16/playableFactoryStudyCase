import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";

export function AuthHelper() {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const user = useSelector((state: RootState) => state.appAuth.user);

  React.useEffect(() => {
    if (user && user.userGuid) {
      setIsAuthorized(true);
    }
  }, [user]);

  return isAuthorized;
}
