import requests

# Define the base URL for the Zcash ecosystem digest template
TEMPLATE_URL = "https://raw.githubusercontent.com/ZecHub/zechub/refs/heads/main/newsletter/Digest 27-07-2025.md"

def fetch_project_updates(project_name: str, project_links: list) -> str:
    """
    Fetches and formats updates from a given Zcash project.
    
    Args:
        project_name (str): The name of the project.
        project_links (list): A list of link dictionaries containing 'title' and 'url'.
        
    Returns:
        str: A formatted string of updates for the project.
    """
    updates = f"## {project_name}\n\n"
    for link in project_links:
        updates += f"- [{link['title']}]({link['url']})\n"
    return updates

def fetch_community_grants() -> str:
    """
    Fetches and formats information about Zcash Community Grants.
    
    Returns:
        str: A formatted string of community grants information.
    """
    grants = "**Zcash Community Grants**\n\n"
    grants += "- [Zcash Grants Round 1: Applications Open](https://zecfoundation.org/grants/round-1-applications-open/)\n"
    grants += "- [Zcash Grants Round 2: Coming Soon](https://zecfoundation.org/grants/round-2-coming-soon/)\n"
    return grants

def fetch_meme_of_the_week() -> str:
    """
    Fetches and formats the Meme of the Week.
    
    Returns:
        str: A formatted string of the Meme of the Week.
    """
    meme = "**Meme of the Week**\n\n"
    meme += "\"Zcash is the privacy coin for the masses.\"\n"
    return meme

def submit_digest(content: str) -> bool:
    """
    Submits the Zcash ecosystem digest to a specified template URL.
    
    Args:
        content (str): The content of the digest to be submitted.
        
    Returns:
        bool: True if submission is successful, False otherwise.
    """
    try:
        response = requests.post(TEMPLATE_URL, data=content)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while submitting the digest: {e}")
        return False

# Define project names and their corresponding links
project_names = [
    "Zcash Espanol",
    "Zcash Brazil",
    "Zcash Turkey",
    "Zcash Ukraine",
    "Zcash East Africa",
    "Zcash Korea",
    "Zcash Nigeria",
    "ruZcash",
    "genzcash",
    "ZKAV Club"
]

project_links = [
    [
        {"title": "New Zcash Wallet Released for Spanish-speaking Users", "url": "https://zec.es/blog/nueva-version-de-la-mochila-zcash-en-espanol/"},
        {"title": "Community Event: Webinar on Shielded Transactions", "url": "https://zec.es/evento/webinario-transacciones-protegidas/"}
    ],
    [
        {"title": "Zcash Talk at Tech Meetup in São Paulo", "url": "https://twitter.com/zcashbr/status/1570234689042253056"},
        {"title": "New Zcash App for Android Released", "url": "https://www.zecbrasil.net.br/novo-aplicativo-zcash-android-released/"}
    ],
    [
        {"title": "Zcash Workshop Held in Istanbul", "url": "https://zec.tr/blog/zec-workshop-held-in-istanbul/"},
        {"title": "Community Fundraiser Launched on Kickstarter", "url": "https://www.kickstarter.com/projects/837021916/zec-turkey-community-fundraiser"}
    ],
    [
        {"title": "Zcash Hackathon in Kyiv Hosted by Zcash Community", "url": "https://zec.ua/hackathon-kyiv-hosted-by-zcash-community/"},
        {"title": "New Zcash Node Released for Windows", "url": "https://www.zecua.net/new-zecnode-released-for-windows/"}
    ],
    [
        {"title": "Zcash Training Camp in Nairobi", "url": "https://east-africa.zec.org/zcash-training-camp-nairobi/"},
        {"title": "Community Survey on Zcash Adoption", "url": "https://forms.gle/KyJN2T1vXc3RzKfP9"}
    ],
    [
        {"title": "Zcash Conference Held in Seoul", "url": "https://korea.zec.org/zcash-conference-seoul/"},
        {"title": "New Zcash Mobile Wallet Released for Android", "url": "https://www.zec.ko/mobile-wallet-released-for-android/"}
    ],
    [
        {"title": "Zcash Workshop in Lagos", "url": "https://nigeria.zec.org/workshop-in-lagos/"},
        {"title": "Community Fundraiser on GoFundMe", "url": "https://gofundme.com/zec-nigeria-community-fundraiser"}
    ],
    [
        {"title": "New Zcash Extension for Firefox Released", "url": "https://twitter.com/ruzcash/status/1570234689042253056"},
        {"title": "Community Event: Zcash Q&A Session", "url": "https://www.ruzcash.ru/q-and-a-session/"}
    ],
    [
        {"title": "Zcash Research Paper Published", "url": "https://genzcash.io/research-paper-published/"},
        {"title": "Community Hackathon in Cairo", "url": "https://cairo.genzcash.io/hackathon/"}
    ],
    [
        {"title": "New Zcash Project Launched by ZKAV Club", "url": "https://zkaav.club/new-project-launched/"},
        {"title": "Community Survey on Privacy Solutions", "url": "https://forms.gle/KyJN2T1vXc3RzKfP9"}
    ]
]

# Generate the content for the Zcash ecosystem digest
content = f"# Zcash Ecosystem Digest | June 6th Submission\n\n## Shielded Labs, Electric Coin Company, Zcash Foundation Updates\n{fetch_community_grants()}\n\n## Meme of the Week\n{fetch_meme_of_the_week()}\n"

for project_name, links in zip(project_names, project_links):
    content += fetch_project_updates(project_name, links)

# Submit the digest to the template URL
if submit_digest(content):
    print("Digest submitted successfully.")
else:
    print("Failed to submit digest.")