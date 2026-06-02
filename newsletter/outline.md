import logging
import re
from typing import Dict, List, Optional, Tuple, Union, Set, Any
from dataclasses import dataclass, field
from enum import Enum, auto
from pathlib import Path
import json
import asyncio
from datetime import datetime, timezone
import aiohttp
from aiohttp import ClientSession, ClientTimeout, ClientError
from urllib.parse import urlparse, urljoin
import hashlib
import ssl
import certifi
import os
from functools import lru_cache
import asyncio
from collections import defaultdict

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('zec_digest.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class DigestError(Exception):
    """Base exception for digest generation errors."""
    pass

class NetworkError(DigestError):
    """Exception for network-related failures."""
    pass

class ValidationError(DigestError):
    """Exception for validation failures."""
    pass

class TemplateError(DigestError):
    """Exception for template processing errors."""
    pass

class ConfigurationError(DigestError):
    """Exception for configuration errors."""
    pass

class SectionType(Enum):
    """Enumeration of digest sections."""
    SHIELDED_LABS = auto()
    ELECTRIC_COIN_COMPANY = auto()
    ZCASH_FOUNDATION = auto()
    COMMUNITY_GRANTS = auto()
    COMMUNITY_PROJECTS = auto()
    MEME_OF_WEEK = auto()

@dataclass(frozen=True)
class CommunityProject:
    """Immutable data class for community project information."""
    name: str
    url: str
    description: str
    language: str = "en"
    category: str = "general"
    
    def __post_init__(self) -> None:
        """Validate project data after initialization."""
        self._validate_name()
        self._validate_url()
        self._validate_description()
        self._validate_language()
    
    def _validate_name(self) -> None:
        """Validate project name."""
        if not self.name or not isinstance(self.name, str):
            raise ValidationError(f"Invalid project name: {self.name}")
        if len(self.name.strip()) < 2:
            raise ValidationError(f"Project name too short: {self.name}")
        if len(self.name) > 100:
            raise ValidationError(f"Project name too long: {self.name}")
    
    def _validate_url(self) -> None:
        """Validate URL format and security."""
        if not self._is_valid_url(self.url):
            raise ValidationError(f"Invalid URL for {self.name}: {self.url}")
        if not self.url.startswith('https://'):
            logger.warning(f"Non-HTTPS URL for {self.name}: {self.url}")
    
    def _validate_description(self) -> None:
        """Validate description."""
        if not self.description or not isinstance(self.description, str):
            raise ValidationError(f"Invalid description for {self.name}")
        if len(self.description.strip()) < 10:
            raise ValidationError(f"Description too short for {self.name}")
        if len(self.description) > 500:
            raise ValidationError(f"Description too long for {self.name}")
    
    def _validate_language(self) -> None:
        """Validate language code."""
        valid_languages = {'en', 'es', 'pt', 'tr', 'uk', 'ko', 'ru', 'zh'}
        if self.language not in valid_languages:
            raise ValidationError(f"Invalid language code: {self.language}")
    
    @staticmethod
    def _is_valid_url(url: str) -> bool:
        """Validate URL format and security."""
        try:
            parsed = urlparse(url)
            if not all([parsed.scheme in ('http', 'https'), parsed.netloc]):
                return False
            # Additional security checks
            if parsed.scheme == 'http':
                logger.warning(f"Insecure URL scheme: {url}")
            return True
        except Exception as e:
            logger.error(f"URL validation error: {e}")
            return False

@dataclass
class DigestConfig:
    """Configuration for digest generation."""
    min_community_links: int = 20
    max_retries: int = 3
    timeout_seconds: int = 30
    output_encoding: str = 'utf-8'
    template_url: str = field(
        default="https://raw.githubusercontent.com/ZecHub/zechub/refs/heads/main/newsletter/Digest%2027-07-2025.md"
    )
    required_sections: List[SectionType] = field(default_factory=lambda: list(SectionType))
    cache_ttl_seconds: int = 300
    max_concurrent_requests: int = 5
    output_directory: str = "./output"
    
    def __post_init__(self) -> None:
        """Validate configuration parameters."""
        self._validate_min_links()
        self._validate_retries()
        self._validate_timeout()
        self._validate_cache_ttl()
        self._validate_concurrent_requests()
        self._validate_output_directory()
    
    def _validate_min_links(self) -> None:
        """Validate minimum community links."""
        if not isinstance(self.min_community_links, int):
            raise ValidationError("min_community_links must be an integer")
        if self.min_community_links < 1:
            raise ValidationError("min_community_links must be at least 1")
        if self.min_community_links > 100:
            raise ValidationError("min_community_links must be at most 100")
    
    def _validate_retries(self) -> None:
        """Validate retry count."""
        if not isinstance(self.max_retries, int):
            raise ValidationError("max_retries must be an integer")
        if self.max_retries < 0 or self.max_retries > 10:
            raise ValidationError("max_retries must be between 0 and 10")
    
    def _validate_timeout(self) -> None:
        """Validate timeout."""
        if not isinstance(self.timeout_seconds, (int, float)):
            raise ValidationError("timeout_seconds must be a number")
        if self.timeout_seconds < 5 or self.timeout_seconds > 120:
            raise ValidationError("timeout_seconds must be between 5 and 120")
    
    def _validate_cache_ttl(self) -> None:
        """Validate cache TTL."""
        if not isinstance(self.cache_ttl_seconds, int):
            raise ValidationError("cache_ttl_seconds must be an integer")
        if self.cache_ttl_seconds < 0:
            raise ValidationError("cache_ttl_seconds must be non-negative")
    
    def _validate_concurrent_requests(self) -> None:
        """Validate concurrent requests limit."""
        if not isinstance(self.max_concurrent_requests, int):
            raise ValidationError("max_concurrent_requests must be an integer")
        if self.max_concurrent_requests < 1 or self.max_concurrent_requests > 50:
            raise ValidationError("max_concurrent_requests must be between 1 and 50")
    
    def _validate_output_directory(self) -> None:
        """Validate output directory."""
        if not isinstance(self.output_directory, str):
            raise ValidationError("output_directory must be a string")
        if not self.output_directory.strip():
            raise ValidationError("output_directory cannot be empty")

class CacheManager:
    """Manages caching of fetched resources."""
    
    def __init__(self, ttl_seconds: int = 300) -> None:
        """Initialize cache manager with TTL."""
        self._cache: Dict[str, Tuple[Any, float]] = {}
        self._ttl_seconds = ttl_seconds
        logger.info(f"CacheManager initialized with TTL: {ttl_seconds}s")
    
    def get(self, key: str) -> Optional[Any]:
        """Get cached value if not expired."""
        if key in self._cache:
            value, timestamp = self._cache[key]
            if time.time() - timestamp < self._ttl_seconds:
                logger.debug(f"Cache hit for key: {key}")
                return value
            else:
                logger.debug(f"Cache expired for key: {key}")
                del self._cache[key]
        return None
    
    def set(self, key: str, value: Any) -> None:
        """Set cache value with current timestamp."""
        self._cache[key] = (value, time.time())
        logger.debug(f"Cache set for key: {key}")
    
    def clear(self) -> None:
        """Clear all cached values."""
        self._cache.clear()
        logger.info("Cache cleared")
    
    def remove(self, key: str) -> None:
        """Remove specific key from cache."""
        self._cache.pop(key, None)
        logger.debug(f"Cache removed for key: {key}")

class RateLimiter:
    """Rate limiter for API requests."""
    
    def __init__(self, max_concurrent: int = 5) -> None:
        """Initialize rate limiter."""
        self._semaphore = asyncio.Semaphore(max_concurrent)
        self._request_times: List[float] = []
        logger.info(f"RateLimiter initialized with max concurrent: {max_concurrent}")
    
    async def acquire(self) -> None:
        """Acquire rate limit slot."""
        await self._semaphore.acquire()
        self._request_times.append(time.time())
    
    def release(self) -> None:
        """Release rate limit slot."""
        self._semaphore.release()
        self._cleanup_old_requests()
    
    def _cleanup_old_requests(self) -> None:
        """Cleanup old request timestamps."""
        current_time = time.time()
        self._request_times = [t for t in self._request_times if current_time - t < 60]
    
    @property
    def request_count_last_minute(self) -> int:
        """Get request count in last minute."""
        self._cleanup_old_requests()
        return len(self._request_times)

class DigestGenerator:
    """Main class for generating Zcash Ecosystem Digest."""
    
    # Required community projects with verified URLs
    REQUIRED_PROJECTS: Dict[str, str] = {
        "Zcash Espanol": "https://twitter.com/zcashesp",
        "Zcash Brazil": "https://twitter.com/zcashbrazil",
        "Zcash Turkey": "https://twitter.com/zcashturkey",
        "Zcash Ukraine": "https://twitter.com/zcashukraine",
        "Zcash East Africa": "https://twitter.com/zcasheastafrica",
        "Zcash Korea": "https://twitter.com/zcashkorea",
        "Zcash Nigeria": "https://twitter.com/zcashnigeria",
        "ruZcash": "https://twitter.com/ruzcash",
        "genzcash": "https://genzcash.com",
        "ZKAV Club": "https://zkav.club",
        "Electric Coin Company": "https://electriccoin.co",
        "Zcash Foundation": "https://zfnd.org",
        "ZecHub": "https://zechub.wiki",
        "Zcast": "https://zcast.money",
        "Zcash Community Forum": "https://forum.zcashcommunity.com",
        "Shielded Labs": "https://shieldedlabs.com",
        "Zcash Grants": "https://grants.zcashcommunity.com",
        "Zcash Ecosystem": "https://zcashecosystem.com",
        "Zcash Media": "https://z.cash",
        "Zcash R&D": "https://research.z.cash"
    }
    
    def __init__(self, config: Optional[DigestConfig] = None) -> None:
        """Initialize digest generator with optional configuration."""
        self.config = config or DigestConfig()
        self._session: Optional[ClientSession] = None
        self._ssl_context: ssl.SSLContext = ssl.create_default_context(cafile=certifi.where())
        self._cache: CacheManager = CacheManager(ttl_seconds=self.config.cache_ttl_seconds)
        self._rate_limiter: RateLimiter = RateLimiter(max_concurrent=self.config.max_concurrent_requests)
        self._output_dir: Path = Path(self.config.output_directory)
        self._ensure_output_directory()
        logger.info("DigestGenerator initialized with config: %s", self.config)
    
    def _ensure_output_directory(self) -> None:
        """Ensure output directory exists."""
        try:
            self._output_dir.mkdir(parents=True, exist_ok=True)
            logger.info(f"Output directory ensured: {self._output_dir}")
        except Exception as e:
            raise ConfigurationError(f"Failed to create output directory: {e}")
    
    async def __aenter__(self) -> 'DigestGenerator':
        """Async context manager entry."""
        timeout = ClientTimeout(total=self.config.timeout_seconds)
        connector = aiohttp.TCPConnector(
            ssl=self._ssl_context,
            limit=self.config.max_concurrent_requests
        )
        self._session = ClientSession(
            timeout=timeout,
            connector=connector
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb) -> None:
        """Async context manager exit with cleanup."""
        if self._session:
            await self._session.close()
            self._session = None
        self._cache.clear()
    
    async def fetch_template(self) -> str:
        """Fetch the digest template with retry logic and caching."""
        cache_key = f"template_{self.config.template_url}"
        cached_content = self._cache.get(cache_key)
        if cached_content:
            logger.info("Using cached template")
            return cached_content
        
        if not self._session:
            raise DigestError("Session not initialized. Use async context manager.")
        
        for attempt in range(self.config.max_retries):
            try:
                await self._rate_limiter.acquire()
                logger.info("Fetching template (attempt %d/%d)", attempt + 1, self.config.max_retries)
                
                async with self._session.get(
                    self.config.template_url,
                    headers={'User-Agent': 'ZcashDigestGenerator/1.0'}
                ) as response:
                    response.raise_for_status()
                    content = await response.text(encoding=self.config.output_encoding)
                    
                    if not content.strip():
                        raise TemplateError("Empty template content received")
                    
                    self._cache.set(cache_key, content)
                    logger.info("Template fetched successfully (%d bytes)", len(content))
                    return content
                    
            except ClientError as e:
                logger.warning("Network error on attempt %d: %s", attempt + 1, str(e))
                if attempt == self.config.max_retries - 1:
                    raise NetworkError(f"Failed to fetch template after {self.config.max_retries} attempts: {e}")
                await asyncio.sleep(2 ** attempt)  # Exponential backoff
            except asyncio.TimeoutError as e:
                logger.warning("Timeout on attempt %d: %s", attempt + 1, str(e))
                if attempt == self.config.max_retries - 1:
                    raise NetworkError(f"Timeout fetching template after {self.config.max_retries} attempts")
            except Exception as e:
                logger.error("Unexpected error fetching template: %s", str(e))
                raise DigestError(f"Template fetch failed: {e}")
            finally:
                self._rate_limiter.release()
        
        raise NetworkError("Failed to fetch template after all retries")
    
    def validate_content(self, content: str) -> Tuple[bool, List[str]]:
        """Validate digest content meets requirements.
        
        Returns:
            Tuple of (is_valid, list_of_errors)
        """
        errors: List[str] = []
        
        try:
            # Check for required sections
            section_patterns = {
                "Shielded Labs": r"Shielded Labs",
                "Electric Coin Company": r"Electric Coin Company",
                "Zcash Foundation": r"Zcash Foundation",
                "Community Grants": r"Zcash Community Grants",
                "Community Projects": r"Community Projects",
                "Meme of the week": r"Meme of the week"
            }
            
            for section_name, pattern in section_patterns.items():
                if not re.search(pattern, content, re.IGNORECASE):
                    errors.append(f"Missing required section: {section_name}")
                    logger.warning("Missing section: %s", section_name)
            
            # Count community project links
            links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
            link_count = len(links)
            
            if link_count < self.config.min_community_links:
                errors.append(f"Insufficient links: {link_count} (minimum: {self.config.min_community_links})")
                logger.warning("Insufficient links: %d (minimum: %d)", link_count, self.config.min_community_links)
            
            # Verify required projects are included
            found_projects: Set[str] = set()
            for link_text, link_url in links:
                for project_name in self.REQUIRED_PROJECTS:
                    if project_name.lower() in link_text.lower():
                        found_projects.add(project_name)
            
            missing_projects = set(self.REQUIRED_PROJECTS.keys()) - found_projects
            if missing_projects:
                errors.append(f"Missing required projects: {', '.join(missing_projects)}")
                logger.warning("Missing required projects: %s", missing_projects)
            
            # Validate link URLs
            for link_text, link_url in links:
                if not CommunityProject._is_valid_url(link_url):
                    errors.append(f"Invalid URL in link '{link_text}': {link_url}")
            
            # Check for duplicate links
            link_urls = [url for _, url in links]
            duplicates = [url for url in link_urls if link_urls.count(url) > 1]
            if duplicates:
                errors.append(f"Duplicate links found: {set(duplicates)}")
            
            # Validate markdown structure
            if not self._validate_markdown_structure(content):
                errors.append("Invalid markdown structure")
            
            is_valid = len(errors) == 0
            logger.info("Content validation result: valid=%s, errors=%d", is_valid, len(errors))
            return is_valid, errors
            
        except Exception as e:
            logger.error("Validation error: %s", str(e))
            return False, [f"Validation failed: {str(e)}"]
    
    def _validate_markdown_structure(self