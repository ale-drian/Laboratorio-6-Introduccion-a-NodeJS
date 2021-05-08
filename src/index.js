import express from 'express'
import personRouter from './routes/persons'
const app = express()

app.use(express.json())

// midleware
app.use((request, response, next) => {
  console.log('Estoy en el primer midelware')
  next()
})

app.use('/', personRouter)

// midleware
app.use((request, response, next) => {
  console.log('Pagina de error')
  response.status(404).send('<h2>Pagina de errores</h2>')
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
