import React from 'react';
import { fetchApiByName } from '../customs/fetchApiByName';
import { Link } from 'react-router-dom';

class Browser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      data: {},
      loading: false,
      total: 0,
      message: '',
    };
  }

  handleSearch = (event) => {
    const input = event.target.value;

    if (!input) {
      this.setState({ search: input, data: {}, total: 0 });
    } else {
      this.setState(
        { search: input, loading: true, message: 'Loading' },
        () => {
          fetchApiByName(input).then((res) => {
            this.setState({
              data: res[0],
              loading: res[1],
              total: res[0].results.length,
              message: '',
            });
            if (!this.state.data.results.length) {
              this.setState({ message: 'No result' });
            }
          });
        }
      );
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
              {/* thumbnail */}
              <Link to={'/character/' + result.id}>
                <div className="thumbnail-container">
                  <img
                    className="character-thumbnail"
                    alt={result.name + ' thumabnail'}
                    src={
                      result.thumbnail.path +
                      '/standard_amazing.' +
                      result.thumbnail.extension
                    }
                  ></img>
                </div>
              </Link>
              {/* text info */}
              <Link to={'/character/' + result.id}>
                <h3 className="character-name">{result.name}</h3>
              </Link>
              <p className="character-id-num">Id Num: {result.id}</p>
            </div>
          ))}
        </div>
      );
    }
    //  else this.setState({ message: 'No result' });
  };

  render() {
    const { search } = this.state;
    const { loading } = this.state;
    const { message } = this.state;
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
        {/* results grid */}
        {!loading && message === '' ? (
          this.renderResults()
        ) : (
          <div className="message-box">{message}</div>
        )}
      </div>
    );
  }
}

export default Browser;
