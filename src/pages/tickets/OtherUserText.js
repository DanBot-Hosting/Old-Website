import React, {Component } from 'react';
import { Row, Container } from 'react-bootstrap';

let styles = {
  userTextContainer: {
  	marginBottom: 20,
  	marginRight: '25%',
  	flex: 0,
  	justifyContent: 'flex-start',
  	display: 'flex',
  },
  textBubble: {
  	padding: 10,
  	backgroundColor: '#E6E6E6',
  	justifyContent: 'flex-start',
  	flex: 0,
  	display: 'flex',
  	textAlign: 'left',
  	borderRadius: 8,
  	color:'black'
  },
  usernameText:{
  	fontSize:12,
  	display: 'flex',
  	justifyContent: 'flex-start',
  	marginBottom: 3,
  }
}

class OtherUserText extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	username: '',
	    	message: [],
			staff: false,
	    };

	}

	componentDidMount(){
		var {message, username, timestamp, staff} = this.props

		this.setState({message, username, staff})
	}

	componentWillUnmount(){
	}

	render(){
		const {username, message, staff} = this.state

		let {chatRoomData} = this.state
		// console.log(message, "MESSAGE");
		return (
			<Row style={styles.userTextContainer}>
				<Container>
				{staff ? 
					<Row style={{...styles.usernameText, color: 'navy' }}>
						<strong>{username + ' | DBH Staff'}</strong>
					</Row>
					:
					<Row style={{...styles.usernameText, }}>
							{username}
				</Row>}
				{
					message.map((currMessage, index) => {
						if (index > 0) return (
							<Row style={{...styles.textBubble, 'margin-top': 5,}}>
								{currMessage}
							</Row>
						)
						return (
							<Row style={styles.textBubble}>
								{currMessage}
							</Row>
						)
					})
				}
				</Container>
			</Row>
		);
	}
}

export default OtherUserText;