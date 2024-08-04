from sqlalchemy.orm import relationship
from app.database.schemas.book_author_association import book_author_association
from sqlalchemy import Column, String, Integer, Text
from app.database.schemas.base import Base

class Author(Base):
    __tablename__ = 'authors'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    # Relationship to Book
    books = relationship("Book", secondary="book_author_association", back_populates="authors", lazy="select")
    
    def __repr__(self):
        return f"id: {self.id}, name: {self.name}"
