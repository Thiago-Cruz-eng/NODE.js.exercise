const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => { 
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const {tittle, url, techs} = req.body;
  const repository = {id: uuid(), tittle, url, techs, likes: 0};
 
  repositories.push(repository);
 
  return res.json(repository)
});

app.put("/repositories/:id", (req, res) => {
  const {id} = req.params
  const {tittle, url, techs} = req.body;
 
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if(repositoryIndex < 0) {
   return res.status(400).json({message:'Usuario nao encontrado!'})
  }
 
  const repository = {
   id,
   tittle,
   url,
   techs,
   likes: repositories[repositoryIndex].likes
  };
 
  repositories[repositoryIndex] = repository;
 
  return res.json(repository)
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params 
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if(repositoryIndex < 0) {
   return res.status(400).json({message:'Usuario nao encontrado!'})
  }
 
  repositories.splice(repositoryIndex, 1);
 
  return res.status(204).send()
});

app.post("/repositories/:id/like", (req, res) => {
  const {id} = req.params
  const {tittle, url, techs} = req.body;
 
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if(repositoryIndex < 0) {
   return res.status(400).json({message:'Usuario nao encontrado!'})
  }

  repositories[repositoryIndex].likes++;
  return res.json(repositories[repositoryIndex])
});

module.exports = app;
