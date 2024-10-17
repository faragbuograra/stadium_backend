import { knex }                           from '../../../knexfile'
import * as bcrypt                        from 'bcryptjs'
import Objection, { Model, QueryBuilderType, QueryContext } from 'objection'
import * as jsonwebtoken                  from "jsonwebtoken"
import { DOMAIN, JWT_EXPIRY, JWT_SECRET } from '../../config'

import { TimestampedModel }               from '../Shared/TimestampedModel'
import { type } from 'node:os'
import Role from '../Role/role.model'
import Department from '../Department/department.model'
import Management from '../Management/management.model'

export class User extends TimestampedModel {
  
    static tableName   = 'user'
    static defaultSort = 'email'

    id!: string
    name!: string | null
    username!: string 
    email!: string
    phone!: string | null
    password!: string | null
    role_id!: number| null
    status!: string
    img!: string | null
    birthdate!: Date | string | null // unify date value output
    balance!: number
    role!: string
    phoneIsActive!: string
    type!: string
    management_id!: number | null
    /*
     * ---------------------------------------------------------------------
     * Static methods
     * ---------------------------------------------------------------------
     */

    static jsonSchema = {
        type: 'object',
        required: ['name', 'password'],
        //,'name','birthdate','phone'
      
        properties: {
            // name: { type: 'string', minLength: 3, maxLength: 255 },
            // //check if email unique




            // email: { type: 'string', maxLength: 255, pattern: "^\\S+@\\S+\\.\\S+$" }, // a@c.c
            
            // phone: { type: 'string', minLength: 9, maxLength: 12 },
            // password: { type: 'string', minLength: 8, maxLength: 32 },
            // birthdate: { type: 'string' },
            // is_disabled: { type: 'boolean'},
            // img: { type: 'string', maxLength: 255 },
        }
    }

    // BEFORE
    async $beforeInsert(qc: QueryContext) {
  
        if ('username' in this) {
            this.username    = this.username.toLowerCase()
            this.password = await this.$setPassword(this.password!)
        }
     
            return super.$beforeInsert(qc)
       
       
    }

   
    async $beforeUpdate(args: any, qc: QueryContext) {
        if ('username' in this) this.username = this.username.toLowerCase()

        if ('password' in this && this.password) {
            this.password = await this.$setPassword(this.password)
        }
        return super.$beforeUpdate(args, qc)
    }

    // Password hashing
    async $getPassword() {
        const result = await knex('user')
            .where('id', this.id)
            .select('password')
        return result[0] ? result[0].password : null
    }

    async $setPassword(value: string) {
        const salt = await bcrypt.genSalt()
        if (value == null) return null
        return await bcrypt.hash(value, salt)
    }

    async $validatePassword(candidatePassword: string): Promise<boolean> {
        let userPassword = await this.$getPassword()

        if (userPassword) {
            return await bcrypt.compare(candidatePassword, userPassword)
        } else {
            return false
        }
    }

    // Generating JWT token with only user id inside
    $genToken(): string {
        return jsonwebtoken.sign(
            { id: this.id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        )
    }

    // Removes password when EXISTING model value returns from database
    // $parseDatabaseJson(json: Objection.Pojo): Objection.Pojo {
    //     json       = super.$parseDatabaseJson(json);
    //     json.img   = json.img != null ? `${DOMAIN}/uploads/user/${json.img}` : null

    //     if ('password' in json)
    //         delete json.password

    //     return json
    // }

    // Removes password when a NEW model value returns from database
    $formatJson(json: Objection.Pojo): Objection.Pojo {
        json = super.$formatJson(json);

        if ('password' in json)
            delete json.password

        return json
    }

    /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */
    static relationMappings = () => ({
        role: {
            relation: Model.HasOneRelation,
            modelClass: Role,
            join: {
                from: 'user.role_id',
             to: 'role.id'
            },
            filter: (qb: QueryBuilderType<Role>) => qb.select('role.name')
        },
        department: {
            relation: Model.HasOneRelation,
            modelClass: Department,
            join: {
                from: 'user.department_id',
             to: 'department.id'
            },
            filter: (qb: QueryBuilderType<Department>) => qb.select('department.name')
        },
        management: {
            relation:  Model.HasOneRelation,
            modelClass: Management,
            join: {
                from: 'user.management_id',
             to: 'management.id'
            },
            filter: (qb: QueryBuilderType<Management>) => qb.select('management.name')
        },
    })
}
