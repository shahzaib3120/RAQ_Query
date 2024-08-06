# user.py
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from app.database.schemas.base import Base
from app.database.schemas.favorite_books import favorite_books

class User(Base):
    __tablename__ = 'users'
    email = Column('email', String(100), primary_key=True)
    fname = Column('fname', String(50))
    lname = Column('lname', String(50))
    hashed_pw = Column(String(100), nullable=False)
    role = Column('role', Integer)

    favorite_books = relationship('Book', secondary=favorite_books, back_populates='fans')
