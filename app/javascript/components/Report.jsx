import React, { Component } from 'react';
import Header from './Header';

export class Report extends Component {
  constructor() {
    super();
    this.state = { urls: [] };
  }

  componentDidMount() {
    const url = '/api/v1/urls';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response =>
        this.setState({
          urls: response.urls,
        })
      )
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { urls } = this.state;
    console.log(urls);
    return (
      <>
        <div>
          <div className="mb-3">
            <Header />
          </div>
          <div className="container">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Cras justo odio
                <span class="badge badge-primary badge-pill">14</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Report;
