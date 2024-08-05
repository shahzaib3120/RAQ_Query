from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    fname: str
    lname: str
    email: str
    password: str
    role: int = Field(default=0)  # Set default value for role


class UserUpdateCurrent(BaseModel):
    fname: Optional[str] = None
    lname: Optional[str] = None
    password: Optional[str] = None