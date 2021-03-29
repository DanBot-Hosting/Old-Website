import React, {Component} from "react";
import "../styles/404.css";
import Helmet from "react-helmet";
import Navbar from "../components/nav";

class FourOhfour extends Component {

    render() {

        return (
            <div>
                <Helmet>
                    <title> DanBot Hosting | 404 </title>
                </Helmet>

                <Navbar/>

                <figure>
                    <div className="sad-mac"/>
                    <figcaption>
                        <span className="sr-text">Error 404: Not Found</span>
                        <span className="e"/>
                        <span className="r"/>
                        <span className="r"/>
                        <span className="o"/>
                        <span className="r"/>
                        <span className="_4"/>
                        <span className="_0"/>
                        <span className="_4"/>
                        <span className="n"/>
                        <span className="o"/>
                        <span className="t"/>
                        <span className="f"/>
                        <span className="o"/>
                        <span className="u"/>
                        <span className="n"/>
                        <span className="d"/>
                    </figcaption>
                </figure>

            </div>
        );
    }
}

export default FourOhfour;