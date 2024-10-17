
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'
import Department from '../Department/department.model'

export default class Management extends TimestampedModel {

    // Table name
    static tableName = 'management'
    static defaultSort = 'name'

    // Table columns
    id!: number
    name!: string 
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
    
        Departments: {
            relation: Model.HasManyRelation,
            modelClass: Department,
            join: {
                from: 'management.id',
                to: 'department.management_id'
            },
            filter: (qb: QueryBuilderType<Department>) => qb.select('department.id','department.name')
        },
       
       


    
    }
       
       
    

        
         

        
}

