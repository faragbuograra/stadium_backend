import { Request, Response } from "express";

export const me = async (req: Request, res: Response) => {
   if(!req.user) return res.status(401).json({message: 'Unauthorized'})
   if(req.user.status=='false') return res.status(401).json({message: 'Unauthorized'})

    res
        .status(200)
        .json(req.user)

}
