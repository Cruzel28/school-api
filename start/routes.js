'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(()=> {
  //api route start here
  Route.resource('/teachers','TeacherController')

  // Route.get('/teachers','TeacherController.index')
  // Route.get('/teachers/:id','TeacherController.show')

  // Route.post('/teachers','TeacherController.store')

  // Route.put('/teachers/:id','TeacherController.update')
  // Route.patch('/teachers/:id','TeacherController.update')

  // Route.delete('/teachers/:id','TeacherController.destroy')

  Route.resource('/subjects','SubjectController')
 

  Route.resource('/students','StudentController')
  
  Route.resource('/enrollments','EnrollmentController')
            
  Route.resource('/groups','GroupController')

}).prefix('api/v1')
