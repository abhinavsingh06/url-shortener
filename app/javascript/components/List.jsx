import React, { Component } from 'react';
import Header from './Header';
import Pin from './Pin';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const url = `/api/v1/urls/${short}`;
    console.log(url);
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({ urls: { pinned: true } }),
    })
      .then(res => res.json())
      .then(res => this.setState(res.urls));
  }

  componentDidMount() {
    const url = '/api/v1/urls/index';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ urls: response }))
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { urls, pinned } = this.state;
    return (
      <>
        <div className="container">
          <Header />
          <div className="table_container">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Pin</th>
                  <th scope="col">Original URL</th>
                  <th scope="col">Short URL</th>
                </tr>
              </thead>
              <tbody>
                {urls.map(({ original, id, short, pinned }) => (
                  <tr key={id}>
                    <th
                      scope="row"
                      style={{ cursor: 'pointer' }}
                      onClick={this.handleClick}>
                      <Pin />
                    </th>
                    <td>{original}</td>
                    <td>https://short.is/{short}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>{' '}
      </>
    );
  }
}

export default List;
