import React from "react";
import Login from "./components/Login";
import { globalContext } from "./Context";
import { User } from "./types";
export default class App extends React.Component<
  {},
  {
    user: { username: string; id: number };
    setUser: (newUser: User) => void;
    urls: {
      base: string;
      db: string;
      itemsTable: string;
      financesTable: string;
      authTable: string;
    };
  },
  {}
> {
  setUser = (newUser: User) => {
    this.setState({
      user: {
        username: newUser.UserName,
        id: newUser.ID,
      },
    });
  };
  constructor(props: {}) {
    super(props);
    this.state = {
      user: {
        username: "",
        id: NaN,
      },
      setUser: this.setUser,
      urls: {
        base: "http://192.168.2.100:9000",
        db: "supermarket",
        itemsTable: "items",
        financesTable: "finances",
        authTable: "auth",
      },
    };
  }
  render() {
    return (
      <globalContext.Provider value={this.state}>
        <div className="App">
          <Login></Login>
          {/* <pre>{JSON.stringify(globalSELECT * FROM authContext)}</pre> */}
        </div>
      </globalContext.Provider>
    );
  }
}
