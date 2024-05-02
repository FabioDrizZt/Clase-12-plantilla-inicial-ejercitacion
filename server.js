// server.mjs
import { createServer } from 'node:http'
import fs from 'node:fs'
//cargamos el archivo de frutas
const frutasJSON = fs.readFileSync('./json/frutas.json', 'utf8')

const server = createServer((req, res) => {
  /*   res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(frutasData) */
  /*   const url = new URL(req.url, `http://${req.headers.host}`)
  const path = url.pathname */
  const path = req.url
  if (req.method === 'GET') {
    if (path === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end('<h1>Bienvenido a la API de frutas</h1>')
    } else if (path === '/frutas/all') {
      //devolver todo el listado de frutas
    } else if (path.startsWith('/frutas/id/')) {
      //devolver una fruta por su ID usar FIND
      const id = path.split('/').pop()
      //buscar en el array el elemento con id=id
      const fruta = { id: 6, imagen: '🍅' }
      if (fruta) {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(fruta)
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('404 Fruta no found')
      }
    } else if (path.startsWith('/frutas/name/')) {
      //devolver frutas por nombre (busqueda parcial o completa) no case sensitive // usar FILTER tolowercase includes
    } else if (path.startsWith('/frutas/existe/')) {
      //devolver si existe o no la fruta // some toLocalecompare o toLowercase
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Error 404 - Metodo inexistente')
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Error 404 - Metodo inexistente')
  }
})

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000')
})
