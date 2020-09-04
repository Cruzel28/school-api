'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subject extends Model {
    static get primaryKey(){
        return 'subject_id'
    }

    static get createdAtColumn(){
        return null;
    }
    static get updateAtColumn(){
        return null;
    }

    teacher(){
        return this.belongsTo('App/Models/Teacher') //จอยเขา 1 or 0
    }
    
    enrollment(){
        return this.hasMany('App/Models/Enrollment') 
    }

    student(){
        return this
        .belongsToMany('App/Models/Student')
        //Many to Many
        .pivotModel('App/Models/Enrollment') //ตัวควบคุม
    }


}

module.exports = Subject
