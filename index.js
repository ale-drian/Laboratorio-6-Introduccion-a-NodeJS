const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3001;

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-1234"
    },
    {
        id: 2,
        name: "Mary Hellas",
        number: "51-1234"
    },
    {
        id: 3,
        name: "Nora Jules",
        number: "040-6547"
    },
    {
        id: 4,
        name: "Juan Males",
        number: "041-2020"
    },
    {
        id: 5,
        name: "Lola Ruiz",
        number: "123-1234"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//Obtener la lista de personas
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//Vista info
app.get('/info', (request, response) => {
    const fecha = new Date();
    response.send(`<div>
                        <p>Phonebook has info for ${persons.length} people</p>
                        <p>${fecha}</p>
                    </div>`)
})

//Obtener un solo elemento de la lista de personas
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

//Eliminar un elemento
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

//Insertar elemento
app.post('/api/persons', (request, response) => {
    if (!request.body.name || !request.body.number) {
        return response.status(400).json({ 
          error: 'Missing name or number' 
        })
    }else{
        const noUniqueName = persons.find(person => person.name==request.body.name)
        if(noUniqueName){
            return response.status(422).json({ 
                error: 'Unprocessable Entity - Unique name violation' 
              })
        }else{
            const id = Math.floor(Math.random() * 10000);
            const person = {
                id: id,
                name: request.body.name,
                number: request.body.number
            }
            persons.push(person)
            response.json(persons)
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})