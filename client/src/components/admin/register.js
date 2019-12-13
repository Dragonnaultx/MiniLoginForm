import React, { PureComponent } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import './css.css';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions/index';

class Register extends PureComponent {
    state = {
        name:'',
        lastname:'',
        email:'',
        password:'',
        username:'',
        registerError:'',
        loading: false,
       
    }

    componentWillMount(){
        this.props.dispatch(getUsers())
    }



    handleInputEmail = (event) => {
        this.setState({email:event.target.value})
    } 
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    } 
    handleInputUsername = (event) => {
        this.setState({username:event.target.value})
    }
    handleInputName = (event) => {
        this.setState({name:event.target.value})
    } 
    handleInputLastname = (event) => {
        this.setState({lastname:event.target.value})
    } 
    
    componentWillReceiveProps(nextProps){
        if(nextProps.user.register === false){
            this.setState({error:'Error,try again'})
        } else{
            
            this.setState({
                name:'',
                lastname:'',
                email:'',
                username:'',
                password:''
            })
            
        }
       
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({error:''});

        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            username:this.state.username,
            name:this.state.name,
            lastname:this.state.lastname
        },this.props.user.users))
        
    }

    
    submitButton = () => (
        this.state.loading ? 'Loading...' : 
        <div className='bootbutton'>
        <ButtonToolbar>
            <Button type="submit"
            variant="secondary" size="lg" active className='first'>
             Register
            </Button>
        </ButtonToolbar>
        </div>

    )

    render(){
        return(
            <div className="logContainer">
                <form onSubmit={this.submitForm}>
                    <h2>Register</h2>
                    <div className='formContainer'></div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.name}
                            onChange={this.handleInputName}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Lastname"
                            value={this.state.lastname}
                            onChange={this.handleInputLastname}
                         />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={this.state.username}
                            onChange={this.handleInputUsername}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                         />
                    </div>

                    <div className="form_element">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                         />
                    </div>
                    {this.submitButton()}
                    <div className="error">
                        {this.state.error}
                    </div>

                </form>
            </div>
        ) 
    }
}
function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Register)