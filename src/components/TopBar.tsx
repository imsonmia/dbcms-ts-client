import React from "react";
interface TopBarProps {
  username: string;
  avatar: string; // placeholder, future => url for string
}
const TopBar = (props: TopBarProps) => {
  return (
    <div className="topbar">
      <span className="logo">placeholderText</span>
      <p className="title">DBCMS Single-page</p>
      <span>
        <span>{props.avatar}</span>
        <span>{props.username}</span>
      </span>
    </div>
  );
};
