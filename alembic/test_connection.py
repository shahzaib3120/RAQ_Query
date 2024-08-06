from sqlalchemy import create_engine

DATABASE_URL = "postgresql+psycopg2://postgres:123@127.0.0.1:5432/test"

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as connection:
        print("Connection successful!")
except Exception as e:
    print(f"Connection failed: {e}")
