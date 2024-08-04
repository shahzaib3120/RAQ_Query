# import streamlit as st
# from intent_extraction import IntentExtractor
# from ollma_handle import handle_user_query
# from app.database.connector import connect_to_db
# from llm2.langgraph_integration import app

# def get_db_session():
#     _, SessionLocal = connect_to_db()
#     return SessionLocal()

# def main():
#     st.title("Book Information System")

#     user_input = st.text_input("Enter your query:")

#     if st.button("Submit"):
#         if user_input:
            
#             model_input = {
#                 "question": user_input,
#             }
            
#             result = app.invoke(model_input)
#             # print(result["response"])
#             st.write(result.get('response', 'No response generated.'))
            
#             # ollama Handle
#             # # Create an instance of IntentExtractor
#             # intent_extractor = IntentExtractor()
            
#             # # Extract intent and entity from the user's query
#             # intent_response = intent_extractor.classify_intent_and_extract_entities(user_input)
            
#             # # Print for debugging
#             # print(f"Extracted Intent: {intent_response.intent_number}, Entity: {intent_response.entity_name}")
            
#             # # Create a new database session
#             # db = get_db_session()

#             # try:
#             #     # Call the function with all required arguments
#             #     result = handle_user_query(description=user_input, intent_response=intent_response, db=db)
#             #     # Display the result
#             #     st.write(result.get('response', 'No response generated.'))
#             # finally:
#             #     # Ensure the database session is closed
#             #     db.close()

# if __name__ == "__main__":
#     main()
