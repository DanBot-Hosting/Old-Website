import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import * as api from "../util/api";
import styled from "styled-components";
import LoadingIMG from "../images/loading.svg";
import ErrorPage from "./error";
import ReactTooltip from "react-tooltip";
import {Link} from "react-router-dom";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;
  position: fixed;
`

const Page2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ToolTitle = styled.h1`
  color: #fff;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
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
    max-width: none;
    width: 50vw;
    order: 3;
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
        try {
            let statRes = await api.fetchStats();

            if (statRes.error) {
                this.setState({error: true, loading: false});
            } else {
                let data = [];
                Object.keys(statRes.data).map(function (key, index) {
                    if (statRes.data[key]) {
                        statRes.data[key].online = statRes.status[key].status
                        statRes.data[key].vm = statRes.status[key].is_vm_online
                        data.push(statRes.data[key])
                    }
                });

                this.setState({stats: data, loading: false});
            }
        } catch (e) {
            console.log(e)
            this.setState({error: true, loading: false});
        }

        setTimeout(this.fetchStatList, 15 * 1000);
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
                let status = "legend bg-error"; // Default

                let vm = entry.vm;
                let online = entry.online;

                if (vm && online) {
                    status = "legend bg-success"
                }

                if (!vm && online) {
                    status = "legend bg-error"
                }

                if (vm) {
                    if (!online) {
                        status = "legend bg-warning";
                    }
                }

                let name = "null";
                if (entry) {
                    if (entry.servername) {
                        name = entry.servername.split("Node")[1]
                    }
                }

                return (
                    <div key={`node-${name}`}>
                        <Link to={`/stats/node/${name}`} style={{"textDecoration": "none"}}>
                            <Info>
                                <Name className={status}>
                                    Node {name}
                                </Name>
                            </Info>
                        </Link>
                    </div>
                )
            })

            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Stats </title>
                    </Helmet>
                    <Navbar/>

                    <Intro>
                        <div>
                            <div className="status-wrapper">
                                <div className="columns is-multiline status-header">
                                    <div className="column is-half is-full-touch">
                                        <center>
                                            <Title>DanBot Status</Title>
                                        </center>
                                    </div>


                                    <Page2>
                                        <div className="legend-wrapper">
                                            <div className="legend bg-success" data-tip="Online and responsive"
                                                 onMouseEnter={() => {
                                                     ReactTooltip.rebuild();
                                                 }}>
                                                <span className="legend-marker"/>Operational
                                            </div>
                                            <div className="legend bg-warning" data-tip="Online but not connected"
                                                 onMouseEnter={() => {
                                                     ReactTooltip.rebuild();
                                                 }}>
                                                <span className="legend-marker"/>Wings Outage
                                            </div>
                                            <div className="legend bg-error"
                                                 data-tip="Connection to Node completely lost" onMouseEnter={() => {
                                                ReactTooltip.rebuild();
                                            }}>
                                                <span className="legend-marker"/>VM Outage
                                            </div>
                                        </div>
                                        <ReactTooltip effect="solid"/>
                                    </Page2>
                                </div>
                            </div>
                        </div>
                    </Intro>

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