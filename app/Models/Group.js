'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
    static get primaryKey(){
        return 'group_id'
    }
    static get createdAtColumn(){
        return null;
    }
    static get updateAtColumn(){
        return null;
    }

    Student(){
        return this.hasMany('App/Models/Student')
    }
}

module.exports = Group
