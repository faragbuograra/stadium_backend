import 'dotenv/config'
import {app}         from './app'
import {SERVER_PORT} from './config'
import { DOMAIN} from './config'
import {Model}       from 'objection'
import {knex}        from '../knexfile'

const start = async () => {
    Model.knex(knex)
    app.listen(SERVER_PORT, () => console.log(`Server listening at ${DOMAIN}`))
}

// Running the App
start().catch(err => console.log(err))
