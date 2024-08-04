import pandas as pd
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings
import os

from llm2.vector_data_manager import VectorDataManager

# Initialize the ChromaDB PersistentClient
client = chromadb.PersistentClient(
    path="chroma_db", 
    settings=Settings(),
)

# Create or get a collection within ChromaDB
collection = client.get_or_create_collection(name="book_collection")

def store_books_in_vectorDB():
    # Load the transformer model for encoding
    model = SentenceTransformer('all-MiniLM-L6-v2')
    # Read the required columns from the CSV
    curr_dir = os.path.dirname(os.path.abspath(__file__))
    books_path = os.path.join(curr_dir, '../../books.csv')
    df = pd.read_csv(books_path)

    # Normalize column names
    df.columns = df.columns.str.strip().str.lower()
    documents = []
    metadatas = []
    ids = []
    # Iterate over rows to process each book
    for index, row in df.iterrows():
        # Concatenate text fields for vector encoding
        text = f"{row['title']}; {row['authors']}; {row['categories']}; {row['description']}"
        # Prepare metadata for the book
        metadata = {
            'isbn13': row['isbn13'],
            'isbn10': row['isbn10'],
            'title': row['title'],
            'subtitle': row['subtitle'],
            'authors': row['authors'],
            'categories': row['categories'],
            'thumbnail': row['thumbnail'],
            'description': row['description'],
            'published_year': row['published_year'],
            'average_rating': row['average_rating'],
            'num_pages': row['num_pages'],
            'ratings_count': row['ratings_count']
        }
        documents.append(text)
        metadatas.append(metadata)
        ids.append(str(row['isbn13']))
        print(f"Processed book: {row['title']}")
        # Add the book to the collection
    collection.add(
        documents=documents,
        ids=ids,  # Use ISBN13 as a unique identifier
        metadatas=metadatas
    )

def main():
    store_books_in_vectorDB()
    print("Books have been successfully added to the ChromaDB collection.")

if __name__ == '__main__':
    main()

def similarity_text(query: str):
    vector_manager = VectorDataManager()
    return vector_manager.recommend_books(query)
