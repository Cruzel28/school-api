'use strict'

const Database = use('Database')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
    return {error : ` param : ${number} is not supported, please use number type instead.` }
   
    return {}
  }
class SubjectController {

    async index(){
        const subjects = await Database.table('subjects')

        return {status: 200, 
                error: undefined, 
                data: subjects || {}} 
    }
    async show ({request}){
        const { id } = request.params
  
       const validatedValue = numberTypeParamValidator(id)
       if(validatedValue.error) return { status: 500, error: validatedValue.error, data: undefined}
        
  
        const subjects = await Database
        .select('*')
        .from('subjects')
        .where('subject_id',id)
        .first()
  
        return {status: 200, error: undefined, data: subjects || {}}
       
      }

      async store({request}){
        const { title, teacher_id} = request.body
  
        const missingKeys = []
        if(!title) missingKeys.push('title')
        if(!teacher_id) missingKeys.push('teacher_id')
  
        if(missingKeys.length)
           return {status: 422, error: `${missingKeys} is missing.`, data: undefined}
  
        const subjects = await Database
              .table('subjects')
              .insert({title, teacher_id})
  
        return {status: 200, 
                error: undefined, 
                data: {title,teacher_id}}
      }

      async update({request}){
        const {body,params} = request
        const {id} = params
        const {title,teacher_id} = body
  
       const subjectID = await Database
        .table('subjects')
        .where({subject_id: id})
        .update({title,teacher_id})
        
  
        const subject = await Database
        .table('subjects')
        .where({subject_id: subjectID})
        .first()
  
        return {status: 200, error: undefined, 
          data: {title,teacher_id}}
      }

      async destroy ({request}){
        const {id} = request.params
  
        const deletedSubject = await Database
        .table('subjects')
        .where({subject_id:id})
        .delete()
  
        return {status: 200, error: undefined, data: {message: 'success'}}
      }
  

}

module.exports = SubjectController
