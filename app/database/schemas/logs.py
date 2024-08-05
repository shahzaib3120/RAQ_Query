from sqlalchemy import Column, String, Integer, DateTime, Text, Sequence
from datetime import datetime, timezone
from app.database.schemas.base import Base

class RequestLog(Base):
    __tablename__ = 'request_logs'
    
    id = Column(Integer, Sequence('request_log_id_seq'), primary_key=True, autoincrement=True)
    endpoint = Column(String(255), nullable=False)
    method = Column(String(10), nullable=False)
    request_body = Column(Text, nullable=True)
    timestamp = Column(DateTime(timezone=True), default=datetime.now(timezone.utc), nullable=False)
