import React from 'react';
import { fetchApiByName } from '../hooks/fetchApi';
import { Link } from 'react-router-dom';

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
        <div className="results-container">
          {data.results.map((result) => (
            <div className="character-preview" key={result.id}>
              <Link to={'/character/' + result.id}>
                <h3 className="character-name">{result.name}</h3>
              </Link>
              <p className="character-id-num">Id Num: {result.id}</p>
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
      <div className="browser">
        {/* input */}
        <div className="search-container">
          <input
            autoComplete="off"
            className="search-field"
            type="text"
            value={search}
            placeholder="Search"
            onChange={this.handleSearch}
          ></input>
        </div>
        {/* <i className="fas fa-search"></i> */}
        {/* results grid */}
        {!loading ? this.renderResults() : <div>Loading</div>}
      </div>
    );
  }
}

export default Browser;
