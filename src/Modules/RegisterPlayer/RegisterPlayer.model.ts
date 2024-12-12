
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'
import { User } from '../Users/user.model'
import Stadium from '../stadium/stadium.model'
import { match } from 'node:assert'
import Match from '../Match/match.model'

export default class RegisterPlayer extends TimestampedModel {

    // Table name
    static tableName = 'register_player'
    static defaultSort = 'name'

    // Table columns
    id!: number
    name!: string | null
    status!:boolean | string
    user_id!: number
    stadium_id!: number
    requst_player_id!: number
    number_of_players!: any
    

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
    
        // user: {
        //     relation: Model.HasOneRelation,
        //     modelClass: User,
        //     join: {
        //         from: 'requst_player.user_id',
        //         to: 'user.id' 
        //     },
        //     filter: (qb: QueryBuilderType<User>) => qb.select('user.name')
        // },
        // match: {
        //     relation: Model.HasOneRelation,
        //     modelClass: Match,
        //     join: {
        //         from: 'requst_player.match_id',
        //         to: 'match.id' 
        //     },
        //     filter: (qb: QueryBuilderType<Match>) => qb.select('match.*')
        // },
       
       
       


    
    }
       
       
    

        
         

        
}

