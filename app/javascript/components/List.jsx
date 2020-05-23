import React, { Component } from 'react';
import Header from './Header';
import Pin from './Pin';
import Loader from './Loader';

export class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      category: [],
      categories: [],
      isLoading: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(short, index) {
    this.setState({
      urls: this.state.urls.map((url, id) =>
        id === index ? { ...url, pinned: !url.pinned } : url
      ),
    });
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
          category: response.category,
          categories: response.categories,
          isLoading: false,
        })
      )
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { urls, pinned, isLoading, category, categories } = this.state;
    {
      console.log(categories);
    }
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
                    <th scope="col">Category</th>
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
                      <td>
                        <div className="dropdown">
                          {category[id] ? (
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenu2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false">
                              {category[id].name}
                            </button>
                          ) : (
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownMenu2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false">
                              Select
                            </button>
                          )}
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenu2">
                            {categories.map(({ name, id, color }) => {
                              <button className="dropdown-item" type="button">
                                {name}
                              </button>;
                            })}
                          </div>
                        </div>
                      </td>
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
