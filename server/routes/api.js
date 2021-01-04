const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')
const cookieParser = require('cookie-parser')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
<<<<<<< HEAD
  password: 'FCMA77127',
=======
  password: 'root',
>>>>>>> main
  database: 'projetWeb'
 })

client.connect()

//CONNECTIONS
router.get('/me', async (req, res) => {
  if (typeof req.session.userId === 'undefined'){
    res.json(-1)
  }
  else {
    res.json(req.session.userId)
  }
  
})

router.post('/register', async(req, res) => {
  const pseudo = req.body.pseudo
  const email = req.body.email
  const password = req.body.password
  await check(pseudo, email, password)
  res.send()
})

router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const id = await login(email, password)
  if (!(id === -1)){
    if (typeof req.session.userId === 'undefined'){
      req.session.userId = id
    }
  }
  else {
    res.status(401).json({ message: "Wrong"})
  }
  
  res.json(id)
})

<<<<<<< HEAD
async function add (email, password) {
  const sql = "INSERT INTO users (email, passwords) VALUES ($1, $2)"
=======
async function add (pseudo, email, password) {
  const sql = "INSERT INTO users (pseudo, email, passwords) VALUES ($1, $2, $3)"
>>>>>>> main
  const hash = await bcrypt.hash(password, 10)
  await client.query({
    text: sql,
    values: [pseudo, email, hash] // ici name et description ne sont pas concaténées à notre requête
  })
}

async function check (pseudo, email, password) {
  const sql = "SELECT * FROM users WHERE email=$1"
  const r = await client.query({
    text: sql,
    values: [email] // ici name et description ne sont pas concaténées à notre requête
  })
  if (r.rowCount === 0){
    add(pseudo, email, password)
  }
  else {
  }
}

async function login (email, password) {
  const sql = "SELECT * FROM users WHERE email=$1"
  const r = await client.query({
    text: sql,
    values: [email] // ici name et description ne sont pas concaténées à notre requête
  })
  if (r.rows[0]){
    if (await bcrypt.compare(password, r.rows[0]['passwords'])){
        return r.rows[0]['iduser']
    }
  }
  return -1
}

//FILMS
router.get('/films', async(req, res) => {
  r = await getFilms()
  return res.json(r.rows)
})

async function getFilms() {
  const sql = "SELECT * FROM film ORDER BY titre"
  const r = await client.query({
    text: sql,
  })
  return r;
}

router.post('/film', async(req, res) => {
  const titre = req.body.titre
  const date = req.body.date
  const genre = req.body.genre
  const synopsis = req.body.synopsis
  const image = req.body.image
  r = await addFilm(titre,date,genre,synopsis,image)
  return res.json(r.rows)
})

async function addFilm(titre,date,genre,synopsis,image) {
  const sql = "INSERT INTO film (titre,année,genre,synopsis,image) VALUES ($1,$2,$3,$4,$5)"
  const r = await client.query({
    text: sql,
    values: [titre,date,genre,synopsis,image]
  })
  return r;
}

router.delete('/film:filmId', async(req, res) => {
  const idFilm = parseInt(req.params.filmId)
  r = await deleteFilm(idFilm)
  return res.json(r)
})

async function deleteFilm(idFilm) {
  const sql = "DELETE FROM avis WHERE idfilm = $1;"
  const r = await client.query({
    text: sql,
    values: [idFilm]
  })
  const sql1 = "DELETE FROM film WHERE idfilm = $1;"
  const r1 = await client.query({
    text: sql1,
    values: [idFilm]
  })
  return r1;
}

//COMMENTARIES
router.get('/commentaries', async(req, res) => {
  r = await getCommentaries()
  return res.json(r.rows)
})

async function getCommentaries() {
<<<<<<< HEAD
  const sql = "SELECT idavis, iduser, pseudo,  commentaires, titre, image FROM avis A inner join users U on (A.iduser = U.iduser) inner join film F on (F.idfilm = A.idfilm) ORDER BY titre"
=======
  const sql = "SELECT idavis, U.idUser, email,  commentaires, F.idfilm, titre, image FROM avis A inner join users U on (A.iduser = U.iduser) inner join film F on (F.idfilm = A.idfilm) ORDER BY titre"
>>>>>>> main
  const r = await client.query({
    text: sql,
  })
  return r;
}

router.post('/commentary', async(req, res) => {
  const userId = req.session.userId
  const idFilm = req.body.idFilm
  const Commentary = req.body.Commentary
  r = await addCommentary(userId, idFilm, Commentary)
  return res.json(r.rows)
})

async function addCommentary(userId, idFilm, Commentary) {
  const sql = "INSERT INTO avis (idfilm, iduser, commentaires) VALUES ($1,$2,$3)"
  const r = await client.query({
    text: sql,
    values: [idFilm, userId, Commentary]
  })
  return r;
}

router.delete('/commentary:commentaryId', async(req, res) => {
  const idCommentary = parseInt(req.params.commentaryId)
  r = await deleteCommentary(idCommentary)
  return res.json(r)
})

async function deleteCommentary(idCommentary) {
  const sql = "DELETE FROM avis WHERE idavis = $1;"
  const r = await client.query({
    text: sql,
    values: [idCommentary]
  })
  return r;
}

module.exports = router
