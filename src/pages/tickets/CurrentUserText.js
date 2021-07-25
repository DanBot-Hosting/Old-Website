import React, {Component } from 'react';
import { Row, Container } from 'react-bootstrap';

let styles = {
  currentUserTextContainer: {
  	marginBottom: 20,
  	flex: 0,
  	justifyContent: 'flex-end',
  	display: 'flex',
  	marginLeft: '25%',
  },
  textBubble: {
  	padding: 10,
  	backgroundColor: '#0071BC',
  	justifyContent: 'flex-start',
  	flex: 0,
  	display: 'flex',
  	borderRadius: 8,
  	textAlign: 'right',
  	color:'white'
  },
  usernameText:{
  	fontSize:9
  }
}

 class CurrentUserText extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	username: '',
	    	message: [],
	    };

	}

	componentDidMount(){
		var {message, username, timestamp} = this.props

		this.setState({message, username})


	}

	componentWillUnmount(){
	}

	
	render(){
		const {username, message} = this.state
		console.log(message, "MESSAGE");

		let {chatRoomData} = this.state

		return (
			<Row style={styles.currentUserTextContainer}>
				<Container>
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

export default CurrentUserText;