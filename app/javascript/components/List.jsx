import React, { useState, useEffect } from 'react';

import Header from './Header';
import Pin from './Pin';

export default function List(props) {
  const [urls, setUrls] = useState(props.urls);
  console.log(props.urls);

  useEffect(() =>
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(res => console.log(res))
  );

  return (
    <>
      <div className="container">
        <Header />
        <div className="table_container">
          <table class="table table-dark">
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
                  <th scope="row">
                    <Pin />
                  </th>
                  <td>{original}</td>
                  <td>https://short.is/{short}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
