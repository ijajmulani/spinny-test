import React from 'react';
import './Header.css'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: props.searchQuery,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({searchQuery: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchEvent(this.state.searchQuery);
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <header className="header-section">
        <form className="search-wrapper" onSubmit={this.handleSubmit}>
          <label>
            <input className="search-input"  type="text" placeholder="search for an anime, e.g Naruto" name="query" value={searchQuery} onChange={this.handleChange} />
          </label>
          <input className="search-btn" type="submit" value="Go" />
        </form>
      </header>
    );
  }
}