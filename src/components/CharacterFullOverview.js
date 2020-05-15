import React from 'react';
import { fetchApiById } from '../hooks/fetchApi';

class FullOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: false,
    };
  }

  componentDidMount() {
    fetchApiById().then((res) => {
      this.setState({ data: res[0].data, loading: res[1] });
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="full-overview">
        <h2></h2>
        <p></p>
      </div>
    );
  }
}

export default FullOverview;
