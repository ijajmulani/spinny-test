import React from 'react';

export default class ListItem extends React.Component {
  render() {
    const {title, url, image_url} = this.props.data;
    return (
      <a href={url} class="card">
        <div class="card__image">
          <img loading="lazy" src={image_url} alt={title} />
        </div>
        <div class="card__name">
          <span>{title}</span> 
        </div>
      </a>
    );
  }
}