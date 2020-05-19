import React, { Component } from 'react';
import Header from './Header';
import Pin from './Pin';
import Loader from './Loader';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      isLoading: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(short, index) {
    const url = `/api/v1/urls/${short}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({ url: { pinned: !this.state.urls[index].pinned } }),
    })
      .then(res => res.json())
      .then(res => this.setState({ urls: res.urls }));
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const url = '/api/v1/urls/index';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ urls: response, isLoading: false }))
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { urls, pinned, isLoading } = this.state;
    return (
      <>
        <div>
          <Header />
          {isLoading ? (
            <Loader className="loader" />
          ) : (
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
                  {urls.map(({ original, id, short, pinned }, index) => (
                    <tr key={id}>
                      <th
                        className={
                          pinned ? 'p-3 mb-2 bg-success text-white"' : ''
                        }
                        scope="row"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.handleClick(short, index)}>
                        <Pin />
                      </th>
                      <td>{original}</td>
                      <td>https://short.is/{short}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default List;
