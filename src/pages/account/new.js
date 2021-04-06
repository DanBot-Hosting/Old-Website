import React, {Component} from "react";
import Navbar from "../../components/nav";
import Footer from "../../components/footer";
import Helmet from "react-helmet";
import styled from "styled-components";
import * as api from "../../util/api";
import LoadingIMG from "../../images/logo.png";
import Loading from "../../images/loading.svg";
import Error from "../error";


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
  text-align: center;
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

// temo
const Label = styled.label`
  font-weight: bold;
  color: white;
  letter-spacing: 0.025em;
  font-size: 1.125em;
  line-height: 1.25;
  position: relative;
  z-index: 100;

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

const Button = styled.button`
  font: inherit;
  line-height: normal;
  cursor: pointer;
  background: #E8474C;
  color: white;
  font-weight: bold;
  
  margin-left: auto;
  font-weight: bold;
  padding-left: 2em;
  padding-right: 2em;
`

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

class Account_New extends Component {
    state = {
        user: null,
        fetchingUserInfo: true,
        userInfo: null,
        error: false,
        password: "",
        alert: false,
        msg: null,
        type: null
    };

    async componentDidMount() {
        this.passwordGenerator = this.passwordGenerator.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        let user = localStorage.getItem("user");
        if (user === "n/a") return (window.location.href = api.getOauth());
        if (!user) return (window.location.href = api.getOauth());

        user = JSON.parse(user);

        this.setState({user: user});

        try {
            let userInfo = await api.fetchUser(user.id);
            if(userInfo.error) {
                if (userInfo.message === "User not found") {
                    this.setState({fetchingUserInfo: false, userInfo: null});
                } else {
                    this.setState({fetchingUserInfo: false, error: true});
                }
            }

            if(userInfo.data) {
                window.location = "/account"
            }
        } catch (e) {
            console.log(e)
            this.setState({fetchingUserInfo: false, error: true});
        }

    }

    passwordGenerator() {
        this.setState(state => ({
            password: Math.random().toString(36).slice(2)
        }));
    }

    handleSubmit(event) {
        let currentComponent = this;
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        for (let name of data.keys()) {
            const input = form.elements[name];
            const parserName = input.dataset.parse;
            if (parserName) {
                const parsedValue = inputParsers[parserName](data.get(name));
                data.set(name, parsedValue);
            }
        }

        gg();

        async function gg() {

                let d = await api.userCreate(
                    JSON.parse(localStorage.getItem("user")).id,
                    stringifyFormData(data)
                );
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                if (d) {
                    if(d.error) {
                        currentComponent.setState({
                            alert: true,
                            msg: "Could not create you an account. Please Try Again",
                            type: "danger"
                        });
                    } else {
                        currentComponent.setState({
                            alert: true,
                            msg: "Your account has been created!",
                            type: "success"
                        });
                        setTimeout(() => {
                            currentComponent.setState({
                                alert: false
                            });
                        }, 4500);
                    }
                } else {
                    currentComponent.setState({
                        alert: true,
                        msg: "Could not create you an account. Please Try Again",
                        type: "danger"
                    });
                }

        }
    }

    render() {
        const {user, fetchingUserInfo, error, userInfo, password, alert, msg, type} = this.state;
        console.log(user,userInfo,alert,msg,type)

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

                    </Intro>

                    <Intro>
                        {alert ? (
                            <center><Description className={type} >{msg}</Description></center>
                        ):(
                            <></>
                        )}
                        <Form onSubmit={this.handleSubmit} className='form'>
                            <input type="hidden" name="id" value={user.id}/>
                            <PField className='field required '>
                                <Label htmlFor='email'>E-mail</Label>
                                <Input className='text-input' id='email' name='email' required type='email'/>
                            </PField>

                            <PField className='field half required'>
                                <Label htmlFor='login'>Username</Label>
                                <Input className='text-input' id='username' name='username' required type='text'/>
                            </PField>
                            <PField className='field half required'>
                                <Label htmlFor='password'>Password</Label>
                                <Input className='text-input' id='password' name='password' required type='password' defaultValue={password} />
                            </PField>


                                <PField className='field half'>
                                    <Input className='button' type='submit' defaultValue='Send'/>
                                </PField>

                            <PField className='field half'>
                                <Input className='button' style={{ "textAlign": "center" }} onClick={this.passwordGenerator} defaultValue='Generate Password'/>
                            </PField>

                            {password !== "" ? (
                                <PField className='field  required'>
                                    <Label htmlFor='password'>Password: {password}  </Label>
                                </PField>
                            ):(
                                <></>
                            )}

                        </Form>
                    </Intro>

                    <Footer/>
                </div>
            );
        }

    }
}

export default Account_New;

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}