'use strict'

const Database = use('Database')
//const Hash = use('Hash')
const Validator = use('Validator')
const Teacher =use('App/Models/Teacher')

function numberTypeParamValidator(number){
  if (Number.isNaN(parseInt(number)))
  return {error : ` param : ${number} is not supported, please use number type instead.` }
 
  return {}
}

class TeacherController {

    async index({request}){
      const {references = undefined} = request.qs
      const teachers = Teacher.query()

      if (references){
        const extractedReferences = references.split(",")
        subjects.with(extractedReferences)
      return {status: 200, 
        error: undefined,
         data: await teachers.fetch()}
    }
  }

    async show ({request}){
      const { id } = request.body
        const teacher = await  Teacher.find(id)

     const validatedValue = numberTypeParamValidator(id)
     
     if(validatedValue.error) 
     return { status: 500, 
      error: validatedValue.error, 
      data: undefined}
      
      return {status: 200, 
        error: undefined, 
        data: teacher || {}}
      //return teacher || {} 
      //ถ้า teacher เท่ากับ 0," ",false, undefine, null จะออกตัวหลัง
    }

    async store({request}){
      const { first_name, last_name, email} = request.body
      const teacher = await Teacher.create({first_name,last_name,email})
      
      const rules = {
        first_name:'required',
        last_name:'required',
        email:'required|email|unique:teachers,email' //หลายเคสให้เชื่อมด้วยไปป์
                         //  unique:table,collum            
      }

      const validation = await Validator.validate(request.body,rules)

      if(validation.fails())
      return {status: 422, 
        error: validation.messages(), 
        data: undefined}

      // const missingKeys = []
      // if(!first_name) missingKeys.push('first_name')
      // if(!last_name) missingKeys.push('last_name')
      // if(!email) missingKeys.push('email')

      // // new RegExp(/hello/gi).test("hello World")
      

      // if(missingKeys.length)
      //    return {status: 422, error: `${missingKeys} is missing.`, data: undefined}

      return {status: 200, 
        error: undefined, 
        data: teacher}
    }

    async update({request}){
      const {body,params} = request
      // เท่ากับ const body = request.body
      // กับ const param = request.param
      const {id} = params
      const {first_name,last_name,email} = body

     const teacherID = await Database
      .table('teachers')
      .where({teacher_id: id})
      .update({first_name,last_name,email})
      

      const teacher = await Database
      .table('teachers')
      .where({teacher_id: teacherID})
      .first()

      return {status: 200, error: undefined, data: {first_name,last_name,email}}
    }

    async destroy ({request}){
      const {id} = request.params

      const deletedTeacher = await Database
      .table('teachers')
      .where({teacher_id:id})
      .delete()

      return {status: 200, error: undefined, data: {message: 'success'}}
    }
}

module.exports = TeacherController
