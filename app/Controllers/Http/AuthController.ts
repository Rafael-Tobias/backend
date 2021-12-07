import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
    public async register({ request }: HttpContextContract) {
        //const data = request.only(["email","passowrd"])
        const data = await request.validate(RegisterUserValidator)
        const user = await Users.create(data)
        return user
    }
    public async login({ request, auth, response }: HttpContextContract) {
        try {
            const { email, passowrd } = request.all()
            const token = await auth.use('api').attempt(email, passowrd)
            const user = await Users.findByOrFail("email", email)
            return { token, user }
        } catch (error) {
            response.status(451).send("Login oou senha incoretos!")
        }
    }
}
