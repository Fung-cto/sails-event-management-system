/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'event/home' },
  // '/home': { view: 'event/home' },
  // '/event/home': { view: 'event/home' },

  // '/search': { view: 'event/search' },
  // '/create': { view: 'event/create' },
  // '/admin': { view: 'event/admin' },

  'GET /': 'EventController.home',
  'GET /home': 'EventController.home',
  'GET /event/home': 'EventController.home',

  'GET /search': 'EventController.search',
  'GET /event/search': 'EventController.search',


  'GET /event/create': 'EventController.create',
  'POST /event/create': 'EventController.create',
  'GET /create': 'EventController.create',
  'POST /create': 'EventController.create',


  'GET /admin': 'EventController.admin',
  'GET /event/admin': 'EventController.admin',
  'GET /event/json': 'EventController.json',

  'GET /event/details/:id': 'EventController.details',


  'GET /event/editEvent/:id': 'EventController.editEvent',
  'POST /event/editEvent/:id': 'EventController.editEvent',

  'DELETE /event/delete/:id': 'EventController.delete',


  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'GET /user/logout': 'UserController.logout',

  // 'GET /event/:id/consultants': 'EventController.populate',
  'GET /user/:id/clients': 'UserController.populate',
  'GET /user/:id': 'UserController.populate',
  // 'POST /user/:id/clients/add/:fk': 'UserController.add',
  // 'POST /user/:id/clients/remove/:fk': 'UserController.remove',

  // for register  
  'GET /event/:id/register': 'EventController.populate',
  'GET /event/registered': 'UserController.populate',
  'GET /registered': 'UserController.populate',
  'POST /user/participant/add/:fk': 'UserController.add',
  'POST /user/participant/remove/:fk': 'UserController.remove',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
