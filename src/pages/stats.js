import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import * as api from "../util/api";
import styled from "styled-components";
import LoadingIMG from "../images/loading.svg";
import ErrorPage from "./error";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;
  position: fixed;
`

const Loading = styled.img`
  height: 70%;
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    padding: 0;
  }
  
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 10px;
  background: #202024;
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.39);
  transition: all 0.25s ease-in-out;
  position: relative;
  width: 200px;
  overflow: hidden;
`

const Name = styled.h2`
  display: block;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  z-index: 2;
  text-shadow: 4px 4px 8px #2a2c30;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 180px;
  
  @media only screen and (max-width: 900px) {
    font-size: 17px;
    text-align: left;
    max-width: none;
    width: 50vw;
    order: 3;
  }
`

class Stats extends Component {
    state = {
        stats: null,
        error: false,
        loading: true
    };

    async componentDidMount() {
        this.fetchStatList()
    }

    fetchStatList = async () => {
        let statRes = await api.fetchStats();

        if (statRes.error) {
            this.setState({error: true, loading: false});
        } else {
            let data = [];
            Object.keys(statRes.data).map(function (key, index) {
                data.push(statRes.data[key])
            });
            this.setState({stats: data, loading: false});
        }

        setTimeout(this.fetchStatList, 25 * 1000);
    }

    render() {
        const {stats, error, loading} = this.state;

        if (loading) {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Stats </title>
                    </Helmet>
                    <Navbar/>

                    <Page>
                        <Loading src={LoadingIMG} style={{maxWidth: "170px"}} draggable="false"/>
                    </Page>

                    <Footer/>
                </div>
            );
        } else if (error) {
            return <ErrorPage/>;
        } else {

            let statMap = stats.map(function (entry) {
                console.log(entry)
                return (
                    <Info>
                        <Name style={{color: "#fff"}}>
                            Node {entry.servername.split("Node")[1]}
                        </Name>
                    </Info>
                )
            })

            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Stats </title>
                    </Helmet>
                    <Navbar/>


                    <Container>

                            {statMap}


                    </Container>

                    <Footer/>
                </div>
            );
        }

    }
}

export default Stats;