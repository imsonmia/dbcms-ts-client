import React from "react";
import { User } from "./types";
export const GlobalContext = React.createContext({
    user: {
        username: "",
        id: NaN,
        passwd: "",
        level: NaN,
    },
    setUser: (newUser: User) => {},
    urls: {
        base: "http://192.168.2.100:9000",
        db: "supermarket",
        itemsTable: "items",
        financesTable: "finances",
        authTable: "auth",
    },
    db: "supermarket",
    table: "items",
    dbPasswd: "imsonmia",
});
export const DbTableContext = React.createContext({
    db: "supermarket",
    table: "items",
    passwd: "imsonmia",
});
