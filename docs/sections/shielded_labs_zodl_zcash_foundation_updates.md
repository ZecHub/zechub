import requests
from typing import List, Dict

# Constants for logging levels
LOG_LEVELS = {
    "INFO": 1,
    "WARNING": 2,
    "ERROR": 3
}

class LinkCuration:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.headers = {
            "User-Agent": "ZcashEcosystemDigest/0.1"
        }
        self.logger = Logger()

    def fetch_links(self) -> Dict[str, List[str]]:
        try:
            response = requests.get(f"{self.base_url}/links", headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            self.logger.log("ERROR", f"Failed to fetch links: {e}")
            return {}

    def validate_links(self, links: Dict[str, List[str]]) -> bool:
        required_sections = ["Shielded Labs", "ZODL", "Zcash Foundation Updates", "Zcash Community Grants", "Community Projects"]
        for section in required_sections:
            if section not in links or not links[section]:
                self.logger.log("WARNING", f"Missing or empty section: {section}")
                return False
        return True

    def format_links(self, links: Dict[str, List[str]]) -> str:
        formatted_text = "# Zcash Ecosystem Digest | June 13th Submission \n\n"
        for section, items in links.items():
            formatted_text += f"## {section}\n\n"
            for item in items:
                formatted_text += f"- [{item['title']}](<{item['url']}>)\n"
            formatted_text += "\n---\n\n"
        return formatted_text

    def submit_document(self, document: str) -> bool:
        try:
            response = requests.post(f"{self.base_url}/submit", data=document, headers=self.headers)
            response.raise_for_status()
            self.logger.log("INFO", "Document submitted successfully")
            return True
        except requests.RequestException as e:
            self.logger.log("ERROR", f"Failed to submit document: {e}")
            return False

class Logger:
    def log(self, level: str, message: str):
        if LOG_LEVELS[level] >= LOG_LEVELS["INFO"]:
            print(f"{level}: {message}")

# Example usage
if __name__ == "__main__":
    curation = LinkCuration("https://api.zecdigest.com")
    links = curation.fetch_links()
    if curation.validate_links(links):
        document = curation.format_links(links)
        curation.submit_document(document)