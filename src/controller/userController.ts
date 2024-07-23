import { dados, Database } from "../database/database"
import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid'
import Technologies from "../types/technologies"
import User from "../types/user"

class UserController {

    addUser(req: Request, res: Response) {
        const db = new Database(dados)
        const { id, name, username } : { id: number, name: string, username: string } = req.body

        if(db.findUserByUserName(username) !== -1) {
            return res.status(400).json({error: "User already exists"})
        }

        const user: User = {
            id,
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
        const { userName } : { userName: string } = req.body
        const { title, deadline } : { title: string, deadline: string } = req.body
        const { id }: { id: string } = req.params as { id : string }

        const idUser = db.findUserByUserName(userName)
        const technology = db.getTecnologyById(idUser, id)
        if(!technology){
            return res.status(404).json({error: "Tecnologia não existe no banco de dados."})
        }

        if(!!deadline && new Date(deadline) < new Date()){
            return res.status(400).json({error: "Data inválida."})
        }

        const newTechnology: Technologies = {
            ...technology,
            title: !!title ? title : technology.title,
            deadline: deadline ? new Date(deadline) : technology.deadline
        }

        
        const addTechnology = db.updateTechnology(userName, id, newTechnology)
        res.status(200).json(addTechnology)
    }

    updateTechnologyStatus(req: Request, res: Response) {
        const db = new Database(dados)
        const { userName } : { userName: string } = req.body
        const { id }: { id: string } = req.params as { id: string }

        const idUser = db.findUserByUserName(userName)
        const technology = db.getTecnologyById(idUser, id)

        if(!technology){
            return res.status(404).json({error: "Technology not found"})
        }

        const newTechnology: Technologies = {
            ...technology,
            studied: true
        } 

        const updatedTechnology = db.updateTechnology(userName, id, newTechnology)
        res.status(201).json(updatedTechnology)
    }

    deleteTechnology(req: Request, res: Response) {
        const db = new Database(dados)
        const { userName } : { userName: string } = req.headers as { userName: string } 
        const { id }: { id: string } = req.params as { id : string }

        const idUser = db.findUserByUserName(userName)
        if(!db.getTecnologyById(idUser, id)){
            return res.status(404).json({error: "Tecnologia não existe no banco de dados."})
        }

        db.removeTechnology(userName, id)
        res.status(201).json({status: "Technology removed"})
    }
}

export default UserController