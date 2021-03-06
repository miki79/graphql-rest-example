const server = require('graphql-server-lambda');
const schema = require('./schema/index');

module.exports.graphql = (event, context, callback) => {
  const callbackFilter = (err, output) => {
    callback(err, output);
  };
  const ip =
    event.requestContext.identity.sourceIp !== '127.0.0.1'
      ? event.requestContext.identity.sourceIp
      : '216.58.206.99';
  const handler = server.graphqlLambda({
    schema,
    context: { ip },
  });
  return handler(event, context, callbackFilter);
};

module.exports.graphiql = server.graphiqlLambda({
  endpointURL: '/dev/graphql',
});
