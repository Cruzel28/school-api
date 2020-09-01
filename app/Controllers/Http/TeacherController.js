'use strict'

const Database = use('Database')
//const Hash = use('Hash')

function numberTypeParamValidator(number){
  if (Number.isNaN(parseInt(number)))
  return {error : ` param : ${number} is not supported, please use number type instead.` }
 
  return {}
}

class TeacherController {
    async index(){
      const teachers = await Database.table('teachers')

      //return teachers //auto เปลี่ยนเป็น json และส่งไปหน้าบ้าน
      return {status: 200, error: undefined, data: teacher || {}}
    }

    async show ({request}){
      const { id } = request.params

     const validatedValue = numberTypeParamValidator(id)
     if(validatedValue.error) return { status: 500, error: validatedValue.error, data: undefined}
      

      const teacher = await Database
      .select('*')
      .from('teachers')
      .where('teacher_id',id)
      .first()

      return {status: 200, error: undefined, data: teacher || {}}
      //return teacher || {} 
      //ถ้า teacher เท่ากับ 0," ",false, undefine, null จะออกตัวหลัง
    }

    async store({request}){
      const { first_name, last_name, email} = request.body
      //const hashPassword = await Hash.make(password)

      const missingKeys = []
      if(!first_name) missingKeys.push('first_name')
      if(!last_name) missingKeys.push('last_name')
      if(!email) missingKeys.push('email')

      new RegExp(/hello/gi).test("hello World")
      

      if(missingKeys.length)
         return {status: 422, error: `${missingKeys} is missing.`, data: undefined}

      const teacher = await Database
            .table('teachers')
            .insert({first_name, last_name, email})

      return {status: 200, error: undefined, data: {first_name,last_name,email}}
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
