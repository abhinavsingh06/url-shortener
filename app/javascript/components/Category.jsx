import React, { Component } from 'react';
import Header from '../components/Header';
import CategoryEditForm from './CategoryEditForm';
import Errors from './shared/Errors';

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      formData: {
        name: '',
        color: '#ffffff',
      },
      showComponentId: -1,
      message: null,
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  displayErrors() {
    const { errors } = this.state;

    return (
      <div className="row justify-content-center">
        {errors.length !== 0 ? (
          <div className="mt-4">
            <Errors errors={errors} message="danger" />
          </div>
        ) : null}
      </div>
    );
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/categories/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify(this.state.formData),
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          throw new Error(res.errors[0]);
        } else {
          this.setState({
            categories: [...this.state.categories, res.category],
            formData: { name: '', color: '' },
            message: res.notice,
          });
          setTimeout(() => this.setState({ message: null }), 5000);
        }
      })
      .catch(error => {
        this.setState({ errors: [error.message] });
        setTimeout(() => this.setState({ errors: [] }), 5000);
      });
  }

  onClick(id) {
    this.setState({ showComponentId: id });
  }

  onDelete(name) {
    const url = `/api/v1/categories/${name}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify(this.state.categories),
    })
      .then(res => res.json())
      .then(res =>
        // this.setState( { categories: [res.categories] } )
        console.log(...this.state.categories)
      );
  }

  componentDidMount() {
    const url = '/api/v1/categories';
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => this.setState({ categories: response.categories }))
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { categories, showComponentId } = this.state;
    return (
      <>
        <Header />
        <div className="container">
          {this.displayErrors()}
          {this.state.message ? (
            <div className="alert alert-success">{this.state.message}</div>
          ) : null}
          <div className="d-flex justify-content-center m-3">
            {showComponentId !== -1 ? (
              <CategoryEditForm {...this.state} />
            ) : (
              <form onSubmit={this.onSubmit}>
                <div className="form-row align-items-center">
                  <div className="col-auto">
                    <input
                      type="text"
                      name="name"
                      className="form-control mb-2"
                      id="inlineFormInput"
                      value={this.state.formData.name}
                      onChange={this.handleChange}
                      placeholder="Enter category"></input>
                  </div>
                  <div className="col-auto">
                    <input
                      name="color"
                      type="color"
                      value={this.state.formData.color}
                      onChange={this.handleChange}></input>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-2">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="w-60 p-3">
            {categories && (
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Category name</th>
                    <th scope="col">Edit category</th>
                    <th scope="col">Delete category</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td>
                        <span style={{ color: category.color }}>
                          <a> {category.name}</a>
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => this.onClick(category.id)}>
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.onDelete(category.name)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Category;
