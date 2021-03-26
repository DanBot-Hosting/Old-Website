import React, { Component } from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";

class Stats extends Component {
    state = {
        stats: null
    };

    async componentDidMount() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    {" "}
                    <title> DanBot Hosting | Stats </title>{" "}
                </Helmet>
                <Navbar />
                

                <Footer />
            </div>
        );
    }
}

export default Stats;