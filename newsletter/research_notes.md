"""
Zcash Ecosystem Digest — June 6th Submission
Production-Quality Implementation with Maximum Reliability and Performance
"""

import asyncio
import hashlib
import json
import logging
import re
import time
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from enum import Enum, auto
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple, Union
from urllib.parse import urlparse

import aiohttp
import aiofiles
import markdown
from pydantic import BaseModel, Field, HttpUrl, validator, ValidationError
from cachetools import TTLCache, cached
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

# Configure logging with structured format
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s:%(funcName)s:%(lineno)d | %(message)s",
    handlers=[
        logging.FileHandler("digest_generation.log", mode='a', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class LinkCategory(Enum):
    """Enumeration of link categories for the digest."""
    SHIELDED_LABS_ECC_FOUNDATION = "shielded_labs_ecc_foundation"
    COMMUNITY_GRANTS = "community_grants"
    COMMUNITY_PROJECTS = "community_projects"
    MEME_OF_WEEK = "meme_of_week"


class VerificationStatus(Enum):
    """Verification status for links."""
    VERIFIED = "verified"
    PENDING = "pending"
    FAILED = "failed"
    EXPIRED = "expired"
    RATE_LIMITED = "rate_limited"


class LinkHealth(Enum):
    """Health status of a link."""
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    UNHEALTHY = "unhealthy"
    UNKNOWN = "unknown"


@dataclass(frozen=True)
class LinkEntry:
    """Immutable data class for a single link entry with validation."""
    title: str
    url: str
    source: str
    category: LinkCategory
    verification_notes: str
    verification_status: VerificationStatus = VerificationStatus.PENDING
    link_health: LinkHealth = LinkHealth.UNKNOWN
    is_non_english: bool = False
    original_language: Optional[str] = None
    added_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    last_verified: Optional[datetime] = None
    response_time_ms: Optional[float] = None
    content_hash: Optional[str] = None

    def __post_init__(self) -> None:
        """Validate fields after initialization."""
        if not self.title or not self.title.strip():
            raise ValueError("Title cannot be empty")
        if not self.url or not self.url.strip():
            raise ValueError("URL cannot be empty")
        if not self.source or not self.source.strip():
            raise ValueError("Source cannot be empty")
        
        # Validate URL format
        try:
            parsed = urlparse(self.url)
            if parsed.scheme not in ("http", "https"):
                raise ValueError(f"Invalid URL scheme: {parsed.scheme}")
        except Exception as e:
            raise ValueError(f"Invalid URL: {e}")

    def to_dict(self) -> Dict:
        """Convert to dictionary for serialization."""
        return {
            "title": self.title,
            "url": self.url,
            "source": self.source,
            "category": self.category.value,
            "verification_status": self.verification_status.value,
            "link_health": self.link_health.value,
            "is_non_english": self.is_non_english,
            "original_language": self.original_language,
            "added_at": self.added_at.isoformat(),
            "last_verified": self.last_verified.isoformat() if self.last_verified else None,
            "response_time_ms": self.response_time_ms,
            "content_hash": self.content_hash
        }


class DigestConfig(BaseModel):
    """Configuration model for digest generation with validation."""
    min_links_required: int = Field(default=20, ge=10, le=100)
    max_links_allowed: int = Field(default=50, ge=20, le=200)
    output_template_url: HttpUrl = Field(
        default="https://raw.githubusercontent.com/ZecHub/zechub/refs/heads/main/newsletter/Digest%2027-07-2025.md"
    )
    allowed_domains: Set[str] = Field(default_factory=lambda: {
        "electriccoin.co", "zfnd.org", "shieldedlabs.com", "forum.zcashcommunity.com",
        "zechub.xyz", "zcast.xyz", "twitter.com", "youtube.com", "medium.com",
        "t.me", "podcast.ruzcash.org", "genzcash.com", "discord.gg", "github.com"
    })
    request_timeout: int = Field(default=30, ge=5, le=120)
    max_retries: int = Field(default=3, ge=1, le=10)
    user_agent: str = Field(
        default="ZcashDigestBot/2.0 (Production; +https://zechub.xyz; contact@zechub.xyz)"
    )
    cache_ttl_seconds: int = Field(default=300, ge=60, le=3600)
    max_concurrent_requests: int = Field(default=10, ge=1, le=50)
    rate_limit_per_second: float = Field(default=5.0, ge=0.5, le=50.0)
    output_directory: str = Field(default="./output")
    enable_content_verification: bool = Field(default=True)
    enable_caching: bool = Field(default=True)

    @validator("allowed_domains")
    def validate_domains(cls, v: Set[str]) -> Set[str]:
        """Validate and normalize domain names."""
        normalized = set()
        for domain in v:
            domain = domain.lower().strip()
            # Remove protocol if present
            domain = re.sub(r'^https?://', '', domain)
            # Remove trailing slash
            domain = domain.rstrip('/')
            if not re.match(r'^[a-z0-9.-]+\.[a-z]{2,}$', domain):
                raise ValueError(f"Invalid domain format: {domain}")
            normalized.add(domain)
        return normalized

    @validator("output_directory")
    def validate_output_directory(cls, v: str) -> str:
        """Ensure output directory exists."""
        path = Path(v)
        path.mkdir(parents=True, exist_ok=True)
        return str(path.absolute())


class RateLimiter:
    """Token bucket rate limiter for async operations."""

    def __init__(self, rate: float, max_tokens: int = 10):
        self.rate = rate
        self.max_tokens = max_tokens
        self.tokens = max_tokens
        self.last_refill = time.monotonic()
        self._lock = asyncio.Lock()

    async def acquire(self) -> None:
        """Acquire a token, waiting if necessary."""
        async with self._lock:
            now = time.monotonic()
            elapsed = now - self.last_refill
            self.tokens = min(self.max_tokens, self.tokens + elapsed * self.rate)
            self.last_refill = now

            if self.tokens < 1:
                wait_time = (1 - self.tokens) / self.rate
                await asyncio.sleep(wait_time)
                self.tokens = 0
            else:
                self.tokens -= 1


class LinkValidator:
    """Handles link validation and verification with caching and rate limiting."""

    def __init__(self, config: DigestConfig):
        self.config = config
        self.session: Optional[aiohttp.ClientSession] = None
        self.verified_links: Dict[str, VerificationStatus] = {}
        self.rate_limiter = RateLimiter(config.rate_limit_per_second)
        self._cache: TTLCache = TTLCache(maxsize=1000, ttl=config.cache_ttl_seconds)
        self._semaphore = asyncio.Semaphore(config.max_concurrent_requests)

    async def __aenter__(self):
        """Async context manager entry with connection pooling."""
        timeout = aiohttp.ClientTimeout(
            total=self.config.request_timeout,
            connect=10,
            sock_read=self.config.request_timeout
        )
        connector = aiohttp.TCPConnector(
            limit=self.config.max_concurrent_requests,
            ttl_dns_cache=300,
            enable_cleanup_closed=True
        )
        self.session = aiohttp.ClientSession(
            timeout=timeout,
            connector=connector,
            headers={
                "User-Agent": self.config.user_agent,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5"
            },
            raise_for_status=False
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit with proper cleanup."""
        if self.session:
            await self.session.close()
            await asyncio.sleep(0.250)  # Wait for connection cleanup

    @cached(cache=lambda self: self._cache)
    async def validate_url(self, url: str) -> Tuple[bool, str, float]:
        """
        Validate a URL for format, domain, and accessibility with caching.
        
        Args:
            url: The URL to validate
            
        Returns:
            Tuple of (is_valid, error_message, response_time_ms)
        """
        start_time = time.monotonic()
        
        try:
            # Parse URL
            parsed = urlparse(url)
            
            # Check scheme
            if parsed.scheme not in ("http", "https"):
                return False, "Invalid URL scheme; must be http or https", 0.0
            
            # Check domain
            domain = parsed.netloc.lower()
            if not any(domain.endswith(allowed) for allowed in self.config.allowed_domains):
                logger.warning(f"Domain not in allowed list: {domain}")
            
            # Check URL length
            if len(url) > 2048:
                return False, "URL exceeds maximum length of 2048 characters", 0.0
            
            # Check for malicious patterns
            malicious_patterns = [
                r'javascript:', r'data:', r'vbscript:', r'file:',
                r'<\s*script', r'onclick', r'onerror', r'onload',
                r'%00', r'..\\', r'..%2f', r'..%5c'
            ]
            for pattern in malicious_patterns:
                if re.search(pattern, url, re.IGNORECASE):
                    return False, f"URL contains potentially malicious pattern: {pattern}", 0.0
            
            # Check for SQL injection patterns
            sql_patterns = [r"'.*OR.*'", r"'.*--", r"'.*#", r"'.*;"]
            for pattern in sql_patterns:
                if re.search(pattern, url, re.IGNORECASE):
                    return False, "URL contains potential SQL injection pattern", 0.0
            
            response_time = (time.monotonic() - start_time) * 1000
            return True, "", response_time
            
        except Exception as e:
            logger.error(f"URL validation error for {url}: {str(e)}")
            response_time = (time.monotonic() - start_time) * 1000
            return False, f"Validation error: {str(e)}", response_time

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=10),
        retry=retry_if_exception_type((aiohttp.ClientError, asyncio.TimeoutError))
    )
    async def verify_link_accessible(self, url: str) -> Tuple[bool, str, float, Optional[str]]:
        """
        Verify that a link is accessible via HTTP request with retry logic.
        
        Args:
            url: The URL to verify
            
        Returns:
            Tuple of (is_accessible, status_message, response_time_ms, content_hash)
        """
        if not self.session:
            raise RuntimeError("Session not initialized; use async context manager")
        
        start_time = time.monotonic()
        content_hash = None
        
        async with self._semaphore:
            await self.rate_limiter.acquire()
            
            try:
                async with self.session.get(
                    url,
                    allow_redirects=True,
                    timeout=aiohttp.ClientTimeout(total=self.config.request_timeout)
                ) as response:
                    response_time = (time.monotonic() - start_time) * 1000
                    
                    if response.status == 200:
                        # Optionally hash content for verification
                        if self.config.enable_content_verification:
                            content = await response.read()
                            content_hash = hashlib.sha256(content).hexdigest()[:16]
                        
                        return True, f"HTTP 200 OK", response_time, content_hash
                    
                    elif response.status == 429:
                        retry_after = int(response.headers.get('Retry-After', '5'))
                        logger.warning(f"Rate limited on {url}, waiting {retry_after}s")
                        await asyncio.sleep(retry_after)
                        return False, f"HTTP 429 Rate Limited", response_time, None
                    
                    elif 500 <= response.status < 600:
                        logger.error(f"Server error {response.status} for {url}")
                        return False, f"HTTP {response.status} Server Error", response_time, None
                    
                    else:
                        return False, f"HTTP {response.status}", response_time, None
                            
            except aiohttp.ClientError as e:
                response_time = (time.monotonic() - start_time) * 1000
                logger.error(f"Request failed for {url}: {str(e)}")
                raise  # Let retry decorator handle it
            
            except asyncio.TimeoutError:
                response_time = (time.monotonic() - start_time) * 1000
                logger.warning(f"Timeout for {url}")
                raise  # Let retry decorator handle it


class DigestGenerator:
    """Main class for generating the Zcash Ecosystem Digest with maximum reliability."""

    def __init__(self, config: Optional[DigestConfig] = None):
        self.config = config or DigestConfig()
        self.links: List[LinkEntry] = []
        self.logger = logging.getLogger(f"{__name__}.{self.__class__.__name__}")
        self._lock = asyncio.Lock()
        self._stats = {
            "total_links_added": 0,
            "total_links_removed": 0,
            "total_verifications": 0,
            "failed_verifications": 0,
            "start_time": datetime.now(timezone.utc)
        }

    async def add_link(self, entry: LinkEntry) -> None:
        """
        Add a link entry to the digest with thread-safe operation.
        
        Args:
            entry: The LinkEntry to add
            
        Raises:
            ValueError: If entry is invalid or duplicate
            TypeError: If entry is not a LinkEntry instance
        """
        if not isinstance(entry, LinkEntry):
            raise TypeError(f"Expected LinkEntry, got {type(entry).__name__}")
        
        async with self._lock:
            # Check for duplicates
            for existing in self.links:
                if existing.url == entry.url:
                    raise ValueError(f"Duplicate URL: {entry.url}")
            
            # Check maximum links
            if len(self.links) >= self.config.max_links_allowed:
                raise ValueError(f"Maximum links ({self.config.max_links_allowed}) reached")
            
            self.links.append(entry)
            self._stats["total_links_added"] += 1
            self.logger.info(f"Added link: {entry.title} ({entry.category.value})")

    async def remove_link(self, url: str) -> bool:
        """
        Remove a link by URL with thread-safe operation.
        
        Args:
            url: The URL to remove
            
        Returns:
            True if removed, False if not found
        """
        async with self._lock:
            for i, entry in enumerate(self.links):
                if entry.url == url:
                    self.links.pop(i)
                    self._stats["total_links_removed"] += 1
                    self.logger.info(f"Removed link: {entry.title}")
                    return True
            return False

    async def verify_all_links(self, validator: LinkValidator) -> Dict[str, VerificationStatus]:
        """
        Verify all links in the digest with concurrent processing.
        
        Args:
            validator: LinkValidator instance
            
        Returns:
            Dictionary mapping URLs to their verification status
        """
        results = {}
        tasks = []
        
        async with self._lock:
            links_to_verify = list(self.links)
        
        # Create verification tasks
        for entry in links_to_verify:
            task = self._verify_single_link(entry, validator)
            tasks.append(task)
        
        # Execute all tasks concurrently
        completed = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Process results
        for entry, result in zip(links_to_verify, completed):
            if isinstance(result, Exception):
                self.logger.error(f"Verification failed for {entry.url}: {result}")
                results[entry.url] = VerificationStatus.FAILED
                self._stats["failed_verifications"] += 1
            else:
                results[entry.url] = result
                if result == VerificationStatus.VERIFIED:
                    self.logger.debug(f"Verified: {entry.url}")
            
            self._stats["total_verifications"] += 1
        
        return results

    async def _verify_single_link(
        self, 
        entry: LinkEntry, 
        validator: LinkValidator
    ) -> VerificationStatus:
        """
        Verify a single link with health checking.
        
        Args:
            entry: The link entry to verify
            validator: LinkValidator instance
            
        Returns:
            Verification status
        """
        try:
            # Validate URL format
            is_valid, error_msg, _ = await validator.validate_url(entry.url)
            if not is_valid:
                self.log