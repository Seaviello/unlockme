import React from "react";
import People from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import Lock from "@material-ui/icons/Lock";
import Logs from "@material-ui/icons/Assessment";
import { UsersPage } from "./pages/users";
import { LocksPage } from "./pages/locks";

export const routes = {
  HOME: {
    route: {
      path: "/",
      exact: true
    },
    title: "Dashboard",
    icon: () => <Home />,
    main: () => <div>Halko</div>
  },
  USERS: {
    route: {
      path: "/users"
    },
    title: "Users",
    icon: () => <People />,
    main: UsersPage
  },
  LOCKS: {
    route: {
      path: "/locks"
    },
    title: "Locks",
    icon: () => <Lock />,
    main: LocksPage
  },
  LOGS: {
    route: {
      path: "/logs"
    },
    title: "Event logs",
    icon: () => <Logs />,
    main: () => <div>Logs</div>
  }
};
