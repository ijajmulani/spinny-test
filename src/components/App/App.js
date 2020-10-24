import React from 'react';
import './App.css';
import Header from '../Header/Header';
import List from '../Lists/Lists';
import AnimeCommunication from '../../communications/anime_communication';

class App extends React.Component {
  animeCommunication;
  limit = 20;
  pageNumber = 1;

  constructor(props) {
    super(props);
    this.animeCommunication = new AnimeCommunication();
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("query");

    this.state = {
      results: [], 
      loading : false,
      isEnd: false,
      searchQuery: query.trim(),
    };
  }

  componentDidMount() {
    if (this.state.searchQuery) {
      this.onSearchEvent(this.state.searchQuery);
    }
  }

  onSearchEvent = (query) => {
    this.pageNumber = 1;
    const searchQuery = query.trim();
    if (searchQuery.length < 3) {
      alert("Error: Requires atleast 3 or more characters");
      return
    }

    this.setState({
      loading: true,
      results: [],
      searchQuery: searchQuery,
    });
    this.fetchData(searchQuery);
  } 

  onLoadMoreEvent = () => {
    this.setState({
      loading: true,
    });
    this.pageNumber++;
    this.fetchData(this.state.searchQuery);
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
    const {loading, results, isEnd, searchQuery}  = this.state;
    return (
      <React.Fragment>
        <Header onSearchEvent={this.onSearchEvent} searchQuery={searchQuery} />
        <div className='container'>
          <List data={results} loading={loading} isEnd={isEnd} onLoadMoreEvent={this.onLoadMoreEvent} displayNotFound={this.state.searchQuery !== ""} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
