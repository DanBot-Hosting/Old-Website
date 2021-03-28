import React from "react";
import "../styles/button.css";
import {NavLink as Link} from "react-router-dom";
import styled from "styled-components";
import * as api from "../util/api";

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  background-color: #7289DA;
  transition: all 0.2s ease-in-out;
  background: #7289DA;
  padding: 10px 22px;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #5772d2;
    color: #fff;
  }
`;

const bodyScrollLock = require("body-scroll-lock");

export default class Button extends React.Component {
    state = {
        loggedIn: false
    };

    async componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({loggedIn: true});
        }
    }

    render() {
        const {loggedIn} = this.state;

        if (loggedIn) {
            return (
                <Link to="/account">
                    <button className="btn" style={{"fontSize": "15px"}}>
                        <i class="fas fa-user"></i> Account
                    </button>
                </Link>
            );
        } else {
            return (
                <a href={api.getOauth()}>
                    <button className="btn">
                        {" "}
                        <i class="fab fa-discord"></i> Login
                    </button>
                </a>
            );
        }
    }
}