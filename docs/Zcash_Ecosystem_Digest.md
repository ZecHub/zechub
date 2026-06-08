import requests
from typing import List, Dict, Any
from datetime import datetime
import logging

# Constants for the Zcash ecosystem links
ECOSYSTEM_PROJECTS = [
    "Zcash Espanol", "Zcash Brazil", "Zcash Turkey", "Zcash Ukraine",
    "Zcash East Africa", "Zcash Korea", "Zcash Nigeria", "ruZcash",
    "genzcash", "ZKAV Club", "Electric Coin Company", "Zcash Foundation",
    "ZecHub", "Zcast", "Zcash Community Forum"
]

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_recent_updates(url: str) -> Dict[str, Any]:
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()  # Assuming the responses are in JSON format
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching updates from {url}: {e}")
        return {}

def generate_ecosystem_digest() -> str:
    digest = "# Zcash Ecosystem Digest | June 13th Submission\n"
    
    # Shielded Labs, ZODL, Zcash Foundation Updates
    shielded_labs_updates = fetch_recent_updates("https://shieldedlabs.org/updates")
    zodl_progress = fetch_recent_updates("https://zodl.io/status")
    zcash_foundation_newsletter = fetch_recent_updates("https://foundation.zcash.org/newsletter")
    
    digest += "## Shielded Labs, ZODL, Zcash Foundation Updates:\n"
    digest += f"- **Shielded Labs Update**: [Link]({shielded_labs_updates.get('url', 'N/A')})\n"
    digest += f"- **ZODL Progress Report**: [Link]({zodl_progress.get('url', 'N/A')})\n"
    digest += f"- **Zcash Foundation Newsletter**: [Link]({zcash_foundation_newsletter.get('url', 'N/A')})\n"
    
    # Zcash Community Grants
    grants_roundup = fetch_recent_updates("https://zcashfoundation.org/grants/roundup")
    grants_blog_post = fetch_recent_updates("https://blog.zecdao.org/grant-round-up")
    community_funding_opportunities = fetch_recent_updates("https://zcashcommunityfund.org/funding-requests")
    
    digest += "## Zcash Community Grants:\n"
    digest += f"- **Grant Program Roundup**: [Link]({grants_roundup.get('url', 'N/A')})\n"
    digest += f"- **Grants Blog Post**: [Link]({grants_blog_post.get('url', 'N/A')})\n"
    digest += f"- **Community Funding Opportunities**: [Link]({community_funding_opportunities.get('url', 'N/A')})\n"
    
    # Community Projects
    community_projects = [
        {"name": "Zcash Espanol", "url": "https://zecash.es/noticias/"},
        {"name": "Zcash Brazil News", "url": "https://www.zcashbrasil.org.br/category/noticias/"},
        {"name": "Zcash Turkey Updates", "url": "https://zecashtr.com/tr/bultenler"},
        {"name": "Zcash Ukraine News", "url": "https://zecash-ua.org.ua/updates/"},
        {"name": "Zcash East Africa Updates", "url": "https://zeceastafrika.org/category/news/"},
        {"name": "Zcash Korea News", "url": "https://zecashkorea.com/category/news/"},
        {"name": "Zcash Nigeria Updates", "url": "https://zecashng.org/category/news/"},
        {"name": "ruZcash News", "url": "https://ruzcash.ru/новости/"},
        {"name": "genzcash Updates", "url": "https://genzcash.com/blog/"},
        {"name": "ZKAV Club News", "url": "https://zka club.org/news/"},
        {"name": "Electric Coin Company Blog Posts", "url": "https://electriccoin.co/blog"},
        {"name": "ZecHub Updates", "url": "https://zechub.io/blog/"},
        {"name": "Zcast News", "url": "https://zcast.co/blog"}
    ]
    
    digest += "## Community Projects:\n"
    for project in community_projects:
        digest += f"- **{project['name']}**: [Link]({project['url']})\n"
    
    # Meme and Humor
    memes = fetch_recent_updates("https://www.reddit.com/r/ZcashMemes/")
    zcash_humor = fetch_recent_updates("https://zecash.org/humor/")
    community_jokes = fetch_recent_updates("https://www.reddit.com/r/ZcashCommunityJokes/")
    privacy_tech_humor = fetch_recent_updates("https://www.reddit.com/r/PrivacyTechHumor/")
    zcash_nerd_humor = fetch_recent_updates("https://www.youtube.com/results?search_query=zcash+nerd+humor")
    community_comedy = fetch_recent_updates("https://www.reddit.com/r/ZcashCommunityComedy/")
    privacy_tech_humor_series = fetch_recent_updates("https://www.youtube.com/results?search_query=privacy+tech+humor+series")
    
    digest += "## Meme and Humor:\n"
    digest += f"- **Funny Zcash Memes**: [Link]({memes.get('url', 'N/A')})\n"
    digest += f"- **Zcash Humor**: [Link]({zcash_humor.get('url', 'N/A')})\n"
    digest += f"- **Zcash Community Jokes**: [Link]({community_jokes.get('url', 'N/A')})\n"
    digest += f"- **Privacy Tech Humor**: [Link]({privacy_tech_humor.get('url', 'N/A')})\n"
    digest += f"- **Zcash Nerd Humor**: [Link]({zcash_nerd_humor.get('url', 'N/A')})\n"
    digest += f"- **Zcash Community Comedy**: [Link]({community_comedy.get('url', 'N/A')})\n"
    digest += f"- **Privacy Tech Humor Series**: [Link]({privacy_tech_humor_series.get('url', 'N/A')})\n"
    
    # Miscellaneous
    events = fetch_recent_updates("https://zecashcommunityfund.org/events/")
    zcash_community_projects = fetch_recent_updates("https://www.zcprojects.com/")
    privacy_tech_news = fetch_recent_updates("https://www.privacynews.co/")
    zcash_community_forum = fetch_recent_updates("https://zcashcommunity.org/forum/")
    
    digest += "## Miscellaneous:\n"
    digest += f"- **Zcash Events**: [Link]({events.get('url', 'N/A')})\n"
    digest += f"- **Zcash Community Projects**: [Link]({zcash_community_projects.get('url', 'N/A')})\n"
    digest += f"- **Privacy Tech News**: [Link]({privacy_tech_news.get('url', 'N/A')})\n"
    digest += f"- **Zcash Community Forum**: [Link]({zcash_community_forum.get('url', 'N/A')})\n"
    
    return digest

# Generate and print the digest
digest = generate_ecosystem_digest()
print(digest)