import React, {Component} from "react";
import "../styles/404.css";
import Helmet from "react-helmet";
import Navbar from "../components/nav";

class Home extends Component {
    state = {};

    async componentDidMount() {

    }

    render() {

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | 404 </title>
                </Helmet>

                <Navbar/>

                <figure>
                    <div className="sad-mac"></div>
                    <figcaption>
                        <span className="sr-text">Error 404: Not Found</span>
                        <span className="e"></span>
                        <span className="r"></span>
                        <span className="r"></span>
                        <span className="o"></span>
                        <span className="r"></span>
                        <span className="_4"></span>
                        <span className="_0"></span>
                        <span className="_4"></span>
                        <span className="n"></span>
                        <span className="o"></span>
                        <span className="t"></span>
                        <span className="f"></span>
                        <span className="o"></span>
                        <span className="u"></span>
                        <span className="n"></span>
                        <span className="d"></span>
                    </figcaption>
                </figure>

            </div>
        );
    }
}

export default Home;