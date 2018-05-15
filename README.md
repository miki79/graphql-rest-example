# Example GraphQL vs REST

This is a simple example of exposing information via GraphQL and REST.
GraphQL is implemented via the graphQL server (running on Lambda) and via AppSync.

## Setup

run `npm i` to install all the dependency
This application consumes 3 sets of API:

1.  [ip-api.com]() to fetch the coordinates from the IP
2.  [YQL weather](https://developer.yahoo.com/yql/)
3.  [Yelp API](https://www.yelp.com/developers/documentation/v3)

You need to have a [Yelp API key](https://www.yelp.com/developers/documentation/v3/authentication) and set it as environment variable "YELP_KEY" before you can launch the application

```
export YELP_KEY=[your key here]
```

## Local test

To run the application locally run `sls offline start` and then access to the url http://localhost:3000/graphiql or access to the 3 rest api:

* http://localhost:3000/coordinates
* http://localhost:3000/weather/{lat}/{lon}
* http://localhost:3000/business/{lat}/{lon}

## To deploy in AWS

Run the command `sls deploy` and the application will be deployed to your AWS account.
After the deploy is completed you can access to the endpoints via ApiGateway or [AppSync](https://eu-west-1.console.aws.amazon.com/appsync/home)

## To remove from AWS

Just run the command `sls remove`

### Note

At the moment, the graphiql in lambda works only when you deploy the application in dev stage. If you want to modify the environment, you need to change the endpoint in ./src/graphql.js
