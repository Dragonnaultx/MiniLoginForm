import React,{PureComponent} from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/index';
import axios from 'axios'




class Allusers extends PureComponent {
    
    state = {
        Allusers:[]
    }
   
    componentDidMount(){
        let request = axios.get('/api/users/').then(response => {
            this.setState({
                Allusers:response.data
            })
        }).catch(e=>{
            console.log(e)
        })
    }

    componentWillMount(){
        this.props.dispatch(getUsers());
    }

    deleteUser = (event,id) => {
        event.preventDefault();
        console.log(id)
        let request = axios.delete(`/api/delete_user/${id}`)
                .then(res =>{
                    console.log(res.data);
                    }).catch((err) => {
                        console.log(err);
                    })
        window.location.reload(); 
                
    }


    showUsers = (user) => {
        let allusers = user.users;
        return (
            allusers ?  
            allusers.map((item,i)=>{ return (
                item.status ?
                <div>
                    <h6 key={i}>{`User number ${i+1}`}</h6>
                    <div><b>Name: </b>{item.name}</div>
                    <div><b>LastName: </b>{item.lastname}</div>
                    <div><b>Username: </b>{item.username}</div>
                    <div><b>Email: </b>{item.email}</div>
                    <div><b>Member since: </b>{item.createdAt}</div>
                    <button onClick={(event) => this.deleteUser(event,item._id)}>Delete user</button>
                    <button>Update</button>
                    <hr/>
                </div> 
                : null
            )
                
        })
    : 'NO USERS CURRENTLY IN DATABASE, LOGIN FIRST!!'
        )
                
    
            
           
    }
       
    

    render(){
        
        let user = this.props.user;

        return (
        <div>
            <h1>ACTIVE USERS LIST</h1>
            {this.showUsers(user)}
        </div>
        )
        
    }     

}
function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Allusers)