Postgres user:

username: postgres

password: postgres

- Create postgres database in psql

```
CREATE DATABASE test;
```

- Activate Python Environment
- Run alembic migrations

```
alembic upgrade head
```

- Load Data into DB

```
python app/pgAdmin4/SavetoDB.py
```

- Load Data into VectorDB

```
python app/pgAdmin4/SaveDataToVectorStore.py
```

- Run FastAPI

```
python api.py
```

- Run web app

```
cd web
npm install
npm run start
```
