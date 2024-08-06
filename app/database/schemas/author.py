from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from app.database.schemas.base import Base

class Author(Base):
    __tablename__ = 'authors'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)  

    books = relationship("Book", secondary="book_author_association", back_populates="authors", lazy="select")
    
    def __repr__(self):
        return f"id: {self.id}, name: {self.name}"
