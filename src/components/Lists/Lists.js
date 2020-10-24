import React from 'react';
import ListItem from '../ListItem/ListItem';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import './Lists.css';


export default class Lists extends React.Component {
  
  onLoadMoreClick = (e) => {
    this.props.onLoadMoreEvent();
  }

  render() {
    const {loading, data, isEnd, displayNotFound} = this.props;
    return (
      <React.Fragment>
        {data && data.length ? (
          <div>
            <div className='card-container'>
              {data.map((item) => (
                <ListItem key={item.mal_id} data={item} />
              ))}
            </div>
            {isEnd || loading ? null : (<button className="load-more-btn" onClick={this.onLoadMoreClick}>Load More</button>) }
          </div>

        )  : null}
        {loading ? <Loader /> : null}
        {data && data.length === 0 && displayNotFound && !loading ? <NotFound /> : null}
      </React.Fragment>
    );



  }
}