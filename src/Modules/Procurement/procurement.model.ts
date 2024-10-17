
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'
import Department from '../Department/department.model'
import Management from '../Management/management.model'
import { User } from '../Users/user.model'
import Type from '../Types/type.model'

export default class Procurement extends TimestampedModel {

    // Table name
    static tableName = 'procurement'
    static defaultSort = 'name'

    procurementhistory!: string | any
    id!: number
    name!: string | null
    status!:boolean | string
    maxBatchNo!: number| any
    maxIndex!: number| any
    maxBatch!: number| null
    procurement_count!: number | null
    department_id!: number | null
    management_id!: number | null
    management_idTo!: number | null
    management_name!: string | null
    department_name!: string | null
    SN: string | any
    index!: number| any
    type!: string | null
    batchNo!: number | any
price!: number | any
    user_id!: string | any
    description!: string | null
    department_idTo!: number | any
    date!: string | null
    procurement_id!: number | any
    file!: string | null
buildName!: string | null
companies_id!: number | any
    static jsonSchema = {
        type: 'object',
        required: [ 'name' ],
        properties: {
            name: { type: 'string', minLength: 1 }
        }
    }

    // Formats img and thumb fields when existing model value returns from database

    $parseDatabaseJson(json: Objection.Pojo): Objection.Pojo {
        json       = super.$parseDatabaseJson(json);
        json.file   = json.file != null ? `${DOMAIN}/uploads/files/${json.file}` : null

        

        return json
    }

    /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */
    
    // One-to-many relation with Subcategory model
    static relationMappings = {
    
        Management: {
            relation: Model.HasOneRelation,
            modelClass: Management,
            join: {
             
                from: 'procurement.management_id',
                to: 'management.id',
            },
            filter: (qb: QueryBuilderType<Management>) => qb.select('management.id','management.name')
        },
      
        ManagementTo: {
            relation: Model.HasOneRelation,
            modelClass: Management,
            join: {
             
                from: 'procurement.management_idTo',
                to: 'management.id',
            },
            filter: (qb: QueryBuilderType<Management>) => qb.select('management.id','management.name')
        },
       
        user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
                from: 'procurement.user_id',
                to: 'user.id' 
            },
            filter: (qb: QueryBuilderType<User>) => qb.select('user.name',
            'user.id',
            )
        },
    //     types: {
    //     relation: Model.HasOneRelation,
    //     modelClass: Type,
    //     join: {
    //         from: 'procurement.type' as any,
    //         to: 'types.id'
    //     },
    //     filter: (qb: QueryBuilderType<Type>) => qb.select('types.*')
    // },
    
    }
       
       
    

        
         

        
}

