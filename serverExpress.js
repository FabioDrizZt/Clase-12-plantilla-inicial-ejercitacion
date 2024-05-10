import express from 'express'
import fs from 'node:fs'

const app = express()
const frutas = JSON.parse(fs.readFileSync('./json/frutas.json', 'utf8')) // A estas frutas les podemos aplicar arrayMethods

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a la API de frutas</h1>')
})

app.get('/frutas/all', (req, res) => {
  res.json(frutas)
})

app.get('/frutas/id/:id', (req, res) => {
  const { id } = req.params
  const encontrada = frutas.find((fruta) => fruta.id == id)
  /*   if (encontrada) {
    res.json(encontrada)
  } else {
    res.status(404).send('<h1>404 Fruta no encontrada</h1>')
  } */
  // encontrada ? res.json(encontrada) : res.status(404).send('<h1>404 Fruta no encontrada</h1>')
  encontrada
    ? res.json(encontrada)
    : res.status(404).json({ error: 'Fruta no encontrada' })
})

app.get('/frutas/nombre/:nombre', (req, res) => {
  const { nombre } = req.params
  const encontradas = frutas.filter((fruta) =>
    fruta.nombre.toLowerCase().includes(nombre.toLowerCase())
  )
  encontradas.length > 0
    ? res.json(encontradas)
    : res.status(404).json({ error: 'Fruta no encontrada' })
})

app.get('/frutas/existe/:nombre', (req, res) => {
  const { nombre } = req.params
  const encontrada = frutas.some((fruta) =>
    fruta.nombre.toLowerCase().includes(nombre.toLowerCase())
  )
  encontrada
    ? res.json({ success: 'Fruta encontrada!' })
    : res.status(404).json({ error: 'Fruta no encontrada' })
})

app.use((req, res) => {
  res.status(404).send('Error 404 - Método inexistente')
})

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000')
})
