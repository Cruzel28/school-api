'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {

    static get primaryKey(){
        return 'student_id'
    }

    static get createdAtColumn(){
        return null;
    }
    static get updateAtColumn(){
        return null;
    }

    enrollment(){
        return this.hasMany('App/Models/Enrollment') 
    }

    group(){
        return this.belongsTo('App/Models/Group')
    }

    subject(){
        return this.hasMany('App/Models/Subject')         
    }

}

module.exports = Student