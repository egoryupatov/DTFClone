Hi! This is one of the apps I developed as a pet project to acquire new skills and strengthen the ones I already have.

## App description

Full-fledged blog app (frontend + backend + database). A clone of really existing blog.

## App features

The app features:

1) Authorization (JWT token)
2) Routes protection (Guards)
3) Blog post CRUD operations
4) UserContainer rating system (rating of posts and comments published by a user affects their overall rating in the profile)
5) Comments and nested comments
6) SearchContainer
7) Hidden posts (if you’re logged in, you can hide posts and unhide them in the dashboard)
8) UserContainer dashboard
9) Infinity scroll of posts and comments

## Used technologies

* Language - JavaScript/TypeScript
* Front end framework/library - Next 13
* Back end framework/library - Nest.js
* State management - Redux
* CSS - SASS
* Database - PostgreSQL

## How to run the app on your local machine

First, you'll need to create a MySQL database:

1) Install and launch PostgreSQL on your local machine using your favorite way
2) Create a database with the following configuration:
    1) host: `localhost`,
    2) username: `postges`,
    3) port: `5432`,
    5) database: `blog_pg`,
3) Connect to your new database using your favorite database tool (e.g. DBeaver)
4) Create at least one record in the following tables:
    1) Category - available blog post categories
    2) Users - existing users and blog post authors
    3) Blog_post - existing blog posts (don't forget to select relations with a user and category)
    4) Comments - existing comments (don't forget to select relations with a user and blog post / you can also add relations between existing comments to create nested ones)

The second step is to start the server:

1) Navigate into the server directory
2) Install the dependencies using one of the following commands: `npm install` or `yarn install`
3) Start the server using one of the following commands: `npm start` or `yarn start`

The final step is to start the app itself:

1) Navigate into the app directory
2) Install the dependencies using one of the following commands: `npm install` or `yarn install`
3) Start the app using one of the following commands: `npm run dev`

## Authorization details

You can authorize into the application using the credentials of one of the users you added to your database in the very first step
