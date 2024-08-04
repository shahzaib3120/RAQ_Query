from pydantic import BaseModel
from typing import Optional

from pydantic import BaseModel, Field
from typing import Optional

class Book(BaseModel):
    title: str
    subtitle: Optional[str] = None
    genre: Optional[str] = None
    published_year: Optional[int] = None
    description: Optional[str] = None
    average_rating: Optional[float] = None
    num_pages: Optional[int] = None
    ratings_count: Optional[int] = None
    thumbnail: Optional[str] = None
    author_id: Optional[int] = None

class BookUpdateCurrent(BaseModel):
    title: Optional[str] = None
    author_id: Optional[str] = None
    genre: Optional[str] = None
    description: Optional[str] = None
    year: Optional[int] = None