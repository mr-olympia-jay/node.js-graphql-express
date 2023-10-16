const express = require('express');
const app = express();

const { loadFilesSync } = require('@graphql-tools/load-files');
const loadedTypes = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const path = require('path');
const loadedResolvers = loadFilesSync(
  path.join(__dirname, '**/*.resolvers.js')
);

const { makeExecutableSchema } = require('@graphql-tools/schema');
const schema = makeExecutableSchema({
  typeDefs: loadedTypes,
  resolvers: loadedResolvers,
});

const { graphqlHTTP } = require('express-graphql');
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = 4000;
app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});
