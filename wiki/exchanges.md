"""
Cryptocurrency Exchanges Supporting Zcash (ZEC)
================================================

This module provides a structured overview of cryptocurrency exchanges that support
Zcash (ZEC) trading. It includes validated exchange data, logging, error handling,
and type safety for production use.

Usage:
    from exchanges import get_exchange_data, validate_exchange, EXCHANGES_LIST
    
    # Get all exchanges
    exchanges = get_exchange_data()
    
    # Validate a specific exchange
    is_valid = validate_exchange("Binance")
"""

import logging
from typing import Dict, List, Optional, Union, Any, Tuple, Set
from dataclasses import dataclass, field, asdict
from pathlib import Path
import json
import re
from enum import Enum
from functools import lru_cache
import time
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class ExchangeError(Exception):
    """Base exception for exchange-related errors."""
    pass


class ExchangeNotFoundError(ExchangeError):
    """Raised when an exchange is not found in the database."""
    pass


class ExchangeValidationError(ExchangeError):
    """Raised when exchange data fails validation."""
    pass


class ImageNotFoundError(ExchangeError):
    """Raised when an exchange logo image is missing."""
    pass


class ExchangeDataError(ExchangeError):
    """Raised when exchange data operations fail."""
    pass


@dataclass(frozen=True)
class Exchange:
    """
    Represents a cryptocurrency exchange with Zcash support.
    
    Attributes:
        name: Exchange name (must be non-empty string)
        logo_filename: Filename of the exchange logo image
        website: Official website URL (must be valid URL)
        supported_pairs: List of trading pairs (must be non-empty)
        notes: Additional information about the exchange
        created_at: Timestamp when the exchange was added
        updated_at: Timestamp when the exchange was last updated
    """
    name: str
    logo_filename: str
    website: str
    supported_pairs: List[str]
    notes: str
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.now().isoformat())
    
    def __post_init__(self) -> None:
        """Validate exchange data after initialization."""
        self._validate()
    
    def _validate(self) -> None:
        """Perform comprehensive validation of exchange data."""
        try:
            # Validate name
            if not self.name or not isinstance(self.name, str):
                raise ExchangeValidationError(f"Invalid exchange name: {self.name}")
            
            if len(self.name.strip()) == 0:
                raise ExchangeValidationError(f"Empty exchange name")
            
            if len(self.name) > 100:
                raise ExchangeValidationError(f"Exchange name too long: {len(self.name)} characters")
            
            # Validate website
            if not self.website or not isinstance(self.website, str):
                raise ExchangeValidationError(f"Invalid website URL for {self.name}")
            
            # Validate URL format
            url_pattern = re.compile(
                r'^https?://'  # http:// or https://
                r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
                r'localhost|'  # localhost...
                r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
                r'(?::\d+)?'  # optional port
                r'(?:/?|[/?]\S+)$', re.IGNORECASE)
            
            if not url_pattern.match(self.website):
                raise ExchangeValidationError(f"Invalid URL format for {self.name}: {self.website}")
            
            # Validate supported pairs
            if not self.supported_pairs or not isinstance(self.supported_pairs, list):
                raise ExchangeValidationError(f"Invalid supported pairs for {self.name}")
            
            if len(self.supported_pairs) == 0:
                raise ExchangeValidationError(f"Empty supported pairs for {self.name}")
            
            if len(self.supported_pairs) > 50:
                raise ExchangeValidationError(f"Too many trading pairs for {self.name}: {len(self.supported_pairs)}")
            
            # Validate each trading pair format (e.g., ZEC/USDT)
            pair_pattern = re.compile(r'^[A-Z]{2,10}/[A-Z]{2,10}$')
            for pair in self.supported_pairs:
                if not pair_pattern.match(pair):
                    raise ExchangeValidationError(f"Invalid trading pair format: {pair} in {self.name}")
            
            # Validate notes
            if not self.notes or not isinstance(self.notes, str):
                raise ExchangeValidationError(f"Invalid notes for {self.name}")
            
            if len(self.notes) > 500:
                raise ExchangeValidationError(f"Notes too long for {self.name}: {len(self.notes)} characters")
            
            # Validate logo filename
            if not self.logo_filename or not isinstance(self.logo_filename, str):
                raise ExchangeValidationError(f"Invalid logo filename for {self.name}")
            
            # Validate logo file exists
            logo_path = Path("images") / self.logo_filename
            if not logo_path.exists():
                logger.warning(f"Logo file not found: {logo_path} for exchange {self.name}")
                # Don't raise error, just warn - images might be added later
            
            # Validate timestamps
            try:
                datetime.fromisoformat(self.created_at)
                datetime.fromisoformat(self.updated_at)
            except ValueError as e:
                raise ExchangeValidationError(f"Invalid timestamp format for {self.name}: {e}")
            
        except ExchangeValidationError:
            raise
        except Exception as e:
            raise ExchangeValidationError(f"Validation error for {self.name}: {e}")


