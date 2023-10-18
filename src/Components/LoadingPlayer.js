import React, { Component } from 'react'
import LoadingScreen from './LoadingScreen'

export default class LoadingPlayer extends Component {
  render() {
    return (
      <div>
        <body class="container-fluid">
  <div id="header-wrapper">
  </div>

  <div class="row">
    <div class="col col-3 left">
      <div class="panel panel-left">
        <div class="panel-label"></div>
        <div className='episode'>
        
        
        <LoadingScreen />


        </div>
      </div>
    </div>

    <div class="col col-6">
      <div class="row">
        <div class="col col-12">
          <div class="panel-body body-1">
            <div class="panel-label"></div>
            <div className='toplay'>
            <div className="responsive-iframe-container">

            <iframe title="Streaming Window" src={`https://plyr.link/p/player.html#${window.btoa("coming")}`} allowfullscreen='True' width="768px" height="342px" className='frame'/>
            
           
            </div>

            </div>

          </div>
        </div>
        <div class="col col-12">
          <div class="panel-body body-2">
            <div class="panel-label"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="col col-3 right">
      <div class="panel panel-right">
        <div class="panel-label">
        <LoadingScreen />

        </div>
      </div>
    </div>

  </div>
</body>
      </div>
    )
  }
}
