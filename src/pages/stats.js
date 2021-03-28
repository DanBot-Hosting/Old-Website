import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import * as api from "../util/api";
import styled from "styled-components";
import LoadingIMG from "../images/loading.svg";

const Loading = styled.img`
  height: 70%;
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
        console.log(statRes);

        if (statRes.error) {
            this.setState({error: true, loading: false});
        } else {
            this.setState({stats: statRes.data, loading: false});
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
                    <br/><br/><br/><br/><br/><br/>
                    <center>
                        <Loading src={LoadingIMG} style={{maxWidth: "170px"}} draggable="false"/>
                    </center>


                    <Footer/>
                </div>
            );
        } else {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Stats </title>
                    </Helmet>
                    <Navbar/>


                    <Footer/>
                </div>
            );
        }

    }
}

export default Stats;