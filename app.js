/* Importaciones */
const express = require('express');
const { spawn } = require('child_process');
const { ApolloServer } = require('apollo-server-express')
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { characterTypeDefs } = require('./typeDefs/characterTypeDefs')
const { locationTypeDefs } = require('./typeDefs/locationTypeDefs')
const { episodeTypeDefs } = require('./typeDefs/episodeTypeDefs')
const { resolvers } = require('./resolvers')
const { connectDB } = require('./db')

const app = express();
connectDB();

/* Respuesta que mandara el servidor al entrar a la ruta raiz del servidor */
app.get('/', (req, res) => res.send('API backend RickNMorty'));

app.get('/seed', (req, res) => {
  const child = spawn('node', ['./seed.js'], {stdio: 'inherit'});

  child.on('exit', (code) => {
    console.log(`Seed script exited with code ${code}`);
    res.send(`Seed script exited with code ${code}`);
  });
});

app.get('/drop', (req, res) => {
  const drop = spawn('node', ['./drop.js']);

  drop.on('exit', (code) => {
    console.log(`Drop script exited with code ${code}`);
    res.send(`Drop script exited with code ${code}`);
  });
});
module.exports = app

/* Al llamar o ejecutar el servidor esta funcion sera la primera que se ejecute */
async function start() {

  const typeDefs = mergeTypeDefs([
    characterTypeDefs,
    locationTypeDefs,
    episodeTypeDefs
  ]);

  /* Debemos importar typeDefs y resolvers */
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  /* Inicializamos el servidor de apollo server */
  await apolloServer.start()

  /* Tomamos un objeto para enviar el servidor 'express' */
  apolloServer.applyMiddleware({ app })

  app.use('*', (req, res) => res.status(404).send('NOT FOUND'))

  app.listen(3000, () => {
    console.log('Server on port', 3000);
  });
}

start();