import React from 'react';
import './NotFound.css';


export default class NotFound extends React.Component {
  render() {
    return (
      <div className="not-found">
        <div>No Matches Found</div>
        <span>Please try another search</span>
      </div>
    );
  }
}