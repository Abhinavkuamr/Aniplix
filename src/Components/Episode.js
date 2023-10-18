import React, { Component } from 'react'
import axios from 'axios'

export default class Episode extends Component {

    state ={
        ep_link: '',
        ep_id : '',
    }

    componentDidMount(){

    const episodelist = this.props.episodeList
    console.log("episodecmpo", episodelist)

    //get call to all episode steaming URLS
    //create object, episode number -> streaming URL
    // join them 
    //create buttons
    const ep_id = episodelist.id
    const lastNumber = ep_id.split('-').slice(-1)[0];
    //this.setState({ep_link: episodelist.url,ep_id: episodelist.number})
    //console.log(ep_id)
    const URL = `http://localhost:3001/api/eplink?id=${ep_id}`
    axios.get(URL).then((response) => {

        const ep_link = response.data.sources[3].url ? response.data.sources[3].url : response.data.sources[1].url
       // console.log(response.data)
        //console.log(ep_link)
        this.setState({ep_link,ep_id: lastNumber})


        
    }).catch(err => {
        console.error(err)
    })



    }

    handleClick = () => {
        // Call the onClick function passed from the parent with the episode stream link that is associated with the button
        const { ep_link } = this.state; // Access ep_link from the component's state
        this.props.onClick(ep_link);
      };



  render() {

    const { ep_link , ep_id} = this.state;
   // console.log("episode", ep_link)

    
    return (
        <div>
        <div>
            <button className="episode-button" onClick={this.handleClick}>Ep.{ep_id}</button>
          
        </div>
      </div>
    )
  }
}
