import React, { Component } from 'react';

import axios from 'axios';
import {Form,Button,Segment, Item,Grid } from 'semantic-ui-react'

export default class ListPublication extends Component {

  constructor(props){
    super();
    console.log("Construyo")
    this.list =[]
    this.state ={
      category: "",
      publication: [],
      reply:"",
      title:""
    }
  }
  


   setPublicationByIdCategory=async(anIdCategory)=>{
    axios.get('http://localhost:8080/publication/' + anIdCategory)
    .then(response => {
      
      const publication = response.data;

      console.log(publication)
      this.setState({ category:anIdCategory,
                      publication  });
    })
    

  }

  componentDidMount=()=>{
 
    console.log(this.props.idCategory)
    this.setPublicationByIdCategory(this.props.idCategory)
  }

  //Es para saver si hay que actualizar o no, comparo el nuevo state y props contra los viejos, si alguno es distinto debo actualizar
  shouldComponentUpdate=(nextProps, nextState)=>{

    return (nextProps.idCategory !== this.props.idCategory) || (nextState.category !== this.state.category)
  }    

  componentDidUpdate=(prevProps, prevState)=>{
    console.log(this.props.idCategory)
    //Se Chequea las props nuevas contra las viejas para asegurarse si hay que actualizar
    if (prevProps.idCategory !== this.props.idCategory)
    { 
      console.log("ACTUALIZO!!!")
      this.setPublicationByIdCategory(this.props.idCategory) 
    }
  }
  registryReply=(aReply)=>{
    this.setState({
      reply: aReply
    })
  }

  registryTitle=(aTitle)=>{
    this.setState({
      title: aTitle,
    })

  }

  postPublication=()=>{
    console.log("Entre como loco");
   
    axios.post('http://localhost:8080/publication/',  
    {
        whoPublishedIt  : "pepita",  
        text            : this.state.reply,
        title           : this.state.title,
        idCategory      : this.state.category,
        date            :  "3918-07-22T03:00:00Z"

    } )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  
  render(){
    console.log("Hago Render")
    return (
      <Segment inverted  color='violet'  >
        <Segment inverted  color='violet'  >
            {this.state.publication.map(aPublication =>
                        <Grid.Row key={aPublication.id} > 
                          <Item.Group>
                          <Item>
                            {/* {<Item.Image size='tiny' src='../image/icono.png' />} */}
                      
                            <Item.Content>
                            
                              <Item.Header as='a' onClick={()=>this.props.changeStateToComentaryHandler(aPublication.id)}> 
                              <p className="" >{aPublication.title}</p>
                              </Item.Header>
                              <Item.Meta>
                                <p className=""> Creado por {' '} <a>{aPublication.whoPublishedIt}</a>{' '}</p>
                              </Item.Meta>
                              <Item.Description>
                                <p className="">{aPublication.text } </p>
                              </Item.Description>

                              <Item.Extra>
                                
                                <div className="">{Date(aPublication.date)}</div>
                              </Item.Extra>
                          
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Grid.Row>
            )}
          

        </Segment>
        <Form reply inverted>
              <h2 className=""> New Publication </h2>
              <h3 className=""> Title </h3>
              <Form.TextArea onInput={(e, { value }) =>this.registryTitle(value)}/>
              <h3 className=""> Text </h3>
              <Form.TextArea onInput={(e, { value }) =>this.registryReply(value)}/>
              
                <Button content='Confirm' labelPosition='left' icon='edit' color= 'black' onClick ={ ()=> this.postPublication() } />
        </Form>
      </Segment>
    )
  }

}
