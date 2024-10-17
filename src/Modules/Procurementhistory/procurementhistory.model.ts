
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'
import Department from '../Department/department.model'
import Management from '../Management/management.model'

export default class Procurementhistory extends TimestampedModel {

    // Table name
    static tableName = 'procurementhistory'
    static defaultSort = 'name'

    // Table columns
    id!: number
    name!: string | null
    status!:boolean | string
    maxBatchNo!: number| any
    maxBatch!: number| null
    index!: number| any
    type!: string | null
    batchNo!: number | any
    management_id!: number | any
    department_id!: number | any
    management_idTo!: number | any
    department_idTo!: number | any
    procurement_id!: number | any
    file!: string | null
buildName!: string | null
companies_id!: number | any
what!: string | null
SN!: string | any
price!: number | any
    user_id!: string | any
    description!: string | null
    procurementhistory!: string | any
    date!: string | null
    
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
             
                from: 'procurementhistory.management_id',
                to: 'management.id',
            },
            filter: (qb: QueryBuilderType<Management>) => qb.select('management.id','management.name')
        },
        Department: {
            relation: Model.HasOneRelation,
            modelClass: Department,
            join: {
             
                from: 'procurementhistory.department_id',
                to: 'department.id',
            },
            filter: (qb: QueryBuilderType<Department>) => qb.select('department.id','department.name')
        },
        ManagementTo: {
            relation: Model.HasOneRelation,
            modelClass: Management,
            join: {
             
                from: 'procurementhistory.management_idTo',
                to: 'management.id',
            },
            filter: (qb: QueryBuilderType<Management>) => qb.select('management.id','management.name')
        },
        DepartmentTo: {
            relation: Model.HasOneRelation,
            modelClass: Department,
            join: {
             
                from: 'procurementhistory.department_idTo',
                to: 'department.id',
            },
            filter: (qb: QueryBuilderType<Department>) => qb.select('department.id','department.name')
        },
       


    
    }
       
       
    

        
         

        
}

