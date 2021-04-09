import React, {Component} from "react";
import Navbar from "../../components/nav";
import Footer from "../../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../../util/api";
import LoadingIMG from "../../images/logo.png";
import Loading from "../../images/loading.svg";
import Error from "../error";
import {Link} from "react-router-dom";
import AccountSidebar from "../../components/account-sidebar";

const HomePage = styled.div`
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
  text-align: center;
  align-items: center;
  padding: 50px;
  background: #2a2c30;
  border-radius: 5px;
  margin: 10.5px 20px 20px;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    padding: 35px 25px 25px;
  }
`

const Description = styled.h3`
  color: #fff;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 15px;
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
const Page2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  color: #fff;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`

const Image = styled.img`
  max-width: 100%;
  border-radius: 100% !important;
  margin: auto 0;
  max-height: 150px;
  vertical-align: middle;
  border-style: none;

  @media only screen and (max-width: 767px) {
    margin: 0 auto;
    max-width: 150px;
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
  width: 400px;
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
  left: 0;
  z-index: 2;
  text-shadow: 4px 4px 8px #2a2c30;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 180px;
  color: #ffffff;

  @media only screen and (max-width: 900px) {
    font-size: 17px;
    max-width: none;
    width: 50vw;
    order: 3;
  }
`

const Status = styled.div`
  width: 0.5rem;
  position: absolute;
  right: 0px;
  color: #78a4fa;
`

class Account_Server_List extends Component {
    state = {
        servers: null
    }

    async componentDidMount() {
        if (this.props.servers) {
            this.setState({servers: this.props.servers});
        }
    }

    render() {
        const {servers} = this.state;

        if (servers) {
            return (
                <>
                    <Container>
                        {servers.map(server => {
                            console.log(server.attributes)

                            let status = "legend bg-error"; // Default

                            if (server.attributes.status === "installing") {
                                status = "legend bg-warning";
                            }

                            /*if (vm && online) {
                                status = "legend bg-success"
                            }

                            if (!vm && online) {
                                status = "legend bg-error"
                            }

                            if (vm) {
                                if (!online) {
                                    status = "legend bg-warning";
                                }
                            }*/
                            return (
                                <Link to={`/account/servers/${server.attributes.identifier}`} style={{"textDecoration":"none"}} key={`server-${server.attributes.identifier}`}>
                                    <Info>
                                        <Name>
                                            {server.attributes.name}
                                        </Name>

                                        <Status color={status}>

                                        </Status>

                                    </Info>
                                </Link>
                            )
                        })}
                    </Container>

                </>
            )
        } else {
            return (
                <Description>No Servers found</Description>
            )
        }

    }
}

class Account_Index extends Component {
    state = {
        user: null,
        fetchingUserInfo: true,
        userInfo: null,
        error: false,
        fetchingUserServers: true,
        userServers: null
    };

    async componentDidMount() {
        this.fetchUserServers = this.fetchUserServers.bind(this);
        let user = localStorage.getItem("user");
        if (user === "n/a") return (window.location.href = api.getOauth());
        if (!user) return (window.location.href = api.getOauth());

        user = JSON.parse(user);

        this.setState({user: user});

        try {

            let userInfo = await api.fetchUser(user.id);
            console.log(userInfo)
            if(userInfo.error) {
                if (userInfo.message === "User not found") {
                    this.setState({fetchingUserInfo: false, userInfo: null});
                } else {
                    this.setState({fetchingUserInfo: false, error: true});
                }
            }

            if(userInfo.data) {
                this.setState({fetchingUserInfo: false, userInfo: userInfo.data});
            }
        } catch (e) {
            console.log(e)
            this.setState({fetchingUserInfo: false, error: true});
        }

        this.fetchUserServers()

    }

    fetchUserServers() {
        (async() => {
            let user = localStorage.getItem("user");
            user = JSON.parse(user);
            try {
                let userServers = await api.fetchUserServers(user.id);
                console.log(userServers)

                if(userServers.error) {
                    this.setState({fetchingUserServers: false, error: true});
                } else {
                    if(userServers.data) {
                        this.setState({fetchingUserServers: false, userServers: userServers.data});
                    } else {
                        this.setState({fetchingUserServers: false, error: true});
                    }
                }

            } catch (e) {
                console.log(e);
                this.setState({fetchingUserServers: false, error: true});
            }
        })()
    }

