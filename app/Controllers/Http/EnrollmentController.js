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
  

}

module.exports = EnrollmentController
