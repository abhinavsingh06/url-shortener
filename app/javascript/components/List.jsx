import React, { Component } from 'react';
import Header from './Header';
import Pin from './Pin';
import Loader from './Loader';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      categories: [],
      isLoading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCount = this.handleCount.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleClick(id, index) {
    this.setState({
      urls: this.state.urls.map((url, id) =>
        id === index ? { ...url, pinned: !url.pinned } : url
      ),
    });
    const url = `/api/v1/urls/${id}`;
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

  handleCount(short) {
    const url = `/api/v1/urls/${short}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
    })
      .then(res => res.json())
      .then(res => window.open(res.original));
  }

  onChange(event) {
    const url = `/api/v1/urls/${event.target.attributes[1].value}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        url: { category_id: event.target.value },
      }),
    })
      .then(res => res.json())
      .then(res =>
        this.setState({ urls: res.urls, categories: res.categories })
      );
  }

  componentDidMount() {
    this.setState({ isLoading: true });
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
          categories: response.categories,
          isLoading: false,
        })
      )
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { urls, isLoading, categories } = this.state;
    return (
      <>
        <div>
          <Header />
          {isLoading ? (
            <Loader className="loader" />
          ) : (
            <div className="table_container w-60 p-3">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Pin</th>
                    <th scope="col">Original URL</th>
                    <th scope="col">Short URL</th>
                    <th scope="col">Count</th>
                    <th scope="col">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map(
                    (
                      { original, id, short, pinned, category_id, count },
                      index
                    ) => (
                      <tr key={id}>
                        <th
                          className={
                            pinned ? 'p-3 mb-2 bg-success text-white"' : ''
                          }
                          scope="row"
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.handleClick(id, index)}>
                          <Pin />
                        </th>
                        <td>
                          <a href={original} target="_blank">
                            {original}
                          </a>
                        </td>
                        <td onClick={() => this.handleCount(short)}>
                          <a
                            target="_blank"
                            style={{ cursor: 'pointer' }}
                            className="text-primary">
                            {process.env.ROOT_URL}
                            {short}
                          </a>
                        </td>
                        <td>{count}</td>
                        <td>
                          <div>
                            <select
                              name="category_id"
                              value={category_id ? category_id : '000'}
                              data-url-id={id}
                              onChange={this.onChange}>
                              <option value="000" disabled="disabled">
                                Select category
                              </option>
                              {categories.map(({ name, color, id }) => (
                                <option
                                  key={id}
                                  value={id}
                                  style={{ background: color }}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
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
