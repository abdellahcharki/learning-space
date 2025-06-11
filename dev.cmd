@echo off
start cmd /k nodemon app
start  http://localhost:8040/
sass ./public/sass/style.scss ./public/css/style.css --watch