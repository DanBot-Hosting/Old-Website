import React, {Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';
import styled from "styled-components";
import Loading from "../images/loading.svg";
import { io } from "socket.io-client";
import { BASE_URL } from '../api'

import Navbar from "../components/nav";
import Footer from "../components/footer";
import Helmet from "react-helmet";

import CurrentUserText from './tickets/CurrentUserText'
import OtherUserText from './tickets/OtherUserText'
import ChatNotification from './tickets/ChatNotification'

let styles = {
	chatRoomContainer: {
		marginTop: 10,
	},
	header:{
		height: "7vh",
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		flexDirection: 'column',
	},
	headerText: {
		fontSize: 20,
	},
	youAppearAsText: {
		fontSize: 14,
		marginTop: 5,
		display: 'flex',
		flexDirection: 'row',
	},
	usernameText:{
		fontWeight: 'bold',
		marginLeft: 3,
		marginRight: 3,
	},
	chatThread: {
		backgroundColor: 'rgba(227, 227, 227, 0.2)',
		flex: 0,
		display: 'flex',
    	flexDirection: 'column',
    	height: "75vh",
    	overflowY: 'auto',
    	width: '45vw',
    	alignSelf: 'center',
    	padding: 20,
    	paddingBottom: 40,
    	border: '1px solid rgba(0, 0, 0, 0.2)',
    	borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
    	marginBottom: 8
	},
	messageInputSection: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	messageTextField: {
		flex: 1
	},
	messageSubmitButton: {
		flex: 0
	}

}

const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

class ChatRoom extends Component {

	constructor(props) {
	    super(props);
		this.socket = io(BASE_URL, {
			auth: {
				token: localStorage.getItem('token')
			}
		});

	    this.state = {
	    	currentUsername: "User1",
	    	currentUserID: 1,
	    	message: '',
			loading: true,
	    	chatRoomData: [
				{
					message: 'Test',
					username: 'User1',
					userID: '34h5fg79',
					staff: true,
				},
				{
					message: 'Test',
					username: 'AJ tracy',
					userID: 'f34h2897',
					staff: true,
				},
				{
					message: 'I am a message',
					username: 'Someone added to ticket',
					userID: '2t3hr4j8',
					staff: false,
				},
				{
					message: 'Message who? lmao',
					username: 'Jesus',
					userID: '2t3hr4j8',
					staff: false,
				},
				{
					message: 'I am staff',
					username: 'Freddie',
					userID: 'ahdfs987',
					staff: true,
				},
				{
					message: 'Now time to abuse',
					username: 'Freddie',
					userID: 'ahdfs987',
					staff: true,
				},
			
	    	],
	    	initialLoad: true,
	    };
	    //Create Ref for managing "auto-scroll"
	    this.messagesEndRef = React.createRef()
	}

	componentDidMount(){

		let userIDVal = localStorage.getItem('userID')
		let usernameVal = localStorage.getItem('username')

		//If user does not have a userid and username saved in local storage, create them for them
		if(!userIDVal){

	      
	    } 
	    else {
	    	
	    }

	}


	setMessage(message){
		//Set Message being typed in input field
		this.setState({message: message})
	}

	sendMessageData(){
		if (this.message?.trim().length < 0) return this.setState({message: ''});

		//to remove
		this.state.chatRoomData.push(
			{
				message: this.state.message,
				username: 'User1',
				userID: '34h5fg79',
				staff: false,
			},
		);

		this.setState({message: ''})
	}


	shouldScrollToBottom(){
		//If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
		if (this.messagesEndRef.current.scrollHeight - this.messagesEndRef.current.scrollTop < this.messagesEndRef.current.offsetHeight + autoScrollOffset){
			this.scrollToBottom()
		}

		//Navigate to end of chat when entering chat the first time
		if(this.state.initialLoad){
			this.scrollToBottom()
			this.setState({initialLoad: false})
		}
	}

	scrollToBottom(){
		//Scrolls user to end of chat message window
		this.messagesEndRef.current.scrollTop = this.messagesEndRef.current.scrollHeight
	}

	parseMessages(chatRoomData){
		const toReturn = [];
		let lastUserID = null;
		for(let i = 0; i < chatRoomData.length; i++){
			let curr = chatRoomData[i];
			if(curr.userID === lastUserID){
				toReturn[toReturn.length - 1 ].message.push(curr.message);
			} else {
				toReturn.push(
					{
						username: curr.username, 
						userID: curr.userID, 
						staff: curr.staff, 
						message: [curr.message]
					}
			);
			};
			lastUserID = curr.userID;
		};
		return toReturn;
	};

	render(){

		let {chatRoomData, currentUsername, loading} = this.state

		if (loading) return (
			<div>
				<Navbar />
				<Description>
                    <br/><br/>
                    <img src={Loading} draggable={false} style={{maxWidth: "210px"}} className="avatar"/>
                </Description>
			</div>
		);

		if (chatRoomData.length === 0) return (
			<div />
		);
		chatRoomData = this.parseMessages(chatRoomData);
		return (
			<div>
				<Navbar />
				<Container style = {styles.chatRoomContainer}>

					<Container style ={styles.header}>
						<Row style={styles.headerText}>Support Ticket</Row>
						<Row style={styles.youAppearAsText}>
							You appear as 
							<div style={styles.usernameText}> {currentUsername}</div>
							in chat
						</Row>
						<a>Notes</a>
					</Container>
					

					<Container style={styles.chatThread} ref={this.messagesEndRef}>
						{chatRoomData.map( (messageData, index) => {

							if(messageData.username == currentUsername) {
								return <CurrentUserText key={index} username={messageData.username} message={messageData.message}/>
							} else if (messageData.username == '') {
								return <ChatNotification key={index} username={messageData.username} message={messageData.message}/>
							} else {
								return <OtherUserText key={index} username={messageData.username} message={messageData.message} staff={messageData.staff} />
							}
							
						})}

						
					</Container>

					<Container style={styles.messageInputSection}>
							<TextField 
								style= {styles.messageTextField}
								id="input-with-icon-adornment" 
								label="Enter Message" 
								variant="outlined"  
								value={this.state.message} 
								onChange={(event) => this.setMessage(event.target.value)}
								onKeyPress= {(event) => {
									if (event.key === 'Enter') {
									console.log('Enter key pressed');
									this.sendMessageData()
									}
								}}
								InputProps={{
									endAdornment:(
										<InputAdornment position="end">
											<IconButton onClick={() => this.sendMessageData()}>
												<SendIcon/>
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
					</Container>

				</Container>
			</div>
		);
	}
}

export default ChatRoom;

const Description = styled.h3`
  color: #fff;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`