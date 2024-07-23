import Router from 'express'
import UserController from '../controller/userController'
import checkExistUserAccount from '../middleware/checkExistsUserAccount'
import User from '../types/user'

const router = Router()
const controller: UserController = new UserController()

router.post('/user', controller.addUser)
router.post('/technologies', checkExistUserAccount, controller.addTechnology)
router.put("/technologies/:id", checkExistUserAccount, controller.updateTechnology)
router.patch("/technologies/:id/studied", checkExistUserAccount, controller.updateTechnologyStatus)
router.get("/technologies", checkExistUserAccount, controller.getTechnologies)
router.delete("/technologies/:id", checkExistUserAccount, controller.deleteTechnology)

export default router