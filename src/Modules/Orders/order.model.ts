
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'
import Department from '../Department/department.model'
import { User } from '../Users/user.model'
import Order_procurement from '../Order_procurement/order_procurement.model'

export default class Order extends TimestampedModel {

    // Table name
    static tableName = 'order'
    static defaultSort = 'name'

    // Table columns
    id!: number
    name!: string 
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
    
        // Departments: {
        //     relation: Model.HasManyRelation,
        //     modelClass: Department,
        //     join: {
        //         from: 'management.id',
        //         to: 'department.management_id'
        //     },
        //     filter: (qb: QueryBuilderType<Department>) => qb.select('department.id','department.name')
        // },
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'order.user_id',
                to: 'user.id' 
            },
            filter: (qb: QueryBuilderType<User>) => qb.select('user.name',
            'user.id',
            )
        },
        Order_procurement: {
            relation: Model.HasManyRelation,
            modelClass: Order_procurement,
            join: {
                from: 'order.id',
                to: 'order_procurement.order_id'  
            },
           
        },


    
    }
       
       
    

        
         

        
}

