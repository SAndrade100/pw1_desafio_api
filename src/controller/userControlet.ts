import { dados, Database } from "../database/database"
import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid'
import Technologies from "../types/technologies"
import User from "../types/user"

class UserController {

    addUser(req: Request, res: Response) {
        const db = new Database(dados)
        const { name, username } : { name: string, username: string } = req.body

        if(db.findUserByUserName(username) !== -1) {
            return res.status(400).json({error: "User already exists"})
        }

        const user: User = {
            id: Number(uuidv4()),
            name,
            username,
            technologies: [] as Technologies[]
        }
        db.addUser(user)
        return res.status(201).json(user)
    }

    getTechnologies(req: Request, res: Response) {
        const db = new Database(dados)
        const { name, userName } : { name: string, userName: string } = req.body

        let technologies = db.getTechnologies(userName)

        return res.status(201). json(technologies)
    }

    addTechnology(req: Request, res: Response) {
        const db = new Database(dados)
        const { userName } : { userName: string } = req.headers as { userName: string }
        const { title, deadline } : { title: string, deadline: string } = req.body

        if(new Date(deadline) <= new Date()){
            return res.status(400).json({error: "Erro com data."})
        }

        const technology: Technologies = {
            id: uuidv4(),
            title,
            deadline: new Date(deadline),
            created_at: new Date(),
            studied: false
        } 
        
        if(db.addTechnology(userName, technology)) {
            return res.status(201).json(technology)
        } else return res.status(400).json({error: "Tecnologia não adicionada."})
    }

    updateTechnology(req: Request, res: Response) {
        const db = new Database(dados)
        const { name, userName } : { name: string, userName: string } = req.body
    }

    updateTechnologyStatus(req: Request, res: Response) {
        const db = new Database(dados)
        const { name, userName } : { name: string, userName: string } = req.body
    }

    deleteTechnology(req: Request, res: Response) {
        const db = new Database(dados)
        const { name, userName } : { name: string, userName: string } = req.body
    }
}