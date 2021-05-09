
/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonRepository')} obj.PersonRepository
 */
export default ({ PersonRepository }) => {
  return async () => {
    return PersonRepository.getAll()
  }
}
