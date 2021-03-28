import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../util/api";

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
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`

class Home extends Component {

    state = {
        msg: "Awaiting Code...",
        to: "/account",
        redirect: false
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
        if (!code) return window.location.href = "/"

        localStorage.setItem("code", code);

        try {
            let info = await api.user(code);
            console.log(info)
            if (info.error) this.setState({msg: "An error Occurred, Attempting to login again... "});
        } catch (e) {
            console.log(e)
            this.setState({msg: "An error Occurred, Attempting to login again... "});
        }

    }

    render() {
        const {msg} = this.state;

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | Callback </title>
                </Helmet>
                <Navbar/>

                <HomePage>

                    <Title> {msg} </Title>

                </HomePage>

                <Footer/>
            </div>
        );
    }
}

export default Home;