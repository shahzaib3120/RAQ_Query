from app.database.connector import connect_to_db
from app.database.schemas.author import Author
from app.database.schemas.book_author_association import book_author_association

def get_db_session():
    _, SessionLocal = connect_to_db()
    return SessionLocal()

def repair_author_book_associations():
    with get_db_session() as db:
        # Find all authors and their books
        authors = db.query(Author).all()
        for author in authors:
            for book in author.books:
                association_exists = db.query(book_author_association).filter_by(
                    book_id=book.id, author_id=author.id).first()
                if not association_exists:
                    # Insert the missing association
                    db.execute(book_author_association.insert().values(book_id=book.id, author_id=author.id))
        db.commit()
        
if __name__ == "__main__":
    repair_author_book_associations()