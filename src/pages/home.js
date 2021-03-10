import React, { Component } from "react";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";

class Home extends Component {
    state = {
    };

    async componentDidMount() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    {" "}
                    <title> DanBot Hosting | Home </title>{" "}
                </Helmet>
                <Navbar />



                <Footer />
            </div>
        );
    }
}

export default Home;