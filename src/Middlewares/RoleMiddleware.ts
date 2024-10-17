import { NextFunction, Request, Response } from "express"
import { ValidationError }                 from 'objection'
import { User }                            from '../Modules/Users/user.model'

export const RoleMiddleware = (grantedRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let user = req.user as User
        if (!user) {
            let err = new ValidationError({
                type: "UnauthorizedAccess",
                message: "user does not exist"
            })

            return next(err)
        }

        if (user.status =='false') {
            let err = new ValidationError({
                type: "UnauthorizedAccess",
                message: "Your account has been disabled"
            })

            return next(err)
        }

        // if (user.role  && grantedRole != user.role) {
       
        //     let err = new ValidationError({
        //         type: "UnauthorizedAccess",
        //         message: "route requires the following roles Admin"
        //     })

        //     return next(err)
        // }

       

        // if(hasRoles.length <= 0) {

        //     let err = new ValidationError({
        //         type: "UnauthorizedAccess",
        //         message: `route requires the following roles: ${grantedRole.join(',')}`
        //     })

        //     return next(err)
        // }

        return next()
    }
}
