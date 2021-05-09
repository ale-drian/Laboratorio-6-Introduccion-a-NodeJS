import express from 'express'
import { getPhonebook } from '../components/personas/controller'
import MongoDB from '../lib/mongo'
import persons from '../utils/mockup'

const router = express.Router()
const mongo = new MongoDB()

router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Vista info
router.get('/info', (request, response) => {
  const fecha = new Date()
  response.send(`<div>
                        <p>Phonebook has info for ${persons.length} people</p>
                        <p>${fecha}</p>
                    </div>`)
})

// Obtener la lista de personas
router.get('/api/persons', getPhonebook)

// Obtener un solo elemento de la lista de personas
router.get('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  const person = await mongo.get('personas', id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end(`<h1>Error 404 Not Found</h1>
                                <p>ID undefinided</p>`)
  }
})

// Eliminar un elemento
router.delete('/api/persons/:id', async (request, response) => {
  const id = request.params.id
  await mongo.delete('personas', id)
  response.status(204).end()
})

// Insertar elemento
router.post('/api/persons', async (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'Missing name or number'
    })
  } else {
    const noUniqueName = persons.find(person => person.name === request.body.name)
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

export default router
