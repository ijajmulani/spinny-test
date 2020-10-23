import React from 'react';
import './ListItem.css';


export default class ListItem extends React.Component {
  render() {
    const {title, url, image_url} = this.props.data;
    return (
      <a href={url} className="card">
        <div className="thumb">
          <img loading="lazy" src={image_url} alt={title} />
        </div>
        <div className="detail-box">
          <span className="title">{title}</span> 
        </div>
      </a>
    );
  }
}