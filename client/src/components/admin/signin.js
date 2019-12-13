import React, {Component} from 'react';
import { connect } from 'react-redux';

import {ButtonToolbar, Button} from 'react-bootstrap';
import { loginUser } from '../../actions'
import './css.css';

class SignIn extends Component {
    state = {
        email:'',
        password:'',
        error:'',
        success:false,
        // displayNick:false
       
    }

    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/')
         
        }
       
    }


    submitForm = (e) =>{
        e.preventDefault();
        this.props.dispatch(loginUser(this.state))
    }
    
    submitButton = () => (
        this.state.loading ? 'Loading...' : 
        <div className='bootbutton'>
        <ButtonToolbar>
            <Button type="submit"
            variant="secondary" size="lg" active className='Second'>
             Login
            </Button>
        </ButtonToolbar>     
        </div>

    )
    render(){
        let user = this.props.user;
        console.log(user.username)
        return(
            <div className='logContainer'>
                <form onSubmit={(event)=>this.submitForm(event, null)}>
                    <h2>Login</h2>
                    <div className='formContainer'>
                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="Enter your mail"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                        />
                    </div>
                    </div>
                    
                    {this.submitButton()}
                    <div className="error">
                    {
                        user.login ? 
                            <div>{user.login.message}</div>
                        :null
                    }
                    </div>
                </form>

            </div>
        ) 
    }
}
function mapStateToProps(state){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(SignIn)