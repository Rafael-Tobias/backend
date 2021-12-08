import { Response } from '@adonisjs/http-server/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pag from 'App/Models/Pag'
import StorePagValidator from 'App/Validators/StorePagValidator'

export default class PagsController {
  public async index({}: HttpContextContract) {
    const pagDB = await Pag.all()
    return pagDB
  }

  public async create({}: HttpContextContract) {}

  public async store({request, auth}: HttpContextContract) {
    const data =  await request.validate(StorePagValidator)
    const pagDB = await Pag.create({...data, userId: auth.user?.id})
    return pagDB
  }

  public async show({params, response }: HttpContextContract) {
    try {
      const pagDB = await Pag.findOrFail(params.id)
      return pagDB
    } catch (error) {
      response.status(400).send("Porjeto não encontrado!")
    }
  }

  public async update({request, params, response }: HttpContextContract) {
    try {
      const pagDB = await Pag.findOrFail(params.id)
      const { inserir_texto } = await request.validate(StorePagValidator)
      pagDB.inserir_texto = inserir_texto
      return pagDB

    } catch (error) {
      response.status(400).send("Porjeto não encontrado!")
    }
  }
  public async destroy({params, response}: HttpContextContract) {
    try {
      const pagDB = await Pag.findOrFail(params.id)
      await pagDB.delete()
      return pagDB
    } catch (error) {
      response.status(400).send("Porjeto não encontrado!")      
    }
  }
}
