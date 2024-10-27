
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'
import { User } from '../Users/user.model'
import Stadium from '../stadium/stadium.model'

export default class Match extends TimestampedModel {

    // Table name
    static tableName = 'match'
    static defaultSort = 'name'

    // Table columns
    id!: number
    name!: string | null
    status!:boolean | string

    static jsonSchema = {
        type: 'object',
   
      
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
                from: 'match.user_id',
                to: 'user.id' 
            },
            filter: (qb: QueryBuilderType<User>) => qb.select('user.name')
        },
        stadium: {
            relation: Model.HasOneRelation,
            modelClass: Stadium,
            join: {
                from: 'match.stadium_id',
                to: 'stadium.id' 
            },
            filter: (qb: QueryBuilderType<Stadium>) => qb.select('stadium.name')
        },
       
       
       


    
    }
       
       
    

        
         

        
}

