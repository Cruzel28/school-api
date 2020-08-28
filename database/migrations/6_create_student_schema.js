'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateStudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments('student_id')
      table.string('first_name',120).notNullable()
      table.string('last_name',120).notNullable()
      table.string('email').notNullable().unique() //default length = 255
      table.string('password').notNullable()
      table.integer('group_id').unsigned() //ทำให้เป็น FK ต้อง .unsigned ก่อน
      table.timestamps() //auto create 2 column -> create_at, update_at

      table
      .foreign('group_id')
      .references('groups.group_id')
      .onDelete('CASCADE') //ถ้าตัวต้นทางหาย จะลบตัวหลังให้ด้วย ไม่ต้องเสียเวลาไล่ลบทีละจุด //ON DELETE CASCADE
      .onUpdate('CASCADE') //ฝั่งนึงอัพเดท อีกฝั่งอัพเดทด้วย  // ON UPDATE CASCADE
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = CreateStudentSchema
