import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

// const User = ({match}) => {
//   return( <h1>Welcome User {match.params.username}</h1> )
// }

const User = (params) => {
	return( <h1>Welcome User {params.username}</h1> )
}


class App extends Component {
    state = {
		loggedIn:false
	}

	// loginHandle = () => {
	// 	this.setState({loggedIn:true})
	// }

	loginHandle = () => {
		this.setState(prevState => ({
			loggedIn: !prevState.loggedIn
		}))
	}

	render() {
		return (
			<Router>
				<div className="App">
					{/* <ul>
						<li>
						<Link to="/">Home</Link>
						</li>
						<li>
						<Link to="/about">About</Link>
						</li>
						<li>
						<Link to="/user/john">User John</Link>
						</li>	
						<li>
						<Link to="/user/peter">User Peter</Link>
						</li>						
					</ul> */}

					<ul>
						<li>
						<NavLink to="/" activeStyle={{color:'green'}} exact >Home</NavLink>
						</li>
						<li>
						<NavLink to="/about" activeStyle={{color:'green'}} exact>About</NavLink>
						</li>
						<li>
						<NavLink to="/user/john" activeStyle={{color:'green'}} exact >User John</NavLink>
						</li>	
						<li>
						<NavLink to="/user/peter" activeStyle={{color:'green'}} exact >User Peter</NavLink>
						</li>						
					</ul>	

					{/* <Prompt 
						when={!this.state.loggedIn} 
						message="Are you sure?"
					/> */}

					<Prompt 
						when={!this.state.loggedIn} 
						message={(location) => {
							return location.pathname.startsWith('/user') ? "Are you sure?" : true
						}}
					/>					

					<input type="button" value={this.state.loggedIn ? 'Logout' : 'Login'} onClick={this.loginHandle.bind(this)}/>				

					<Route  path="/" exact  strict render={()=>{
						return(<h1>Welcome Home</h1>)
					}}/>

					<Route path="/about" exact strict render={()=>{
						return(<h1>About Us</h1>)
					}}/>

					<Route path="/user/:username" exact strict render={({match})=>(
						this.state.loggedIn ? (<User username={match.params.username}/>) : (<Redirect to="/" />)
					)} />
					{/* <Route path="/user/:username" exact strict component={User} /> */}

				</div>
			</Router>
		);
	}
}

export default App;
