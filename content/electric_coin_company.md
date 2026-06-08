from typing import List, Dict, Any, Optional
import requests

def fetch_links(categories: List[str], community_projects: List[str]) -> Dict[str, List[Any]]:
    """
    Fetches links for the given categories and community projects.
    
    Args:
        categories (List[str]): List of category names to fetch links for.
        community_projects (List[str]): List of community project names to fetch links for.

    Returns:
        Dict[str, List[Any]]: Dictionary containing fetched data by category and community project.
    """
    base_url = "https://raw.githubusercontent.com/ZecHub/zechub/refs/heads/main/newsletter/"
    links_data = {}
    
    # Fetching Shielded Labs, Electric Coin Company, Zcash Foundation Updates
    shielded_labs_response = requests.get(f"{base_url}Digest 27-07-2025.md#shielded-labs-electric-coin-company-zcash-foundation-updates")
    if shielded_labs_response.status_code == 200:
        links_data["Shielded Labs, Electric Coin Company, Zcash Foundation Updates"] = parse_markdown_links(shielded_labs_response.text)
    
    # Fetching Community Projects
    community_projects_response = requests.get(f"{base_url}Digest 27-07-2025.md#community-projects")
    if community_projects_response.status_code == 200:
        links_data["Community Projects"] = parse_markdown_links(community_projects_response.text)
    
    return links_data

def parse_markdown_links(markdown_text: str) -> List[Dict[str, Any]]:
    """
    Parses Markdown text to extract link information.
    
    Args:
        markdown_text (str): The Markdown text containing link data.

    Returns:
        List[Dict[str, Any]]: Extracted link data as a list of dictionaries.
    """
    links = []
    in_list = False
    current_item: Optional[Dict[str, str]] = None
    
    for line in markdown_text.split('\n'):
        if line.strip().startswith('1.'):
            if current_item:
                links.append(current_item)
            current_item = {'text': '', 'url': ''}
            in_list = True
        elif line.startswith('-') and 'Link:' in line:
            link_parts = line.split(':')
            if len(link_parts) > 1:
                current_item['url'] = link_parts[1].strip().split()[0]
        else:
            if in_list:
                current_item['text'] += line.strip() + '\n'
    
    if current_item:
        links.append(current_item)
    
    return links

def save_to_template(data: Dict[str, List[Any]], output_file: str) -> None:
    """
    Saves the data to a template file.
    
    Args:
        data (Dict[str, List[Any]]): The data to be saved.
        output_file (str): The path to the output file.
    """
    with open(output_file, 'w') as f:
        for category, items in data.items():
            f.write(f"## {category}\n")
            for item in items:
                f.write(f"- **{item['text'].strip()[:-1]}**: [{item['url']}]({item['url']})\n")
            f.write("\n")

# Usage
categories = ["Shielded Labs, Electric Coin Company, Zcash Foundation Updates"]
community_projects = [
    "Zcash Espanol", "Zcash Brazil", "Zcash Turkey", "Zcash Ukraine",
    "Zcash East Africa", "Zcash Korea", "Zcash Nigeria", "ruZcash",
    "genzcash", "ZKAV Club", "Electric Coin Company", "Zcash Foundation",
    "ZecHub", "Zcast", "Zcash Community Forum"
]

links_data = fetch_links(categories, community_projects)
save_to_template(links_data, "Digest 27-07-2025.md")