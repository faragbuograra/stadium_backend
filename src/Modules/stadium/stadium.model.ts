import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'

export default class Stadium extends TimestampedModel {

    // Table name
    static tableName = 'stadium'
    static defaultSort = 'name'

    // Table columns
    id!: string
    name!: string | null
    status!:boolean | string
    dec!: string | null
    img!: string | null
    static jsonSchema = {
        type: 'object',
        required: [ 'name',
                   
            
                   
    
    ],
        properties: {
            name: { type: 'string', minLength: 1 }
        }
    }

    // Formats img and thumb fields when existing model value returns from database
   

    /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */

}

