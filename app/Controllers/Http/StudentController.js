'use strict'

const Database = use('Database')
const Hash = use('Hash')
const Validator = use('Validator')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
    return {error : ` param : ${number} 
    is not supported, please use number type instead.` }
   
    return {}
  }
class StudentController {
    async index(){
        const students = await Database.table('students')
        return {status: 200, 
                error: undefined, 
               data: students || {}}
      }

      async show ({request}){
        const { id } = request.params
  
       const validatedValue = numberTypeParamValidator(id)
       if(validatedValue.error) 
          return { status: 500, 
                  error: validatedValue.error,  
                  data: undefined}
          
        const student = await Database
        .select('*')
        .from('students')
        .where('student_id',id)
        .first()
  
        return {status: 200, 
                error: undefined, 
                data: student || {}}
      }

      async store({request}){
        const { first_name, last_name, email,password,group_id} = request.body
        const hashPassword = await Hash.make(password)
        const rules = {
          first_name:'required',
          last_name:'required',
          email:'required|email|unique:teachers,email',
          password:'required|min:8'           
        }
  
        const validation = await Validator.validate(request.body,rules)
  
        if(validation.fails())
        return {status: 422, error: validation.message(), data: undefined}
        
        const students = await Database
              .table('students')
              .insert({first_name, last_name, email,password:hashPassword,group_id})
  
        return {status: 200, error: undefined, data: {first_name,last_name,email,password:hashPassword,group_id}}
      }

      async update({request}){
        const {body,params} = request
        const {id} = params
        const {first_name,last_name,email,group_id} = body
       
  
       const studentID = await Database
        .table('students')
        .where({student_id: id})
        .update({first_name,last_name,email,group_id})
        
  
        const student = await Database
        .table('students')
        .where({student_id: studentID}) 
        .first()
  
        return {status: 200, 
          error: undefined, 
          data: {first_name,last_name,email,group_id}}
      }

      async destroy ({request}){
        const {id} = request.params
  
        const deletedStudent = await Database
        .table('students')
        .where({student_id:id})
        .delete()
  
        return {status: 200, error: undefined, data: {message: 'success'}}
      }
  
  
}

module.exports = StudentController