# Define all exchanges with validated data
EXCHANGES: Dict[str, Exchange] = {
    "Binance": Exchange(
        name="Binance",
        logo_filename="binance.png",
        website="https://www.binance.com",
        supported_pairs=["ZEC/USDT", "ZEC/BTC", "ZEC/BNB", "ZEC/ETH"],
        notes="Binance is one of the largest cryptocurrency exchanges globally, offering high liquidity and a wide range of trading pairs for Zcash. Supports both spot and margin trading."
    ),
    "Coinbase": Exchange(
        name="Coinbase",
        logo_filename="coinbase.png",
        website="https://www.coinbase.com",
        supported_pairs=["ZEC/USD", "ZEC/USDT", "ZEC/EUR", "ZEC/BTC"],
        notes="Coinbase is a US-based exchange known for its user-friendly interface and strong regulatory compliance. Zcash is available for trading on both Coinbase and Coinbase Pro."
    ),
    "Kraken": Exchange(
        name="Kraken",
        logo_filename="kraken.png",
        website="https://www.kraken.com",
        supported_pairs=["ZEC/USD", "ZEC/EUR", "ZEC/BTC", "ZEC/ETH"],
        notes="Kraken is a well-established exchange with strong security features and support for shielded Zcash transactions. Offers staking and futures trading for select assets."
    ),
    "Gemini": Exchange(
        name="Gemini",
        logo_filename="gemini.png",
        website="https://www.gemini.com",
        supported_pairs=["ZEC/USD", "ZEC/BTC"],
        notes="Gemini is a regulated New York-based exchange that supports Zcash deposits and withdrawals. Known for its strong security protocols and insurance coverage."
    ),
    "KuCoin": Exchange(
        name="KuCoin",
        logo_filename="kucoin.png",
        website="https://www.kucoin.com",
        supported_pairs=["ZEC/USDT", "ZEC/BTC", "ZEC/ETH"],
        notes="KuCoin is a popular global exchange offering a wide variety of altcoins and trading pairs. Features include spot trading, margin trading, and a built-in P2P exchange."
    ),
    "Bitstamp": Exchange(
        name="Bitstamp",
        logo_filename="bitstamp.png",
        website="https://www.bitstamp.net",
        supported_pairs=["ZEC/USD", "ZEC/EUR", "ZEC/BTC"],
        notes="Bitstamp is one of the longest-running cryptocurrency exchanges, founded in 2011. Offers reliable fiat on-ramps and institutional-grade trading services."
    ),
    "Robinhood": Exchange(
        name="Robinhood",
        logo_filename="robinhood.png",
        website="https://www.robinhood.com",
        supported_pairs=["ZEC/USD"],
        notes="Robinhood is a commission-free trading platform popular in the United States. Supports Zcash trading alongside other major cryptocurrencies. Note that Robinhood does not currently support Zcash withdrawals to external wallets."
    ),
    "YoBit": Exchange(
        name="YoBit",
        logo_filename="yobit.png",
        website="https://www.yobit.net",
        supported_pairs=["ZEC/USD", "ZEC/BTC", "ZEC/RUR"],
        notes="YoBit is a Russian-based exchange offering a large selection of altcoins. Known for lower trading volumes compared to major exchanges but provides access to various lesser-known trading pairs."
    ),
    "Backpack": Exchange(
        name="Backpack",
        logo_filename="backpack.png",
        website="https://www.backpack.exchange",
        supported_pairs=["ZEC/USDT", "ZEC/BTC"],
        notes="Backpack is a modern exchange built by the team behind the Solana ecosystem. Features a non-custodial trading experience with self-custody of funds. Supports Zcash trading with competitive fees."
    )
}

