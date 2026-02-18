from pymongo import MongoClient
import os

# Using the URI from your backend .env file
MONGO_URI = "mongodb://127.0.0.1:27017/assets-management"

def test_connection():
    try:
        # Initialize client
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        
        # Check connection
        client.server_info()
        db = client.get_database()
        
        print(f"Successfully connected to MongoDB!")
        print(f"Database: {db.name}")
        
        # List collections
        collections = db.list_collection_names()
        print(f"Collections in database: {collections}")
        
        # Count documents in hardware collection as a test
        if 'hardwares' in collections:
            count = db.hardwares.count_documents({})
            print(f"Total hardware assets: {count}")

    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        print("Make sure:")
        print("1. MongoDB is running on localhost:27017")
        print("2. You have installed pymongo: pip install pymongo")

if __name__ == "__main__":
    test_connection()
