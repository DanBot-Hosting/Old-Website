import React, {Component} from "react";
import Navbar from "../../components/nav";
import Footer from "../../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../../util/api";
import LoadingIMG from "../../images/logo.png";
import Loading from "../../images/loading.svg";
import AccountSidebar from "../../components/account-sidebar";
import {confirmAlert} from "react-confirm-alert";
import "../../styles/404.css";

var crypto = require('crypto');

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
  font-size: 35px;
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

const Label = styled.label`
  font-weight: bold;
  color: white;
  letter-spacing: 0.025em;
  font-size: 1.125em;
  line-height: 1.25;
  position: relative;

  padding: 0.75em 1em;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border-radius: 0;
  border: none;
  background: none;
  display: block;

  :after {
    content: " *";
    color: #E8474C;
    font-weight: normal;
    font-size: 0.75em;
    vertical-align: top;
  }

`

const Form = styled.form`
  max-width: 40em;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;

`

const PField = styled.p`
  width: 100%;
  margin: 0 0 1.5em 0;`

const Input = styled.input`
  font: inherit;
  line-height: normal;
  width: 100%;
  box-sizing: border-box;
  background: #222222;
  color: white;
  position: relative;
`

const Intro2 = styled(Intro)`

  width: 75%;
  //right: 0;
  float: right;
  margin-right: 4rem;

  @media only screen and (max-width: 767px) {
    right: unset;
    width: unset;
  }
`

const Button = styled.div`
  font: inherit;
  line-height: normal;
  width: 100%;
  box-sizing: border-box;
  background: #222222;
  color: white;
  position: relative;

  :after {
    content: "Click Here";
  }
`

class Account_Settings extends Component {
    state = {
        user: null,
        fetchingUserInfo: true,
        userInfo: null,
        error: false,
        fetchingUserServers: true,
        userServers: null,
        sendingUserCode: true,
        userCode: null,
        verifying: false,
        verified: false
    };

    async componentDidMount() {
        let user = localStorage.getItem("user");
        if (user === "n/a") return (window.location.href = api.getOauth());
        if (!user) return (window.location.href = api.getOauth());
        user = JSON.parse(user);

        this.setState({user: user});

        try {

            let userInfo = await api.fetchUser(user.id);
            if (userInfo.error) {
                if (userInfo.message === "User not found") {
                    this.setState({fetchingUserInfo: false, userInfo: null});
                } else {
                    this.setState({fetchingUserInfo: false, error: true});
                }
            }

            if (userInfo.data) {
                this.setState({fetchingUserInfo: false, userInfo: userInfo.data});
            }
        } catch (e) {
            console.log(e)
            this.setState({fetchingUserInfo: false, error: true});
        }


    }

    resetPassword = async () => {

        let error = false;

        let code = await api.fetchUserCode(this.state.user.id);
        if (code.error) {
            error = true;
        }

        if (code.data) {
            if (code.data.code) {

                var mykey = crypto.createDecipher(
                    "aes-128-cbc",
                    process.env.REACT_APP_API_TOKEN
                );
                var mystr = mykey.update(code.data.code, "hex", "utf8");
                mystr += mykey.final("utf8");

                this.setState({userCode: mystr, sendingUserCode: false})
            }
        }

        confirmAlert({
            customUI: ({onClose}) => {

                const {sendingUserCode, verifying, verified} = this.state;

                if (error) {
                    return (
                        <div className="heading">

                            <figure>
                                <div className="sad-mac"/>
                                <Title>Oops! I ran into an error while processing your request.</Title>

                            </figure>

                        </div>
                    );
                } else {
                    if (sendingUserCode) {
                        return (
                            <div className="heading">
                                <Intro>
                                    <Description>We're sending a code to your email</Description>
                                    <br/>

                                    <center>
                                        <img src={Loading} draggable={false} style={{maxWidth: "180px"}}
                                             className="avatar"/>
                                    </center>

                                </Intro>
                            </div>
                        );
                    } else {
                        return (
                            <div className="heading">
                                <Intro>
                                    <Description>We sent a code to your email</Description>
                                    <br/>
                                    <Form onSubmit={e => {
                                        e.preventDefault();

                                        this.setState({verifying: true})
                                        const form = e.target;
                                        const data = new FormData(form);

                                        for (let name of data.keys()) {
                                            const input = form.elements[name];
                                            const parserName = input.dataset.parse;
                                            if (parserName) {
                                                const parsedValue = inputParsers[parserName](data.get(name));
                                                data.set(name, parsedValue);
                                            }
                                        }

                                        let d = stringifyFormData(data);

                                        if (this.state.userCode === JSON.parse(d).code) {

                                            var mykey = crypto.createCipher('aes-128-cbc', process.env.REACT_APP_API_TOKEN);
                                            var mystr = mykey.update(this.state.userCode, 'utf8', 'hex')
                                            mystr += mykey.final('hex');

                                            var mykey2 = crypto.createCipher('aes-128-cbc', process.env.REACT_APP_API_TOKEN);
                                            var mystr2 = mykey2.update(JSON.parse(d).code, 'utf8', 'hex')
                                            mystr2 += mykey2.final('hex');

                                            localStorage.setItem("ver", mystr);
                                            localStorage.setItem("c", mystr2);
                                            window.location.href = "/account/settings/password-reset"
                                        } else {
                                            window.location.href = "/account/settings/?error=invalid_code"
                                        }

                                    }}

                                          className={"form"}>

                                        <PField className='field required '>
                                            {verifying ? (
                                                <Input className='text-input' id='code' name='code' required
                                                       readonly={"readonly"} type='text'/>
                                            ) : (
                                                <Input className='text-input' id='code' name='code' required
                                                       type='text'/>
                                            )}
                                        </PField>

                                        {verified === "nope" ? (
                                            <Description>Invalid Code</Description>
                                        ) : (
                                            <></>
                                        )}

                                        <PField className='field'>
                                            <Input className='button' type='submit' defaultValue='Send'/>
                                        </PField>

                                    </Form>
                                </Intro>
                            </div>
                        );
                    }
                }
            }
        });
    };


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

        if (fetchingUserInfo) {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Account Settings </title>
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
                                />
                                &nbsp;
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
        } else {
            return (
                <div>
                    <Helmet>
                        <title> DanBot Hosting | Account Settings </title>
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

                    <AccountSidebar/>

                    {/*content

                    style={{ "width": "75%", "position": "absolute", "right": 0 }}

                    */}

                    <Intro2>
                        <Form className='form'>

                            <PField className='field required '>
                                <Label htmlFor='email'>E-mail</Label>
                                <Input className='text-input' id='email' name='email' defaultValue={userInfo.email}
                                       required type='email'/>
                            </PField>

                            <PField className='field half required'>
                                <Label htmlFor='login'>Username</Label>
                                <Input className='text-input' id='username' name='username'
                                       defaultValue={userInfo.username} required type='text'/>
                            </PField>

                            <PField className='field half required'>
                                <Label htmlFor='password'>Password Reset</Label>
                                <Button className='button' style={{"textAlign": "center"}}
                                        onClick={this.resetPassword}/>
                            </PField>

                        </Form>


                    </Intro2>

                    <Footer/>
                </div>
            );
        }

    }
}

export default Account_Settings;

const inputParsers = {
    date(input) {
        const split = input.split("/");
        const day = split[1];
        const month = split[0];
        const year = split[2];
        return `${year}-${month}-${day}`;
    },
    uppercase(input) {
        return input.toUpperCase();
    },
    number(input) {
        return parseFloat(input);
    }
};

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}