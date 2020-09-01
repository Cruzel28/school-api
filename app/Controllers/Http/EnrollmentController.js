'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Enrollment = use('App/Models/Enrollment')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
    return {error : ` param : ${number} is not supported, please use number type instead.` }
   
    return {}
  }

class EnrollmentController {

    async index(){
      const {references = undefined} = request.qs
      const enrollments = Enrollment.query()

      if (references){
      const extractedReferences = references.split(",")
      subjects.with(extractedReferences)
      }
        return {status: 200, 
          error: undefined, 
          data: enrollments.fetch()}
      }

      async show ({request}){
        const { id } = request.body
        const enrollment = await Enrollment.find(id)
  
       const validatedValue = numberTypeParamValidator(id)

       if(validatedValue.error) 
          return { status: 500, 
                   error: validatedValue.error, 
                   data: undefined}
  
        return {status: 200, 
                error: undefined, 
                data: enrollment || {}}
        
      }
  
      async store({request}){
        const { mark, student_id, subject_id} = request.body
        const enrollment = await Subject.create({ mark, student_id, subject_id})

        const rules = {
          mark:'required',
          student_id:'required',
          subject_id:'required' 
        }
  
        const validation = await Validator.validate(request.body,rules)
  
        if(validation.fails())
        return {status: 422, 
          error: validation.messages(), 
          data: undefined}
  
        return {status: 200, 
                error: undefined, 
                data: enrollment}
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
