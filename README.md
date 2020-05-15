# URL Shortener API

A Ruby on Rails api to shorten the given URL. The shortened url should end with 8 letters code. Something like [https://short.is/U89K34lQ](https://short.is/U89K34lQ) .

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
