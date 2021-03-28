import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";
import * as api from "../util/api";

class Stats extends Component {
    state = {
        stats: null
    };

    async componentDidMount() {
        this.fetchStatList()
    }

    fetchStatList = async () => {
        let statRes = await api.fetchStats();
        console.log(statRes);

        setTimeout(this.fetchStatList, 15 * 1000);
    }

    render() {

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

export default Stats;