'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Subject =use('App/Models/Subject')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
    return {error : ` param : ${number} is not supported, please use number type instead.` }
   
    return {}
  }
class SubjectController {

    async index({request}){
      // /subjects?references=teachers
      const {references = undefined} = request.qs
      const subjects = Subject.query()

      if (references){
      const extractedReferences = references.split(",")
      subjects.with(extractedReferences)
      }
      // const subjects = await Subject
      // .query()
      // .with(extractedReferences)
      // .fetch()
        // const subjects = await Database.table('subjects')

        return {status: 200, 
                error: undefined, 
                data: await subjects.fetch()} 
    }


    async show ({request}){
        const { id } = request.body
        const subject = await Subject.find(id)

       const validatedValue = numberTypeParamValidator(id)

       if(validatedValue.error) 
       return { status: 500, 
        error: validatedValue.error, 
        data: undefined}
        
  
        // const subjects = await Database
        // .select('*')
        // .from('subjects')
        // .where('subject_id',id)
        // .first()
  
        return {status: 200, 
          error: undefined, 
          data: subject || {}}
       
      }
    

      // async showTeacher({request}){
      //   const {id} = request.params
      //   const subjects = await Database
      //   .select('*')
      //   .from('subjects')
      //   .where('subject_id',id)
      //   .innerjoin('teachers','subjects.teacher_id','teachers.teacher_id')
      //   .first()
  
      //   return {status: 200, error: undefined, data: subjects || {}}
      // }

      // async store({request}){
      //   const { title, teacher_id} = request.body
  
      //  
  
      //   const subjects = await Database
      //         .table('subjects')
      //         .insert({title, teacher_id})
  
      //   return {status: 200, 
      //           error: undefined, 
      //           data: {title,teacher_id}}
      // }

      async store({request}){
        const {title,teacher_id}= request.body
        const subject = await Subject.create({title,teacher_id})
         
        const rules = {
          title:'required|unique:teachers,title',
          teacher_id:'required',
        }
  
        const validation = await Validator.validate(request.body,rules)
  
        if(validation.fails())
               return {status: 422, 
                error: validation.messages(), 
                data: undefined}
       
        return {status: 200, 
                  error: undefined, 
                  data: subject}
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
