# RealEstateManager

Db Schema : https://dbdiagram.io/d/RealEstateManager-68465ed70580734397556b91

## Start frontend

1. npm run dev

## Start backend

1. Run Postgres container
docker start 955

2. Run Spring application

docker run --name RealEstateManager            -e POSTGRES_DB=myapp_db            -e POSTGRES_USER=myapp_user            -e POSTGRES_PASSWORD=strongpassword            -p 5432:5432 \