import { NextFunction, Request, Response } from "express"
import { dados, Database } from "../database/database"

function checkExistUserAccount(req: Request, res: Response, next: NextFunction) {
    const database = new Database(dados)
    const { userName }: { userName: string } = req.headers as { userName: string }
    if(database.findUserByUserName(userName) == -1){
        return res.status(404).json({error: "user not found"})
    }
    next()
}

export default checkExistUserAccount