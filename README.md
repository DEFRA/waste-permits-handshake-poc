# Waste permits handshake POC

We are currently building the next generation of a waste permits solution as a [digital service](https://www.gov.uk/service-manual/service-standard). This will allow users in the future to more easily submit applications for permits online.

Our current design is to marry a GOV.UK public web application built using [Node.js](https://nodejs.org/en/) with [Microsoft Dynamics](https://www.microsoft.com/en-gb/dynamics365/home) in the back end. In the future all permit applications will be recieved and managed in the **Dynamics** instance, and we feel it is the most suitable platform to build on for this.

Applications for permits per year are relatively very small in number, so we want to use a simple design that will be easy to maintain. This project is the first in a series of *proof of concepts* (POC) intended to validate if we can simply talk directly to the **Dynamics** app, essentially treating it as our database. As we'll be saving and reading user content at each step in the journey we need to be sure that this design is both valid and resilient, hence POC's like this.

## Initial PoC

This project focuses on authenticating with and then querying our current **Dynamics** install. Specifically we’re looking to see

- How we do this from Node.js
- How much time in total it takes
- Of the total time, how much is taken up by the authentication process, and how much on the actual query

We’ll be deploying the Node.js application to AWS, and having it talk to our Dynamics install in Azure to make the test as realistic as possible. We’re not trying to get accurate timings, but an initial indication of whether we should stop now or continue in this direction.

## Pre-requisites

This project was built against version 6.2.2 of Node.js.

## Installation

First clone the repository and then drop into your new local repo

```bash
git clone https://github.com/DEFRA/waste-permits-handshake-poc.git && cd waste-permits-handshake-poc
```

Next download and install the dependencies

```bash
npm install
```

## Configuration

The project requires a number of config values in order to tell it where the instance of **Dynamics** is, and how to authenticate with it. These are

- The API host address
- The API path
- The Dynamics domain
- Our client ID
- A username
- A password
- A token endpoint

You can set these either as environment variables, or in a `.env` file placed at the root of the project. See [.env.example](.env.example) for further details and examples.

## Execution

Simply call

```bash
npm start
```

## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

We use [Standard JS](https://github.com/DEFRA/dst-guides/blob/master/style/javascript.md), and you can check your code by calling `npm run lint` for any violations. There are currently no tests as this is just an initial proof of concept project.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
