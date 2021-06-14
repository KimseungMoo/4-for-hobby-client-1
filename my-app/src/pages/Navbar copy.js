import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const NavbarCopy = ({ isEnterHandler }) => {
  const authToken = localStorage.getItem("token");

  const onClick = () => {
    localStorage.removeItem("token");
  };

  const guestLinks = (
    <ul>
      <li>
        <Link to="/" >Home </Link>
      </li>
      <li>
        <Link to="/login">로그인 </Link>
      </li>
      <li>
        <Link to="/signup">회원가입 </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/" onClick={() => isEnterHandler()}>Home </Link>
      </li>
      <li>
        <Link to="/addroom">방 생성</Link>
      </li>
      <li>
        <Link to="/mypage">마이페이지</Link>
      </li>
      <li>
        <a href="/" onClick={onClick}>
          로그아웃
        </a>
      </li>
    </ul>
  );

  return <nav className="navbar">{guestLinks}</nav>;
};

export default NavbarCopy;