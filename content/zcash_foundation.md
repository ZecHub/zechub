import requests
from typing import List, Dict, Any
import logging

# Constants
TEMPLATE_URL = "https://raw.githubusercontent.com/ZecHub/zechub/refs/heads/main/newsletter/Digest 27-07-2025.md"
BOUNTY = 0.08

# Error handling and logging
logging.basicConfig(level=logging.INFO)

def fetch_template() -> str:
    """
    Fetches the template document from the given URL.
    
    Returns:
        str: The fetched template content.
    
    Raises:
        requests.RequestException: If an error occurs during the request.
    """
    try:
        response = requests.get(TEMPLATE_URL)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        logging.error(f"Failed to fetch template: {e}")
        raise

def update_template(template: str, updates: Dict[str, List[Dict]]) -> str:
    """
    Updates the template with the latest content.
    
    Args:
        template (str): The original template content.
        updates (Dict[str, List[Dict]]): A dictionary containing sections and their respective projects.
        
    Returns:
        str: The updated document.
    """
    updated_content = f"{template}\n\n## Updates\n{format_updates(updates)}"
    return updated_content

def format_updates(updates: Dict[str, List[Dict]]) -> str:
    """
    Formats the updates into a string for insertion into the template.
    
    Args:
        updates (Dict[str, List[Dict]]): A dictionary containing sections and their respective projects.
        
    Returns:
        str: The formatted update content.
    """
    formatted_updates = ""
    for section, projects in updates.items():
        formatted_updates += f"### {section}\n"
        for project in projects:
            formatted_updates += f"* **Project**: [{project['name']}](<{project['link']}>)\n"
            formatted_updates += f"* **Description**: {project['description']}\n"
            formatted_updates += f"* **Activity**: {project['activity']}\n\n"
    return formatted_updates

def submit_document(document: str) -> bool:
    """
    Submits the updated document to the template URL.
    
    Args:
        document (str): The updated document content.
        
    Returns:
        bool: True if submission is successful, False otherwise.
    """
    try:
        response = requests.post(TEMPLATE_URL, data=document)
        response.raise_for_status()
        logging.info("Document submitted successfully")
        return True
    except requests.RequestException as e:
        logging.error(f"Failed to submit document: {e}")
        return False

def main() -> None:
    template = fetch_template()

    updates: Dict[str, List[Dict[str, Any]]] = {
        "Shielded Labs, Electric Coin Company, Zcash Foundation Updates": [
            {
                "name": "Privacy Preserving Blockchain Solutions",
                "link": "https://www.shieldedlabs.com/",
                "description": "Development of advanced privacy solutions for the blockchain industry.",
                "activity": "Enhancing security protocols and improving user experience."
            }
        ],
        "Zcash Community Grants": [
            {
                "name": "Zcash Espanol",
                "link": "https://zec.es/",
                "description": "Spanish-language community group for Zcash users in Spain.",
                "activity": "Launched a new forum section dedicated to the latest developments."
            }
        ],
        # Add more sections and projects as needed
    }

    updated_document = update_template(template, updates)
    submit_document(updated_document)

if __name__ == "__main__":
    main()