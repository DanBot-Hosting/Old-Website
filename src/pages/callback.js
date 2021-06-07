import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../util/api";
import {Link} from "react-router-dom";
import crypto from "crypto";

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
        const {to} = this.state;
        const url = new URLSearchParams(window.location.search);
        const code = url.get("code");
        if (!code) return window.location.href = "/";

        if (code) {
            this.setState({msg: "Please wait while we gather your details"});
        }

        if (localStorage.getItem("user")) {
            window.location.href = to;
        }

        this.fetch()

        setInterval(async () => {

            if (localStorage.getItem("user")) {
                this.setState({redirect: true, msg: "Successfully logged in!"});
            } else {
                this.fetch()
            }

        }, 2500);

    }

    async fetch() {
        const url = new URLSearchParams(window.location.search);
        const code = url.get("code");
        if (!code) return window.location.href = "/";

        try {
            let info = await api.user(code);
            console.log(info);
            if (info.error) {
                this.setState({msg: "An error Occurred", error: true});
            } else {

                var mykey = crypto.createCipher('aes-128-cbc', process.env.REACT_APP_API_TOKEN);
                var mystr = mykey.update(JSON.stringify(info), 'utf8', 'hex')
                mystr += mykey.final('hex');

                localStorage.setItem("user", mystr);


                window.location.href = "/account";
                this.setState({msg: "Redirecting", error: false});
            }
        } catch (e) {
            console.log(e)
            this.setState({msg: "An error Occurred", error: true});
        }

    }

    render() {
        const {msg, error} = this.state;

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