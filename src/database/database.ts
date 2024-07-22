import Technologies from '../types/technologies'
import User from '../types/user'

export class Database {
    database: User[]

    constructor(database: User[]) {
        this.database = database
    }

    addUser(user: User): boolean {
        if (this.database.push(user)) {
            return true
        }
        else return false
    }

    findUserById(id: number): number {
        return this.database.findIndex((value) => id == value.id)
    }

    findUserByUserName(name: string): number {
        return this.database.findIndex((value) => name ==value.username)
    }

    deleteUser(id: number): boolean {
        let index = this.findUserById(id)
        if(this.database = this.database.splice(index, 1)) {
            return true
        }
        return false
    }

    updateUser(id: number, updated: User): void {
        let index = this.findUserById(id)
        this.database[index] = {
            ...updated
        } as User
    }

    getTechnologies(name: string) {
        let index = this.findUserByUserName(name)
        if (index == -1) return null
        return this.database[index].technologies
    }

    findTechnologyById(userId: number, technologyId: string): number {
        return this.database[userId].technologies.findIndex((value) => value.id === technologyId)
    }

    getTecnologyById(userId: number, technologyId: string): Technologies | any {
        let userIndex = this.findUserById(userId)
        if(userIndex === -1) { return null }

        let technologyIndex = this.findTechnologyById(userIndex, technologyId)
        if(technologyIndex === -1) { return null }

        return this.database[userIndex].technologies[technologyIndex]
    }

    addTechnology(userName: string, technology: Technologies): boolean {
        let userIndex = this.findUserByUserName(userName)
        if(this.database[userIndex].technologies.push(technology)) {
            return true
        }
        else return false
    }

    removeTechnology(userName: string, technologyId: string){
        let userIndex = this.findUserByUserName(userName)
        let technologyIndex = this.getTecnologyById(userIndex, technologyId)
        this.database[userIndex].technologies.splice(technologyIndex, 1)
    }

    updateTechnology(userName: string, technologyId: string, technology: Technologies){
        let userIndex = this.findUserByUserName(userName)
        let technologyIndex = this.getTecnologyById(userIndex, technologyId)
        if(technologyIndex === -1) { return null }
        this.database[userIndex].technologies[technologyIndex] = { ...technology } as Technologies

        return this.database[userIndex].technologies[technologyIndex]
    }
}

export const dados: User[] = []
