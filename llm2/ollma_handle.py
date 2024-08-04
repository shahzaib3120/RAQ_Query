from typing import Dict, Optional
from app.database.schemas.books import Book
from app.database.schemas.author import Author
from intent_extraction import IntentExtractor
from vector_data_manager import VectorDataManager
from chromadb.config import Settings

def handle_user_query(description: str, intent_response: IntentExtractor, db) -> Dict[str, str]:
    if not intent_response.entity_name and intent_response.intent_number not in [0, 5]:
        return {"response": "No entity name provided."}

    print(f"Handling query: {description} with intent {intent_response.intent_number} and entity {intent_response.entity_name}")

    try:
        if intent_response.intent_number == 1:  # Get Book Information
            return get_book_info(intent_response.entity_name, db)
        elif intent_response.intent_number == 2:  # Get Author Information
            return get_author_info(intent_response.entity_name, db)
        elif intent_response.intent_number == 3:  # Summarize Book
            return summarize_book(intent_response.entity_name, db)
        elif intent_response.intent_number == 4:  # Recommend Books
            return recommend_books(intent_response.entity_name, db, num_recommendations=intent_response.num_recommendations)
        elif intent_response.intent_number == 5:  # General book chat
            return {"response": "I'm here to chat about books! Do you have any book-related questions?"}
        else:
            return {"response": "I'm here to assist with book information and recommendations. Let me know how I can help!"}
    except Exception as e:
        print(f"Error processing query: {str(e)}")
        return {"response": f"Error processing query: {str(e)}"}

def get_book_info(entity_name: str, db) -> Dict[str, str]:
    print(f"Fetching book info for: {entity_name}")
    book = db.query(Book).filter(Book.title.ilike(f"%{entity_name}%")).first()
    if book:
        response = (
            f"Book Title: {book.title}\n"
            f"Author(s): {', '.join([author.name for author in book.authors])}\n"
            f"Published Year: {book.published_year}\n"
            f"Genre: {book.genre}\n"  # Corrected attribute
            f"Summary: {book.description}"
        )
        print(f"Generated response: {response}")
        return {"response": response}
    return {"response": "No information found for the specified book."}

def get_author_info(entity_name: str, db) -> Dict[str, str]:
    print(f"Fetching author info for: {entity_name}")
    author = db.query(Author).filter(Author.name.ilike(f"%{entity_name}%")).first()
    if author:
        book_titles = ', '.join(book.title for book in author.books)
        response = (
            f"Author Name: {author.name}\n"
            f"Books: {book_titles}\n"
        )
        return {"response": response}
    return {"response": "No information found for the specified author."}

def summarize_book(entity_name: str, db) -> Dict[str, str]:
    print(f"Summarizing book: {entity_name}")
    book = db.query(Book).filter(Book.title.ilike(f"%{entity_name}%")).first()
    if book:
        summary = book.description
        return {"response": f"Summary of {book.title}:\n{summary}"}
    return {"response": "No summary found for the specified book."}

def recommend_books(entity_name: str, db, num_recommendations: int = 2) -> Dict[str, str]:
    print(f"Recommending {num_recommendations} books based on: {entity_name}")
    vector_manager = VectorDataManager()
    recommended_titles = vector_manager.recommend_books(entity_name, num_recommendations)

    if not recommended_titles:
        return {"response": "No recommendations found."}

    book_details = []
    for title in recommended_titles[:num_recommendations]:  # Limit to requested number
        book = db.query(Book).filter(Book.title == title).first()
        if book:
            book_details.append({
                "title": book.title,
                "description": book.description,
                "published_year": book.published_year,
                "average_rating": book.average_rating,
                "num_pages": book.num_pages,
                "ratings_count": book.ratings_count
            })

    if book_details:
        response = f"Recommended {len(book_details)} Books:\n" + "\n".join(
            f"Title: {book['title']}\nDescription: {book['description']}\nPublished Year: {book['published_year']}\nAverage Rating: {book['average_rating']}\nNumber of Pages: {book['num_pages']}\nRatings Count: {book['ratings_count']}\n"
            for book in book_details
        )
        return {"response": response}
    else:
        return {"response": "No detailed information found for the recommendations."}
