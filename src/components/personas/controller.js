import MongoPersonRepository from './infraestructure/MongoPersonRepository'
import getAllPersons from './application/getAllPersons'

const PersonRepository = new MongoPersonRepository()

export const getPhonebook = async (_, res, next) => {
  try {
    const query = getAllPersons({ PersonRepository })
    const personas = await query()
    res.status(200).json({
      data: personas,
      message: 'Phonebook Lista'
    })
  } catch (e) {
    next(e)
  }
}
