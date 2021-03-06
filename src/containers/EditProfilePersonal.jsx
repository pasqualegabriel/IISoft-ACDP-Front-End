import React, { Component } from 'react';
import UserService from '../Services/UserService';
import 'react-notifications/lib/notifications.css'
import { Form, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const styles={
    box:{
            margin          : 'auto',
            marginBottom    : 'center',
            textAlign       : 'center',
            border          : '1px solid #2d2e2f',
            padding         : '5em', 
            width           : '50%',
            backgroundColor : 'rgb(27, 28, 29)'
        }
}
export default class EditProfilePersonal extends Component {
    
    constructor(){
        super();
        this.userService = new UserService()
        this.state = {
            name: "",
            surname: "",
            argsSignup: {}
        }
    }
    

    handleChange = (ev, {name, value}) => {
        const argsSignup = this.state.argsSignup
        argsSignup[name] = value
        this.setState({ [name]: argsSignup[name]})
    }

    save=()=>{
        console.log(this.userService.GetUserLogged())
        this.userService.setUserPerfil(this.userService.GetUserLogged().userName)
       
       
        const editPerfil ={
           id:this.userService.GetUserLogged().id,
           userID : this.userService.GetUserLogged().userID,
           userName:  this.userService.GetUserLogged().userName,
           name: this.state.name,
           surname: this.state.surname,
           mail: this.userService.GetUserLogged().mail,
           birthDate: this.userService.GetUserLogged().birthDate

        }
        
        this.userService.postProfilePersonal(editPerfil).catch(err => alert(err))
    }

    verifyIcon = (aBool) => {
        if(aBool) {
            return <Icon name="check circle outline" color="green" size="large" />
        } else {
            return <Icon name="circle outline" color="red" size="large" />
        }
    }

    verifyChange = (value) => this.verifyIcon(value !== "")

    verifyName = () => this.verifyChange(this.state.name)

    verifySurname = () => this.verifyChange(this.state.surname)


    render(){
        return (
            <div>
                <div style={styles.box}>
                    <Form.Field>
                        <Form.Input name="name" 
                                    onChange={this.handleChange}
                                    fluid
                                    placeholder='name' 
                                    icon={this.verifyName}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name="surname" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='surname' 
                                        icon={this.verifySurname}/>
                    </Form.Field>
                    <Button.Group attached='bottom'>
                        <Button content='Confirmar'
                                color="instagram"
                                disabled={  this.state.name === "" ||
                                            this.state.birthDate === "" ||
                                            this.state.surname === ""}
                                onClick= {this.save}
                                as={Link}
                                to='/'
                                name='Home'/>
                        <Button content='Cancelar'
                                color="instagram"
                                as={Link}
                                to='/'
                                name='Home'/>
                    </Button.Group>
                </div>
            </div>
        )
      }

}