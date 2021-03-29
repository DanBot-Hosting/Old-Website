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
import ReactTooltip from "react-tooltip";
import LineChart from "../components/chart";

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

const DangerAlert = styled.div`
  padding: 10px 22px;
  background-color: #FF414B;
  color: white;
  margin-bottom: 25px;
  text-align: center;
  border-radius: 4px;
  z-index: 1;
  width: 52%;
  font-size: 15px;
  @media only screen and (max-width: 1000px) {
    font-size: 13px;
  }
`;

const MinorAlert = styled.div`
  padding: 10px 22px;
  background-color: #FF9B00;
  color: white;
  margin-bottom: 25px;
  text-align: center;
  border-radius: 4px;
  z-index: 1;
  width: 52%;
  font-size: 16px;
  @media only screen and (max-width: 1000px) {
    font-size: 13px;
  }
`;

const StatsPanel = styled.div``

class Node_Status extends Component {
    chartRef = React.createRef();
    state = {
        stats: null,
        error: false,
        loading: true,
        found: false,
        nodeID: null,
        nodeStatus: "legend bg-error",
        nodeStatusText: "VM Outage",
        toolTipText: "Connection to Node completely lost",
        statsOvertime: [],
        hexColor: "#FF414B"
    };

    async componentDidMount() {
        this.fetchStatList();
        let Node = this.props.match.params.ID;
        if (!Node) return (window.location.href = "/stats?error=NO_ID");
        this.fetchStatList = this.fetchStatList.bind(this);

        this.setState({nodeID: Node});

    }

    fetchStatList = async () => {
        let statRes = await api.fetchStats();

        const {nodeID, statsOvertime} = this.state;
        let inf = this;
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

            this.setState({stats: data});

            let nodes = [];

            data.map(function (entry) {
                let node = "null"

                if (entry) {
                    if (entry.servername) {
                        node = entry.servername.split("Node")[1]
                    }
                }

                nodes.push(node)

                if (!nodes.includes(nodeID)) {
                    inf.setState({found: false, loading: false});
                }

                if (node === nodeID) {
                    console.log(entry);
                    inf.setState({found: true, loading: false});
                    let status = "legend bg-error"; // Default
                    let text = "VM Outage";
                    let toolTip = "Connection to Node completely lost";
                    let color = "#FF414B"

                    let vm = entry.vm;
                    let online = entry.online;

                    if (vm && online) {
                        status = "legend bg-success"
                        text = "Operational"
                        toolTip = "Online and responsive"
                        color = "#01E6CE"
                    }

                    if (!vm && online) {
                        status = "legend bg-error"
                        text = "VM Outage";
                        toolTip = "Connection to Node completely lost";
                    }

                    if (vm) {
                        if (!online) {
                            status = "legend bg-warning";
                            text = "Wings Outage"
                            toolTip = "Online but not connected"
                            color = "#FF9B00"
                        }
                    }

                    statsOvertime.push(entry);

                    inf.setState({
                        nodeStatus: status,
                        nodeStatusText: text,
                        toolTipText: toolTip,
                        statsOvertime,
                        hexColor: color
                    });

                }

            })

        }

        setTimeout(this.fetchStatList, 25 * 1000);
    }

    render() {
        const {
            stats,
            error,
            loading,
            found,
            nodeID,
            nodeStatus,
            nodeStatusText,
            toolTipText,
            statsOvertime,
            hexColor
        } = this.state;

        console.log(statsOvertime)

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
        } else if (found) {

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
                                        <div className="legend-wrapper"
                                             data-tip={toolTipText}
                                             onMouseEnter={() => {
                                                 ReactTooltip.rebuild();
                                             }}>
                                            <div className={nodeStatus}>
                                                <span className="legend-marker"/>{nodeStatusText}
                                            </div>
                                        </div>
                                        <ReactTooltip effect="solid"/>
                                    </Page2>

                                </div>
                            </div>
                        </div>
                    </Intro>

                    {nodeStatusText === "VM Outage" ? (
                        <center>
                            <DangerAlert>
                                Hello this node is currently experiencing issues which means the stats below are not
                                correct
                            </DangerAlert>
                        </center>
                    ) : (
                        <></>
                    )}

                    {nodeStatusText === "Wings Outage" ? (
                        <center>
                            <MinorAlert>
                                Hello this node is currently experiencing issues with wings however the node is online
                            </MinorAlert>
                        </center>
                    ) : (
                        <></>
                    )}


                    {/*

                     removed for now unless someone wants to help me

                     <div className="main chart-wrapper">
                        <LineChart
                            data={statsOvertime}
                            title={"Mem"}
                            color={hexColor}
                        />
                    </div> */}


                    <Footer/>
                </div>
            );
        } else {
            return <NotFound/>;
        }

    }
}

export default withRouter(Node_Status);