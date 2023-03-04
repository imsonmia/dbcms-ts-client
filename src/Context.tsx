import React from "react";
import { User } from "./types";
export const LoginContext = React.createContext({
    user: {
        username: "",
        id: NaN,
    },
    setUser: (newUser: User) => {},
    urls: {
        base: "http://192.168.2.100:9000",
        db: "supermarket",
        itemsTable: "items",
        financesTable: "finances",
        authTable: "auth",
    },
});
export const DbTableContext = React.createContext({
    db: "supermarket",
    table: "items",
    passwd: "imsonmia",
});
