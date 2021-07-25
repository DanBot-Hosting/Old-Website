import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../api";
import {Link} from "react-router-dom";
import crypto from "crypto";
import { Redirect } from "react-router-dom";

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;
  position: fixed;
`

const Title = styled.h1`
  color: #fff;
  font-size: 45px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`

const Description = styled.h4`
  color: #fff;
  font-size: 35px;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

const Loginx2 = styled(Link)`
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #e0dcdc;
  }
`

class Home extends Component {

    state = {
        msg: "Awaiting Code...",
        to: "/account",
        redirect: false,
        error: false
    };

    async componentDidMount() {
        const url = new URLSearchParams(window.location.search);
        const code = url.get("code");
        if (!code) return window.location.href = "/";

        if (code) {
            this.setState({msg: "Please wait while we gather your details"});
        }

        const response = await api.logIn(code);

        if (response.error) {
            this.setState({error: true, msg: 'Sorry, something went wrong while logging you in!'});
        };

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.username);

        this.setState({ done: true });
    };


    render() {
        const {msg, error} = this.state;
        if (this.state.done) return <Redirect to='/' />;

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | Callback </title>
                </Helmet>
                <Navbar/>

                <HomePage>

                    <Title> {msg} </Title>

                    {error ? (
                        <Description>
                            <Loginx2 to="/login">
                                Click Here to Re-Try
                            </Loginx2>
                        </Description>
                    ) : (
                        <></>
                    )}

                </HomePage>

                <Footer/>
            </div>
        );
    }
}

export default Home;