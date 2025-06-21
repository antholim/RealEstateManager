# RealEstateManager

Db Schema : https://dbdiagram.io/d/RealEstateManager-68465ed70580734397556b91

Open Windows Powershell

Navigate to root project directory

## Start frontend

1. ```npm run dev``` in ./Frontend

## Start backend

1. Docker compose in WSL Ubuntu

```wsl start``` in Windows Powershell in ./Backend

```docker compose up -d```

```docker exec -it postgresql psql -U admin -d RealEstateManagerDB``` (Optional)

2. Run Spring application