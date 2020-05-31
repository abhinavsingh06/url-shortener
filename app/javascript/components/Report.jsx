import React, { Component } from 'react';
import Header from './Header';

export class Report extends Component {
  constructor() {
    super();
    this.state = { visits: {} };
  }

  componentDidMount() {
    const url = '/api/v1/visits';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response =>
        this.setState({
          visits: response.visits,
        })
      )
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { visits } = this.state;
    const keys = Object.keys(visits);
    const month = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];

    return (
      <>
        <div>
          <div className="mb-3">
            <Header />
          </div>
          <div className="container">
            {keys.map((index, id) => (
              <ul className="list-group" key={id}>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {month[index - 1]}
                  <span className="badge badge-primary badge-pill">
                    {visits[index].length}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Report;
