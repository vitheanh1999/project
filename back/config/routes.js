/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  'post /auth/login':'AuthController.login',
  'post /auth/registration':'AuthController.registration',
  'post /auth/info' : 'AuthController.getInfor',
  'post /auth/myauth' : 'AuthController.myauth',
  'post /answer/create': 'AnswerController.create',

  'post /admin/getAll':"AuthController.getAll",
  'post /admin/changeRole':"AuthController.changeRole",
  'post /admin/create':"AuthController.create",
  'post /admin/editpassword':"AuthController.editpassword",
  'post /admin/resetpassword':"AuthController.resetpassword",
  
  
  'post /section/create' :'SectionController.create',
  'post /section/list':'SectionController.list',
  'post /section/delete':'SectionController.delete',
  'post /section/edit':'SectionController.edit',
  'post /section/closesec':'SectionController.closesec',
  'post /section/opensec':'SectionController.opensec',

  'post /question/list':'QuestionController.viewlistquestion',
  'post /viewauth/list':'QuestionController.viewauth',
  'post /question/delete':'QuestionController.delete',
  'post /question/edit':'QuestionController.edit',

  'post /survey/create':'SurveyController.create',

  'post /answer/delete':'SurveyController.delete',
  'post /answer/edit':'SurveyController.edit',
  'post /survey/create':'SurveyController.create',
  'post /survey/view':'SurveyController.viewsurvey',
  'post /survey/doSurvey':'SurveyController.doSurvey',
  'post /survey/static':'SurveyController.statistics',


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
