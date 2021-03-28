import React, {Component} from "react";
import Navbar from "../../components/nav";
import Footer from "../../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../../util/api";

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;
  position: fixed;
`

const Description = styled.h3`
  color: #fff;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`

class Account_Index extends Component {
    state = {
        user: null
    };

    async componentDidMount() {

        let user = localStorage.getItem("user");
        if (user === "n/a") return (window.location.href = api.getOauth());
        if (!user) return (window.location.href = api.getOauth());
    }

    render() {

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | Account </title>
                </Helmet>
                <Navbar/>

                <HomePage>

                    <Description> Hi this page is still under construction. </Description>

                </HomePage>

                <Footer/>
            </div>
        );
    }
}

export default Account_Index;