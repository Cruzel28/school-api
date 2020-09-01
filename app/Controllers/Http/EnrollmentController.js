'use strict'

const Database = use('Database')


function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
    return {error : ` param : ${number} is not supported, please use number type instead.` }
   
    return {}
  }

class EnrollmentController {

    async index(){
        const enrollments = await Database.table('enrollments')
  
        return {status: 200, error: undefined, data: enrollments || {}}
      }

      async show ({request}){
        const { id } = request.params
  
       const validatedValue = numberTypeParamValidator(id)
       if(validatedValue.error) 
          return { status: 500, 
                   error: validatedValue.error, 
                   data: undefined}
        

        const enrollment = await Database
        .select('*')
        .from('enrollments')
        .where('enrollment_id',id)
        .first()
  
        return {status: 200, 
                error: undefined, 
                data: enrollment || {}}
        
      }
  
      async store({request}){
        const { mark, student_id, subject_id} = request.body
        
  
        const missingKeys = []
        if(!mark) missingKeys.push('mark')
        if(!student_id) missingKeys.push('student_id')
        if(!subject_id) missingKeys.push('subject_id')
  
        if(missingKeys.length)
           return {status: 422, 
            error: `${missingKeys} is missing.`, 
            data: undefined}
  
        const enrollment = await Database
              .table('enrollments')
              .insert({mark, student_id, subject_id})
  
        return {status: 200, 
                error: undefined, 
                data: {mark,student_id,subject_id}}
      } 

      async update({request}){
        const {body,params} = request
        const {id} = params
        const {mark, student_id, subject_id} = body
  
       const EnrollmentID = await Database
        .table('enrollments')
        .where({enrollment_id: id})
        .update({mark, student_id, subject_id})
        
  
        const enrollment = await Database
        .table('enrollments')
        .where({enrollment_id: enrollmentID})
        .first()
  
        return {status: 200, error: undefined, 
          data: {mark, student_id, subject_id}}
      }
  
      async destroy ({request}){
        const {id} = request.params
  
        const deletedEnrollment = await Database
        .table('enrollments')
        .where({enrollment_id:id})
        .delete()
  
        return {status: 200, error: undefined, data: {message: 'success'}}
      }
  

}

module.exports = EnrollmentController