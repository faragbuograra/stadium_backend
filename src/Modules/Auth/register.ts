import { NextFunction, Request, Response } from "express"
import { ValidationError }                 from 'objection'
import { JWT_EXPIRY }                      from '../../config'
import { User }                            from '../Users/user.model'
import ms                                  from 'ms'

export const register = async (req: Request, res: Response, next: NextFunction) => {

  
    // add phone number validation
  
    if( !req.body.password){
        return next(new ValidationError({
            message: 'Password or email  is required!',
            type: 'ModelValidation',
            data: {
               
               
                password: 'Password is required!',
                

            },
        }))
    }


    const trx = await User.startTransaction()


    await User
        .query(trx)
        .where('name', req.body.name)
        .first()
        .then(async (user) => {

            if (user) {
                throw new ValidationError({
                    type: "ModelValidation",
                    message: "User already exist"
                })
            }

            // TODO: validate password == password confirmation

req.body.status=  "true";

console.log(req.body)
            let newUser = await User
                .query(trx)
                .insert(req.body)
                .returning('*')

            // await newUser.$relatedQuery("roles", trx).relate([2])

            const generated = newUser.$genToken()
            const token     = `Bearer ${generated}`

            return res
                .setHeader('Set-Cookie', [
                    `accessToken=${token}; path=/; HttpOnly; Max-Age=${ms(JWT_EXPIRY) / 100}; SameSite=None; Secure`
                ])
                .json({
                    status: 'success',
                    message: 'logged in',
                    token: newUser.$genToken(),
                 
                })
        })
        .catch(async (err) => {
            await trx.rollback()
            return next(err)
        })
        .finally(async () =>{
            await trx.commit()
        })

}
