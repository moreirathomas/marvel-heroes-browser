import React from 'react';
import { fetchApiByName } from '../hooks/fetchApi';

class Browser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: {},
      loading: false,
      total: 0,
    };
  }

  handleSearch = (event) => {
    const input = event.target.value;

    if (!input) {
      this.setState({ search: input, data: {}, total: 0 });
    } else {
      this.setState({ search: input, loading: true }, () => {
        fetchApiByName(input).then((res) => {
          this.setState({
            data: res[0].data,
            loading: res[1],
            total: res[0].data.results.length,
          });
        });
      });
    }
  };

  renderResults = () => {
    const { data } = this.state;
    const { total } = this.state;
    const { search } = this.state;

    if (search !== '' && total > 0) {
      return (
        <div className="result-container">
          {data.results.map((result) => (
            <div className="charater" key={result.id}>
              {result.name}
              {result.id}
            </div>
          ))}
        </div>
      );
    }
  };

  render() {
    const { search } = this.state;
    const { loading } = this.state;

    return (
      <div className="container">
        {/* header */}
        <h1 className="header">Marvel Heroes Browser</h1>
        {/* input */}
        <label className="search-label" htmlFor="search-input">
          <input
            className=""
            type="text"
            value={search}
            id="search-input"
            placeholder="Search for Heroes..."
            onChange={this.handleSearch}
          ></input>
          {/* <i className="fas fa-search"></i> */}
        </label>
        {/* results grid */}
        {!loading ? this.renderResults() : <div>Loading</div>}
      </div>
    );
  }
}

export default Browser;