# Cache for exchange data to improve performance
_exchange_cache: Optional[Dict[str, Exchange]] = None
_cache_timestamp: Optional[float] = None
CACHE_TTL: float = 300.0  # 5 minutes cache TTL


def get_exchange_data(force_refresh: bool = False) -> Dict[str, Exchange]:
    """
    Retrieve all exchange data with caching for performance optimization.
    
    Args:
        force_refresh: If True, bypass cache and reload data
        
    Returns:
        Dictionary of exchange names to Exchange objects
        
    Raises:
        ExchangeDataError: If data retrieval fails
        
    Example:
        >>> exchanges = get_exchange_data()
        >>> len(exchanges)
        9
    """
    global _exchange_cache, _cache_timestamp
    
    try:
        # Check cache validity
        if not force_refresh and _exchange_cache is not None and _cache_timestamp is not None:
            if time.time() - _cache_timestamp < CACHE_TTL:
                logger.debug("Returning cached exchange data")
                return _exchange_cache.copy()
        
        # Validate all exchanges
        validated_exchanges: Dict[str, Exchange] = {}
        for name, exchange in EXCHANGES.items():
            try:
                if isinstance(exchange, Exchange):
                    validated_exchanges[name] = exchange
                else:
                    logger.error(f"Invalid exchange object for {name}: {type(exchange)}")
                    raise ExchangeValidationError(f"Invalid exchange object type for {name}")
            except ExchangeValidationError as e:
                logger.error(f"Validation failed for exchange {name}: {e}")
                raise
        
        # Update cache
        _exchange_cache = validated_exchanges.copy()
        _cache_timestamp = time.time()
        
        logger.info(f"Successfully loaded {len(validated_exchanges)} exchanges")
        return validated_exchanges
        
    except ExchangeValidationError:
        raise
    except Exception as e:
        logger.error(f"Failed to retrieve exchange data: {e}")
        raise ExchangeDataError(f"Failed to retrieve exchange data: {e}")


def validate_exchange(exchange_name: str) -> Tuple[bool, Optional[str]]:
    """
    Validate if an exchange exists and is properly configured.
    
    Args:
        exchange_name: Name of the exchange to validate
        
    Returns:
        Tuple of (is_valid, error_message)
        
    Example:
        >>> is_valid, error = validate_exchange("Binance")
        >>> is_valid
        True
        >>> is_valid, error = validate_exchange("InvalidExchange")
        >>> is_valid
        False
    """
    try:
        # Input validation
        if not exchange_name or not isinstance(exchange_name, str):
            return False, "Invalid exchange name format"
        
        exchange_name = exchange_name.strip()
        if len(exchange_name) == 0:
            return False, "Empty exchange name"
        
        # Check if exchange exists
        exchanges = get_exchange_data()
        if exchange_name not in exchanges:
            return False, f"Exchange '{exchange_name}' not found"
        
        # Validate exchange data
        exchange = exchanges[exchange_name]
        try:
            exchange._validate()
            return True, None
        except ExchangeValidationError as e:
            return False, str(e)
            
    except ExchangeDataError as e:
        logger.error(f"Data error during validation: {e}")
        return False, f"Data error: {e}"
    except Exception as e:
        logger.error(f"Unexpected error during validation: {e}")
        return False, f"Unexpected error: {e}"


