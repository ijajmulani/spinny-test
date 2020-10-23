import React from 'react';
import './App.css';
import Header from '../Header/Header';
import List from '../Lists/Lists';
import AnimeCommunication from '../../communications/anime_communication';

class App extends React.Component {
  animeCommunication;
  limit = 20;
  pageNumber = 1;
  searchQuery = "";

  constructor(props) {
    super(props);
    this.animeCommunication = new AnimeCommunication();
    this.state = {
      results: [], 
      loading : false,
      isEnd: false,
    };
  }

  onSearchEvent = (query) => {
    this.pageNumber = 1;
    this.searchQuery = query.trim();
    this.setState({
      loading: true,
      results: [],
    });
    this.fetchData(this.searchQuery);
  } 

  onLoadMoreEvent = () => {
    this.setState({
      loading: true,
    });
    this.pageNumber++;
    this.fetchData(this.searchQuery);
  }

  fetchData = (query) => {
    this.animeCommunication.getDataByQuery(query, this.pageNumber, this.limit).then((resp) => {
      const data = resp.results || [];
      this.setState((state) => ({
        results: state.results.concat(data),
        loading: false,
        isEnd: resp.last_page === this.pageNumber,
      }));
    }).catch(error => {
      this.setState({
        results: [],
        loading: false,
        isEnd: false,
      });
    });
  }

  render() {
    const {loading, results, isEnd}  = this.state;
    return (
      <React.Fragment>
        <Header onSearchEvent={this.onSearchEvent} />
        <div className='container'>
          <List data={results} loading={loading} isEnd={isEnd} onLoadMoreEvent={this.onLoadMoreEvent} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
