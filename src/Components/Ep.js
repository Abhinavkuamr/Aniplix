import React, { Component } from 'react'

export default class Ep extends Component {
    state ={
        ep_link: '',
        ep_id : '',
    }

    componentDidMount(){

    const episodelist = this.props.episodeList
    
        this.setState({ep_link:episodelist.url,ep_id: episodelist.number})


        
   


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
