# Trello Clone
Test task specification: 
To show your current skills in web development, you will have to use: 
On front-end: 
Angular or Angularjs or React or Vue;
any css framework of your choice(bootstrap, materialize, semantic-ui,  ui-kit)
any helpful npm/yarn packages(for example: lodash)

On back-end: 
Node.js web framework of your choice(such as express, koa, etc)
SQL, or NoSQL database to store data(MySQL, PostgreSQL, MongoDB, etc)
any helpful npm/yarn packages of your choice

You have to build a trello-clone, which will have to work like this: 


Unauthorized users can: only view a board, with groups of task, login/register to app to do more. 
Authorized users can: create, delete, update tasks and groups, log out, drag’n’drop tasks inside the group and between groups, view its details(in modal window). 

Task-item should have: 
	id
title(which is viewed on a board-view and in modal)
description(only in modal)
due date(which is viewed on a board-view and in modal)
*attachments(images upload, viewed only in modal)
Group-item should have: 
	id
 	title
User should have: 
 	name
	email
Modal	opens by click on task by authorized user;
When unauthorized user clicks on tasks modal contains a log-in/register form

Authorization should be implemented with jwt-tokens. 
*Authorization with social network(google+, facebook, twitter, etc);

As a result you have to provide(on your choice) 
	-zip-folder with application 
	-link on github/bitbucket repository 

Important note:
Should have a README.md file with all instructions on how to build and run your app.
Writing tests(unit, integration, etc) is a big plus.	
Additional tasks marked with * (completing them is a plus)
