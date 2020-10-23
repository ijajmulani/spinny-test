import React from 'react';
import ListItem from '../ListItem/ListItem';

export default class Lists extends React.Component {
  render() {
    if (this.props.loading) {
      return (
        <div>Fetching data</div>
      );
    }

    if (this.props.data && this.props.data.length > 0) {
      return (
        this.props.data.map((item) => (
          <ListItem id={item.mal_id} data={item} />
        ))
      )
    } else {
        return (
          <div>No Result Found</div>
        )
    }
  }
}