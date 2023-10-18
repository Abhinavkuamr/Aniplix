import React, { Component } from 'react'

export default class AnimeInfo extends Component {

  render() {
    const data = this.props.anime_info
    const title = data.title
    const image = data.image
    const description = data.description

    return (
      <>
      <div class="anime-info">
        <div class="anime-title">{title}</div>
        <img class="anime-image" src={image} alt="Anime Image"/>
        <p class="anime-description">{description}</p>
    </div>
      </>
    )
  }
}
