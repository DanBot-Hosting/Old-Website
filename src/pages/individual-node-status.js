import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import * as api from "../util/api";
import styled from "styled-components";
import LoadingIMG from "../images/loading.svg";
import ErrorPage from "./error";
import NotFound from "./404";
import {withRouter} from "react-router-dom";

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

class Node_Status extends Component {
    state = {
        stats: null,
        error: false,
        loading: true,
        found: false,
        nodeID: null,
        nodeStatus: "legend bg-error",
        nodeStatusText: "VM Outage"
    };

    async componentDidMount() {
        this.fetchStatList();
        let Node = this.props.match.params.ID;
        if (!Node) return (window.location.href = "/stats?error=NO_ID");
        this.fetchStatList = this.fetchStatList.bind(this);

        this.setState({ nodeID: Node });
    }

    fetchStatList = async () => {
        let statRes = await api.fetchStats();

        const {nodeID} = this.state;
        let inf = this;
        if (statRes.error) {
            this.setState({error: true, loading: false});
        } else {
            let data = [];
            Object.keys(statRes.data).map(function (key, index) {
                data.push(statRes.data[key])
            });
            this.setState({stats: data});

            let nodes = [];

            data.map(function (entry) {
                let node = entry.servername.split("Node")[1];
                nodes.push(node)

                if(!nodes.includes(nodeID)) {
                    inf.setState({ found: false, loading: false });
                }

                if(node === nodeID) {
                    console.log(entry);
                    inf.setState({found: true, loading: false});
                    let status = "legend bg-error"; // Default
                    let text = "VM Outage";

                    if (entry.nodeStatus === "Online") {
                        status = "legend bg-success"
                        text = "Operational"
                    } else if (entry.nodeStatus === "Wings Outage") {
                        status = "legend bg-warning";
                        text = "Wings Outage"
                    }

                    inf.setState({ nodeStatus: status, nodeStatusText: text });

                }

            })

        }

        setTimeout(this.fetchStatList, 25 * 1000);
    }

    render() {
        const {stats, error, loading, found, nodeID, nodeStatus, nodeStatusText} = this.state;

        if (loading) {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Node Status </title>
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
        } else if(found) {

            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Node {nodeID} </title>
                    </Helmet>
                    <Navbar/>

                    <Intro>
                        <div>
                            <div className="status-wrapper">
                                <div className="columns is-multiline status-header">
                                    <div className="column is-half is-full-touch">
                                        <center>

                                            <Title>Node {nodeID} Status</Title>

                                        </center>
                                    </div>


                                    <Page2>
                                        <div className="legend-wrapper">
                                            <div className={nodeStatus}>
                                                <span className="legend-marker"></span>{nodeStatusText}
                                            </div>
                                        </div>
                                    </Page2>

                                </div>
                            </div>
                        </div>
                    </Intro>


                    <Footer/>
                </div>
            );
        } else {
            return <NotFound/>;
        }

    }
}

export default withRouter(Node_Status);