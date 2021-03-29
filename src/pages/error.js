import React, {Component} from "react";
import "../styles/error.css";
import Helmet from "react-helmet";
import Navbar from "../components/nav";
import styled from "styled-components";

const Title = styled.h1`
  color: #fff;
  font-size: 45px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;


  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`

class error extends Component {
    render() {

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | Error </title>
                </Helmet>

                <Navbar/>

                <figure>
                    <div className="sad-mac"/>
                    <Title>Oops! I ran into an error while processing your request.</Title>
                </figure>

            </div>
        );
    }
}

export default error;