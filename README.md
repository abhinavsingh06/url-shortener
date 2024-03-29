# URL Shortener API

A Ruby on Rails api to shorten the given URL. The shortened url should end with 8 letters code. Something like [https://short.is/U89K34lQ](https://short.is/U89K34lQ) .

Heroku link: https://url-shortener-abhinavsingh06.herokuapp.com/

## Setup

1.  Clone the repository and run through the following command

```
$ git clone https://github.com/abhinavsingh06/url-shortener.git
```

2.  Now, open to the cloned directory in terminal

```
$ cd url-shortner
```

3.  Install yarn dependencies by running the following commands

```
$ yarn install --check-files
$ bundle i
```

4.  Setup the database

```
$ bundle exec rake db:create db:migrate db:setup
```

5.  Now we can run the rake tasks as follows

```
$ URL=https://bigbinary.com/jobs bundle exec rake app:encode
$ SHORTURL=https://short.is/tkLo2367 bundle exec rake app:decode
```

## How to test the API

### Open terminal and on the first terminalexecute following commands.

- bundle exec rake db:create db:migrate db:setup
- bundle exec rails server

### [](https://gist.github.com/neerajdotname/04cdd268df0bbda42eea58c9c22828f0#open-another-terminal-and-on-the-second-terminalexecute-following-commands)Open another terminal and on the second terminalexecute following commands.

```
URL=https://bigbinary.com/jobs bundle exec rake app:encode

```

The above rake task should print following statement in the terminal.

```
The shortened url of https://bigbinary.com/jobs is https://short.is/tkLo2367`.

```

```
SHORTURL=https://short.is/tkLo2367 bundle exec rake app:decode

```

The above task should print following statemetn in the terminal.

```
The original url of short url https://short.is/tkLo2367 is https://bigbinary.com/jobs

```

If the SHORTURL is not present in the database then print error message like shown below.

```
No original url was found for the  short url https://short.is/poliwe71
```

## Assumptions

- A user can add a URL with rake task and add it to the database.

```
URL=https://bigbinary.com/jobs bundle exec rake app:encode
```

- A list of URLs will be displayed appearing as recent addition on top.

- URLs can be pinned and unpinned.

- A user can add, read, update and delete categories.

- The categories will be reflected on the URL list.

- The URL category list can be updated.

## Implementation

- For URLs list

  - Fetch URLs at `api/v1/urls/index` endpoint and render list items.

  - List order created in descending order based on value updated_at

- For pinned items

  - Added pinned column in URLs table with boolean value type and default value as false.

  - All pinned item with value true moved to top.

  - Pinned items reamin at top and unpinned items fall back after pinned items list ends.

- For category

  - CRUD for categories

  - Update categories on URL's list

  - Update category on list.

## Endpoints

## URL

```YAML
index:
  method: "GET"
  path: "/api/v1/urls"

create:
  method: "POST"
  path: "/api/v1/urls"
  params: url: { original: "https://twitter.com" }

show:
  method: "GET"
  path: "/api/v1/urls/:short"

update:
  method: "PUT"
  path: "api/v1/urls/:short"
  params: url: { pinned: true }
```

## CATEGORY

```YAML
index:
  method: "GET"
  path: "/api/v1/categories"

create:
  method: "POST"
  path: "/api/v1/categories"

show:
  method: "GET"
  path: "/api/v1/categories/:id"

update:
  method: "PUT"
  path: "api/v1/categories/:id"
```
