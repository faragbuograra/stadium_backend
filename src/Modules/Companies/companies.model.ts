
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'
import { User } from '../Users/user.model'

export default class Companies extends TimestampedModel {

    // Table name
    static tableName = 'companies'
    static defaultSort = 'name'

    // Table columns
    id!: number
    name!: string | null
    status!:boolean | string

    static jsonSchema = {
        type: 'object',
        required: [ 'name' ],
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
    
    // One-to-many relation with Subcategory model
    static relationMappings = {
    
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'companies.user_id',
                to: 'user.id' 
            },
            filter: (qb: QueryBuilderType<User>) => qb.select('user.name')
        },
       
       


    
    }
       
       
    

        
         

        
}

