const express = require('express')
const app = express()

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const fecha = new Date();
    return response.send(`<div>
                            <p>Phonebook has info for ${persons.length} people</p>
                            <p>${fecha}</p>
                        </div>`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})