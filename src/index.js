import express from 'express'
import persons from './utils/mockup'
import MongoDB from './lib/mongo'

const mongo = new MongoDB()

const app = express()

app.use(express.json())

const PORT = process.env.PORT

// midleware
app.use((request, response, next) => {
  console.log('Estoy en el primer midelware')
  next()
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Obtener la lista de personas
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Vista info
app.get('/info', (request, response) => {
  const fecha = new Date()
  response.send(`<div>
                        <p>Phonebook has info for ${persons.length} people</p>
                        <p>${fecha}</p>
                    </div>`)
})

// Obtener un solo elemento de la lista de personas
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id.toString() === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end(`<h1>Error 404 Not Found</h1>
                                <p>ID undefinided</p>`)
  }
})

// Eliminar un elemento
app.delete('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

// Insertar elemento
app.post('/api/persons', async (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'Missing name or number'
    })
  } else {
    const noUniqueName = persons.find(person => person.name == request.body.name)
    if (noUniqueName) {
      return response.status(422).json({
        error: 'Unprocessable Entity - Unique name violation'
      })
    } else {
      const person = {
        name: request.body.name,
        number: request.body.number
      }
      await mongo.create('personas', person)
      response.status(201).json(person)
    }
  }
})

// midleware
app.use((request, response, next) => {
  console.log('Pagina de error')
  response.status(404).send('<h2>Pagina de errores</h2>')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
