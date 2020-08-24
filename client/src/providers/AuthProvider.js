import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useSelector } from "react-redux";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const loggedinUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    setIsAuth(AuthService.checkAuth());
  }, [isAuth]);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login,
        logout,
        user: loggedinUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* class AuthProvider extends React.Component {
  state = { isAuth: false };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    const isAuthenticated = AuthService.checkAuth();
    this.state = { isAuth: isAuthenticated };
  }

  login() {
    this.setState({ isAuth: true });
  }

  logout() {
    this.setState({ isAuth: false });
    localStorage.removeItem("user");
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
} */

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