    render() {
        const {user, fetchingUserInfo, error, userInfo, fetchingUserServers, userServers} = this.state;

        let tag = "User#0000";
        let avatar = LoadingIMG;
        let username = "User";
        let discriminator = "#0000"

        if (user) {
            tag = user.username + "#" + user.discriminator;
            avatar = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar;
            username = user.username;
            discriminator = user.discriminator;
        }

        let defStyle = {
            "float": "right",
            "marginLeft": "2rem",
            "marginTop": "3rem",
            "fontSize": "25px",
            "color": "#fff"
        }

        if (error) {
            return <Error/>;
        } else if (fetchingUserInfo) {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Account </title>
                    </Helmet>
                    <Navbar/>

                    <Intro>
                        <div style={{display: "flex"}}>
                            <center>
                                <Image
                                    className="avatar"
                                    style={{float: "left"}}
                                    src={avatar}
                                    draggable="false"
                                    alt={"Could not load"}
                                />{" "}
                                &nbsp;{" "}
                                <a style={defStyle}>{tag}</a>
                            </center>
                        </div>

                        <a
                            href="#/"
                            className="btn user-profile logout"
                            onClick={e => {
                                e.preventDefault();
                                localStorage.removeItem("user");
                                localStorage.removeItem("code");
                                window.location.href = "/?success=logged_out";
                            }}
                        >
                            {" "}
                            Logout{" "}
                        </a>

                    </Intro>

                    <Description>
                        <br/>
                        <img src={Loading} draggable={false} style={{maxWidth: "210px"}} className="avatar"/>
                    </Description>

                    <Footer/>
                </div>
            );
        } else if (userInfo) {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Account </title>
                    </Helmet>
                    <Navbar/>

                    <Intro>
                        <div style={{display: "flex"}}>
                            <center>
                                <Image
                                    className="avatar"
                                    style={{float: "left"}}
                                    src={avatar}
                                    draggable="false"
                                    alt={"Could not load"}
                                />{" "}
                                &nbsp;{" "}
                                <a style={defStyle}>{tag}</a>
                            </center>
                        </div>

                        <a
                            href="#/"
                            className="btn user-profile logout"
                            onClick={e => {
                                e.preventDefault();
                                localStorage.removeItem("user");
                                localStorage.removeItem("code");
                                window.location.href = "/?success=logged_out";
                            }}
                        >
                            {" "}
                            Logout{" "}
                        </a>

                    </Intro>

                    <div>
                        <AccountSidebar/>

                    </div>

                    {fetchingUserServers ? (
                        <Description>
                            <br/><br/>
                            <img src={Loading} draggable={false} style={{maxWidth: "210px"}} className="avatar"/>
                        </Description>
                    ) : (
                        <Account_Server_List servers={userServers}/>
                    )}

                    <Footer/>
                </div>
            );
        } else {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | No Account </title>
                    </Helmet>

                    <Navbar/>

                    <Intro>
                        <div style={{display: "flex"}}>
                            <center>
                                <Image
                                    className="avatar"
                                    style={{float: "left"}}
                                    src={avatar}
                                    draggable="false"
                                    alt={"Could not load"}
                                />{" "}
                                &nbsp;{" "}
                                <a style={defStyle}>{tag}</a>
                            </center>
                        </div>

                        <a
                            href="#/"
                            className="btn user-profile logout"
                            onClick={e => {
                                e.preventDefault();
                                localStorage.removeItem("user");
                                localStorage.removeItem("code");
                                window.location.href = "/?success=logged_out";
                            }}
                        >
                            {" "}
                            Logout{" "}
                        </a>

                    </Intro>

                    <center>
                        <HomePage>
                            <Title>Hi, {user.username} it seems you do not have an account. <br/> <Link
                                style={{"textDecoration": "underline", "color": "inherit"}} to={"/account/new"}>Click
                                Here</Link> to create an account <br/> If you think this is wrong please join our <a
                                href={"/discord"} target="_blank"
                                style={{"textDecoration": "underline", "color": "inherit"}}>Discord Server</a>
                            </Title>
                        </HomePage>
                    </center>

                    <Footer/>
                </div>
            );
        }

    }
}

export default Account_Index;