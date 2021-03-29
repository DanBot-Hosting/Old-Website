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

        setTimeout(this.fetchStatList, 15 * 1000);
    }

    render() {
        const {stats, error, loading} = this.state;
        console.log(stats)

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
                    <div className="guild">
                        <h2 className="name" style={{color: "#fff"}}>
                            Node {entry.servername.split("Node")[1]}
                        </h2>
                    </div>
                )
            })

            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Stats </title>
                    </Helmet>
                    <Navbar/>


                    <div className="user-guilds">
                        <div className="guilds">

                            {statMap}

                        </div>
                    </div>

                    <Footer/>
                </div>
            );
        }

    }
}

export default Stats;