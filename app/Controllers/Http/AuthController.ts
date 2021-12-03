import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/User'

export default class AuthController {
    public async register({ request }:HttpContextContract) {
        const data = request.only(["email","passowrd"])
        const user = await Users.create(data)
        return user 
    }
    public async login({ request, auth }:HttpContextContract) {
        const {email, passowrd} = request.all()
        const token = await auth.use('api').attempt(email, passowrd)
        const user = await Users.findByOrFail("email", email)
        return {token, user}
    }
}
