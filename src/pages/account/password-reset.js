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

const HomeLogo = styled.img`
  margin-bottom: 1rem;
  border-radius: 65%;
  @media screen and (max-width: 768px) {
    height: 100px;
  }
`

const Title = styled.h1`
  color: #fff;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`

const Description = styled.h3`
  color: #fff;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`

class Pass_Word_Reset extends Component {
    state = {
        user: null,
        fetchingUserInfo: true,
        userInfo: null,
        error: false,
        fetchingUserServers: true,
        userServers: null,
        sendingUserCode: true,
        userCode: null,
        verifying: false,
        verified: false
    };

    async componentDidMount() {
        let user = localStorage.getItem("user");
        if (user === "n/a") return (window.location.href = api.getOauth());
        if (!user) return (window.location.href = api.getOauth());
        user = JSON.parse(user);

        this.setState({user: user});

        try {

            let userInfo = await api.fetchUser(user.id);
            if (userInfo.error) {
                if (userInfo.message === "User not found") {
                    this.setState({fetchingUserInfo: false, userInfo: null});
                } else {
                    this.setState({fetchingUserInfo: false, error: true});
                }
            }

            if (userInfo.data) {
                this.setState({fetchingUserInfo: false, userInfo: userInfo.data});
            }
        } catch (e) {
            console.log(e)
            this.setState({fetchingUserInfo: false, error: true});
        }


    }

    render() {

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | Account Password Reset </title>
                </Helmet>
                <Navbar/>

                <HomePage>


                    <Description> Working on this page come back later :) </Description>

                </HomePage>

                <Footer/>
            </div>
        );
    }
}

export default Pass_Word_Reset;