const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const cookieParser = require('cookie-parser')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'monMotdePasse',
  database: 'TP5'
 })

client.connect()

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

router.get('/me', async (req, res) => {
  if (typeof req.session.userId === 'undefined'){
    res.json(-1)
  }
  else {
    res.json(req.session.userId)
  }
  
})

router.post('/register', async(req, res) => {
  const email = req.body.email
  const password = req.body.password
  await check(email, password)
  res.send()
})

router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const id = await login(email, password)
  if (!(id === -1)){
    if (typeof req.session.userId === 'undefined'){
      console.log("creating session")
      req.session.userId = id
    }
  }
  else {
    res.status(401).json({ message: "Wrong"})
  }
  
  res.json(id)
})

async function add (email, password) {
  const sql = "INSERT INTO users (email, password) VALUES ($1, $2)"
  const hash = await bcrypt.hash(password, 10)
  await client.query({
    text: sql,
    values: [email, hash] // ici name et description ne sont pas concaténées à notre requête
  })
}

async function check (email, password) {
  const sql = "SELECT * FROM users WHERE email=$1"
  const r = await client.query({
    text: sql,
    values: [email] // ici name et description ne sont pas concaténées à notre requête
  })
  if (r.rowCount === 0){
    console.log("doesn t exist")
    add(email, password)
  }
  else {
    console.log("exists")
  }
}

async function login (email, password) {
  const sql = "SELECT * FROM users WHERE email=$1"
  const r = await client.query({
    text: sql,
    values: [email] // ici name et description ne sont pas concaténées à notre requête
  })
  if (r.rows[0]){
    if (await bcrypt.compare(password, r.rows[0]['password'])){
      console.log("match")
        return r.rows[0]['id']
    }
  }
  return -1
}


router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

router.get('/panier', (req, res) => {
  res.json(req.session.panier)
})

router.post('/panier', (req, res) => {
  console.log('req.body', req.body)
  const articleId = parseInt(req.body.articleId)
  const quantity = parseInt(req.body.quantity)

  if (isNaN(quantity) || quantity <= 0) {
    res.status(400).json({ message: "You cannot add a quantity of 0 in your cart"})
    return
  }

  const article = articles.find(article => article.id === articleId)

  if(!article) {
    res.status(404).json({ message: "The article does not exist"})
    return
  }

  const articleInPanier = req.session.panier.articles.find(article => article.id === articleId)

  if (articleInPanier) {
    res.status(400).json({ message: "The article is already in your cart"})
    return
  }

  const newArticle = {
    id: articleId,
    quantity
  }

  req.session.panier.articles.push(newArticle)

  res.send(newArticle)
})

router.put('/panier/:articleId', (req, res) => {
  const articleId = parseInt(req.params.articleId)
  const quantity = parseInt(req.body.quantity)

  if (isNaN(quantity) || quantity <= 0) {
    res.status(400).json({ message: "You cannot add a quantity of 0 in your cart"})
    return
  }

  const articleInPanier = req.session.panier.articles.find(article => article.id === articleId)

  if (!articleInPanier) {
    res.status(400).json({ message: "The article is not currently in your cart"})
    return
  }

  articleInPanier.quantity = quantity
  res.send()
})

router.delete('/panier/:articleId', (req, res) => {
  const articleId = parseInt(req.params.articleId)

  const articleInPanier = req.session.panier.articles.findIndex(article => article.id === articleId)

  if (articleInPanier === -1) {
    res.status(400).json({ message: "The article is not currently in your cart"})
    return
  }

  req.session.panier.articles.splice(articleInPanier, 1)
  res.send()
})

router.get('/articles', (req, res) => {
  res.json(articles)
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const article = {
    id: articles.length + 1,
    name: name,
    description: description,
    image: image,
    price: price
  }
  articles.push(article)
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

module.exports = router
