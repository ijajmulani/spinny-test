import React from 'react';
import './App.css';
import SearchForm from '../SearchForm/SearchForm';
import List from '../Lists/Lists';
import AnimeCommunication from '../../communications/anime_communication';

class App extends React.Component {
  animeCommunication;
  limit = 14;
  pageNumber = 1;
  constructor(props) {
    super(props);
    this.animeCommunication = new AnimeCommunication();
    this.state = {
      results: [], 
      loading : false,
    };
  }

  onSearchEvent = (query) => {
    this.pageNumber = 1;
    let parsedQuery = query.trim();
    this.setState({
      loading: true,
    });
    this.animeCommunication.getDataByQuery(parsedQuery, this.pageNumber, this.limit).then((resp) => {
        this.setState({
          results: resp.results,
          loading: false,
        });
      }).catch(error => {
        this.setState({
          results: [],
          loading: false,
        });
      });;
  }

  render() {
    const {loading, results}  = this.state;
    return (
      <React.Fragment>
        <SearchForm onSearchEvent={this.onSearchEvent} />
        <List data={results} loading={loading} />
      </React.Fragment>
    );
  }
}

export default App;
