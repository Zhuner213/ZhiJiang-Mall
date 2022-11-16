import config from './config'
import resource, { axios } from 'api-configer'

export default resource(config)
export { axios }