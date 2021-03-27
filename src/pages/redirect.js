import React, {Component} from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";

class Stats extends Component {
    state = {};

    async componentDidMount() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | Redirecting </title>
                </Helmet>
                <Navbar/>

                Please wait while we redirect

                <Footer/>
            </div>
        );
    }
}

export default Stats;