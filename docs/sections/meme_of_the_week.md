import requests
from typing import Dict, List, Optional
import logging
from datetime import timedelta

# Constants
BASE_URL = "https://api.zechub.xyz"
COMMUNITY_PROJECTS = [
    "Zcash Espanol", "Zcash Brazil", "Zcash Turkey", "Zcash Ukraine", 
    "Zcash East Africa", "Zcash Korea", "Zcash Nigeria", "ruZcash", 
    "genzcash", "ZKAV Club", "Electric Coin Company (ECC)", "Zcash Foundation", 
    "ZecHub", "Zcast", "Zcash Community Forum"
]

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_latest_updates(projects: List[str]) -> Dict[str, str]:
    updates = {}
    for project in projects:
        try:
            response = requests.get(f"{BASE_URL}/{project.lower()}/latest")
            response.raise_for_status()
            updates[project] = response.json().get('url', 'No URL found')
        except requests.RequestException as e:
            logging.error(f"Failed to fetch update for {project}: {e}")
    return updates

def get_meme_of_the_week():
    try:
        response = requests.get(f"{BASE_URL}/meme-of-the-week")
        response.raise_for_status()
        meme_info = response.json()
        return meme_info['caption'], meme_info['image_url']
    except requests.RequestException as e:
        logging.error(f"Failed to fetch Meme of the Week: {e}")
        return "No meme available", None

def generate_digest() -> str:
    # Shielded Labs, ZODL, Zcash Foundation Updates
    updates = fetch_latest_updates(["Shielded Labs", "ZODL", "Zcash Foundation"])
    digest = f"## Shielded Labs, ZODL, Zcash Foundation Updates\n"
    for project, url in updates.items():
        digest += f"- **{project}**: [{url}]({url})\n"

    # Community Grants
    grants = fetch_latest_updates(["ZecHub", "Zcash Brasil", "Zcash Turkey"])
    digest += "\n## Zcash Community Grants\n"
    for project, url in grants.items():
        digest += f"- **{project}**: [{url}]({url})\n"

    # Community Projects
    digest += "\n## Community Projects\n"
    for project in COMMUNITY_PROJECTS:
        try:
            response = requests.get(f"{BASE_URL}/{project.lower()}/overview")
            response.raise_for_status()
            project_info = response.json()
            digest += f"- **{project}**: [{project_info['title']}]({project_info['url']})\n"
        except requests.RequestException as e:
            logging.error(f"Failed to fetch overview for {project}: {e}")

    # Meme of the Week
    caption, image_url = get_meme_of_the_week()
    digest += f"\n## Meme of the Week\n**Caption:** {caption}\n[Meme Image Link]({image_url})"

    return digest

if __name__ == "__main__":
    print(generate_digest())