import React, {Component} from "react";
import Navbar from "../../components/nav";
import Footer from "../../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../../util/api";
import LoadingIMG from "../../images/logo.png";

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

const Intro = styled.div`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;
  background: #2a2c30;
  border-radius: 5px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
  margin: 12.5px 25px 25px;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    padding: 35px 25px 25px;
  }
`
const Page2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  color: #fff;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`

const Image = styled.img`
  max-width: 100%;
  border-radius: 100% !important;
  margin: auto 0;
  max-height: 150px;
  vertical-align: middle;
  border-style: none;

  @media only screen and (max-width: 767px) {
    margin: 0 auto;
    max-width: 150px;
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

        user = JSON.parse(user);

        this.setState({user: user});

    }

    render() {
        const {user} = this.state;
        console.log(user)

        let tag = "User#0000";
        let avatar = LoadingIMG;
        let username = "User";
        let discriminator = "#0000"

        if (user) {
            tag = user.username + "#" + user.discriminator;
            avatar = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar;
            username = user.username;
            discriminator = user.discriminator;
        }


        let defStyle = {
            "float": "right",
            "marginLeft": "2rem",
            "marginTop": "3rem",
            "fontSize": "25px",
            "color": "#fff"
        }

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | Account </title>
                </Helmet>
                <Navbar/>

                <Intro>
                    <div style={{display: "flex"}}>
                        <center>
                            <Image
                                className="avatar"
                                style={{float: "left"}}
                                src={avatar}
                                draggable="false"
                                alt={"Could not load"}
                            />{" "}
                            &nbsp;{" "}
                            <a style={defStyle}>{tag}</a>
                        </center>
                    </div>

                    <a
                        href="#/"
                        className="btn user-profile logout"
                        onClick={e => {
                            e.preventDefault();
                            localStorage.removeItem("user");
                            localStorage.removeItem("code");
                            window.location.href = "/?success=logged_out";
                        }}
                    >
                        {" "}
                        Logout{" "}
                    </a>

                </Intro>


                <Description> Hi this page is still under construction. </Description>


                <Footer/>
            </div>
        );
    }
}

export default Account_Index;