def get_exchange_by_name(exchange_name: str) -> Optional[Exchange]:
    """
    Retrieve a specific exchange by name.
    
    Args:
        exchange_name: Name of the exchange to retrieve
        
    Returns:
        Exchange object if found, None otherwise
        
    Example:
        >>> exchange = get_exchange_by_name("Binance")
        >>> exchange.name
        'Binance'
    """
    try:
        if not exchange_name or not isinstance(exchange_name, str):
            logger.warning(f"Invalid exchange name provided: {exchange_name}")
            return None
        
        exchange_name = exchange_name.strip()
        exchanges = get_exchange_data()
        
        exchange = exchanges.get(exchange_name)
        if exchange is None:
            logger.info(f"Exchange '{exchange_name}' not found")
            return None
        
        return exchange
        
    except Exception as e:
        logger.error(f"Error retrieving exchange '{exchange_name}': {e}")
        return None


def get_exchange_names() -> List[str]:
    """
    Get list of all exchange names.
    
    Returns:
        Sorted list of exchange names
        
    Example:
        >>> names = get_exchange_names()
        >>> 'Binance' in names
        True
    """
    try:
        exchanges = get_exchange_data()
        names = sorted(exchanges.keys())
        logger.debug(f"Retrieved {len(names)} exchange names")
        return names
    except Exception as e:
        logger.error(f"Failed to get exchange names: {e}")
        return []


def get_exchanges_by_pair(trading_pair: str) -> List[Exchange]:
    """
    Find all exchanges that support a specific trading pair.
    
    Args:
        trading_pair: Trading pair to search for (e.g., "ZEC/USDT")
        
    Returns:
        List of exchanges supporting the specified pair
        
    Example:
        >>> exchanges = get_exchanges_by_pair("ZEC/USDT")
        >>> len(exchanges) > 0
        True
    """
    try:
        # Validate trading pair format
        pair_pattern = re.compile(r'^[A-Z]{2,10}/[A-Z]{2,10}$')
        if not pair_pattern.match(trading_pair):
            logger.warning(f"Invalid trading pair format: {trading_pair}")
            return []
        
        exchanges = get_exchange_data()
        matching_exchanges = [
            exchange for exchange in exchanges.values()
            if trading_pair in exchange.supported_pairs
        ]
        
        logger.debug(f"Found {len(matching_exchanges)} exchanges supporting {trading_pair}")
        return matching_exchanges
        
    except Exception as e:
        logger.error(f"Error searching for exchanges by pair '{trading_pair}': {e}")
        return []


def export_exchanges_to_json(filepath: Union[str, Path]) -> bool:
    """
    Export exchange data to JSON file.
    
    Args:
        filepath: Path to output JSON file
        
    Returns:
        True if export successful, False otherwise
        
    Example:
        >>> success = export_exchanges_to_json("exchanges.json")
        >>> success
        True
    """
    try:
        # Validate filepath
        if isinstance(filepath, str):
            filepath = Path(filepath)
        
        if not isinstance(filepath, Path):
            raise ExchangeDataError(f"Invalid filepath type: {type(filepath)}")
        
        # Ensure directory exists
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        # Get exchange data
        exchanges = get_exchange_data()
        
        # Convert to serializable format
        exchange_data = {}
        for name, exchange in exchanges.items():
            exchange_data[name] = asdict(exchange)
        
        # Write to file
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(exchange_data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Successfully exported {len(exchange_data)} exchanges to {filepath}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to export exchanges to {filepath}: {e}")
        return False


def import_exchanges_from_json(filepath: Union[str, Path]) -> int:
    """
    Import exchange data from JSON file.
    
    Args:
        filepath: Path to JSON file containing exchange data
        
    Returns:
        Number of exchanges successfully imported
        
    Example:
        >>> count = import_exchanges_from_json("exchanges.json")
        >>> count > 0
        True
    """
    try:
        # Validate filepath
        if isinstance(filepath, str):
            filepath = Path(filepath)
        
        if not isinstance(filepath, Path):
            raise ExchangeDataError(f"Invalid filepath type: {type(filepath)}")
        
        if not filepath.exists():
            raise FileNotFoundError(f"File not found: {filepath}")
        
        # Read file
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Validate data structure
        if not isinstance(data, dict):
            raise ExchangeDataError("Invalid JSON format: expected dictionary")
        
        # Import exchanges
        imported_count = 0
        for name, exchange_data in data.items():
            try:
                # Validate required fields
                required_fields = ['name', 'logo_filename', 'website', 'supported_pairs', 'notes']
                for field