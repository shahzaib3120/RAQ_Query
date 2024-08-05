from datetime import datetime, timedelta
from typing import Optional
import jwt
from app.config import SECRET_KEY, ALGORITHM

def create_access_token(data: dict, expires_delta: Optional[timedelta] = timedelta(minutes=15)):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta  # Use UTC time
        expire_readable = expire.strftime("%Y-%m-%d %H:%M:%S")
        print(f"Token will expire at: {expire_readable} UTC")
        to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user: str = payload.get("sub")
        return user
    except jwt.PyJWTError as e:
        print(f"Token verification error: {e}")
        return None
