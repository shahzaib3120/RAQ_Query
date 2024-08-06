# favorite_books.py
from sqlalchemy import Table, Column, Integer, ForeignKey, String
from app.database.schemas.base import Base

# Define the association table
favorite_books = Table(
    'favorite_books',
    Base.metadata,
    Column('user_email', String(100), ForeignKey('users.email'), primary_key=True),
    Column('book_id', Integer, ForeignKey('books.id'), primary_key=True)
)
