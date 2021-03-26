import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import Logo from "../images/logo.png";

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
  height: 100px;
  margin-bottom: 1rem;
  border-radius: 50%;
`

const Title = styled.h1`
  color: #fff;
`

const Description = styled.h3`
  color: #fff;
  text-align: center;
`

class Home extends Component {

    render() {

        return (
            <div>
                <Helmet>
                    {" "}
                    <title> DanBot Hosting | Home </title>{" "}
                </Helmet>
                <Navbar />

                <HomePage>

                    <HomeLogo draggable={false} src={Logo}/>
                    <Title> DanBot Hosting </Title>
                    <Description> Free, but fast & reliable hosting; at your fingertips. <br/> You can Host Bots,
                        Websites, Game-servers and much more! </Description>

                </HomePage>

                <Footer />
            </div>
        );
    }
}

export default Home;