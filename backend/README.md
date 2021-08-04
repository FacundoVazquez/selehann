# Backend

## Description

Application's backend using NestJS as framework and TypeORM as ORM (Object-Relational mapping) for SQL Database.

## Installation

```bash
$ cd ../salehann/backend
$ yarn
```

## **Important: requires a MySQL instance to connect. Also needs to create a database called 'selehann'**

#

## Running the app

```bash
# development (port 3000)
$ yarn start

# production mode
$ yarn start:prod
```

## Running the app with docker

```bash
$ docker build -t selehann_backend .

$ docker-compose up -d

#Create database (from host terminal)

$ docker exec -it mysql-db mysql -p

# Then enter password 'root'

mysql> create database selehann;
```

## Test

```bash
# (some) unit tests
$ yarn test
```

## Swagger

http://localhost:3000/api/swagger/
