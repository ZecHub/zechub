#!/usr/bin/env python3
"""
ZecHub Visual Learning Map - Production Grade Implementation
Generates an interactive ASCII/terminal-based learning path for Zcash beginners,
sorted by experience level. Supports color-coded output, input validation,
comprehensive error handling, and performance optimizations.

Author: ZecHub Development Team
Version: 2.0.0
License: MIT
"""

import sys
import logging
from typing import Dict, List, Optional, Tuple, Union, Final, Set, Any
from dataclasses import dataclass, field
from enum import Enum, auto
from pathlib import Path
import json
import os
import argparse
from datetime import datetime
from functools import lru_cache

# ---------------------------------------------------------------------------
# Configuration and Constants
# ---------------------------------------------------------------------------

# Logging configuration
LOGGING_CONFIG: Final[Dict[str, Union[str, int]]] = {
    "level": logging.INFO,
    "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    "datefmt": "%Y-%m-%d %H:%M:%S",
}

# Setup logger with proper configuration
logger = logging.getLogger("zechub_map")
logger.setLevel(LOGGING_CONFIG["level"])

# Create console handler
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(logging.Formatter(
    LOGGING_CONFIG["format"],
    datefmt=LOGGING_CONFIG["datefmt"]
))
logger.addHandler(console_handler)

# Create file handler for persistent logging
try:
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)
    file_handler = logging.FileHandler(
        log_dir / f"zechub_map_{datetime.now().strftime('%Y%m%d')}.log"
    )
    file_handler.setFormatter(logging.Formatter(
        LOGGING_CONFIG["format"],
        datefmt=LOGGING_CONFIG["datefmt"]
    ))
    logger.addHandler(file_handler)
except (OSError, PermissionError) as e:
    logger.warning(f"Could not create file handler: {e}")

# Terminal color codes (ANSI)
class Colors(Enum):
    """ANSI color codes for terminal output."""
    RESET = "\033[0m"
    BOLD = "\033[1m"
    RED = "\033[91m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    MAGENTA = "\033[95m"
    CYAN = "\033[96m"
    WHITE = "\033[97m"
    GRAY = "\033[90m"

# Unicode box-drawing characters
class BoxChars(Enum):
    """Unicode box-drawing characters for map rendering."""
    HORIZONTAL = "─"
    VERTICAL = "│"
    DOWN_RIGHT = "┌"
    DOWN_LEFT = "┐"
    UP_RIGHT = "└"
    UP_LEFT = "┘"
    T_DOWN = "┬"
    T_UP = "┴"
    T_RIGHT = "├"
    T_LEFT = "┤"
    CROSS = "┼"
    ARROW_DOWN = "▼"
    ARROW_RIGHT = "▶"

# ---------------------------------------------------------------------------
# Custom Exceptions
# ---------------------------------------------------------------------------

class ZecHubMapError(Exception):
    """Base exception for ZecHub map errors."""
    pass

class MapDataError(ZecHubMapError):
    """Exception raised for map data validation errors."""
    pass

class RenderingError(ZecHubMapError):
    """Exception raised for rendering errors."""
    pass

class ConfigurationError(ZecHubMapError):
    """Exception raised for configuration errors."""
    pass

# ---------------------------------------------------------------------------
# Data Models
# ---------------------------------------------------------------------------

class ExperienceLevel(Enum):
    """Experience levels for the learning map."""
    BEGINNER = auto()
    INTERMEDIATE = auto()
    ADVANCED = auto()

    def __str__(self) -> str:
        """Return human-readable string representation."""
        return self.name.capitalize()

@dataclass(frozen=True)
class Resource:
    """Represents a single learning resource with validation."""
    name: str
    description: str
    url: Optional[str] = None
    tags: List[str] = field(default_factory=list)

    def __post_init__(self) -> None:
        """Validate resource data after initialization."""
        if not self.name or not self.name.strip():
            raise MapDataError("Resource name cannot be empty")
        if not self.description or not self.description.strip():
            raise MapDataError("Resource description cannot be empty")
        if self.url and not self.url.startswith(("http://", "https://")):
            raise MapDataError(f"Invalid URL format: {self.url}")
        
        # Validate tags
        if not all(isinstance(tag, str) and tag.strip() for tag in self.tags):
            raise MapDataError("All tags must be non-empty strings")

@dataclass(frozen=True)
class MapNode:
    """Represents a node in the learning map hierarchy."""
    title: str
    level: ExperienceLevel
    resources: List[Resource] = field(default_factory=list)
    children: List['MapNode'] = field(default_factory=list)
    is_current_location: bool = False

    def __post_init__(self) -> None:
        """Validate node data after initialization."""
        if not self.title or not self.title.strip():
            raise MapDataError("Node title cannot be empty")
        if not isinstance(self.level, ExperienceLevel):
            raise MapDataError(f"Invalid experience level: {self.level}")
        
        # Validate children recursively
        for child in self.children:
            if not isinstance(child, MapNode):
                raise MapDataError(f"Invalid child type: {type(child)}")

    def get_all_resources(self) -> List[Resource]:
        """Get all resources from this node and its children."""
        resources = list(self.resources)
        for child in self.children:
            resources.extend(child.get_all_resources())
        return resources

    def count_nodes(self) -> int:
        """Count total nodes in the tree."""
        count = 1
        for child in self.children:
            count += child.count_nodes()
        return count

# ---------------------------------------------------------------------------
# Map Data Provider
# ---------------------------------------------------------------------------

class MapDataProvider:
    """Provides and validates the learning map data structure."""

    @staticmethod
    def get_default_map() -> MapNode:
        """Return the default ZecHub learning map structure."""
        try:
            return MapNode(
                title="YOU ARE HERE",
                level=ExperienceLevel.BEGINNER,
                resources=[
                    Resource("Complete Beginner", "Start your Zcash journey here")
                ],
                is_current_location=True,
                children=[
                    MapNode(
                        title="BEGINNER RESOURCES",
                        level=ExperienceLevel.BEGINNER,
                        resources=[
                            Resource("What is Zcash?", "Introduction to Zcash"),
                            Resource("How do I use it?", "Getting started guide")
                        ],
                        children=[
                            MapNode(
                                title="Understanding Zcash",
                                level=ExperienceLevel.BEGINNER,
                                resources=[
                                    Resource("What is Zcash?", "Overview of Zcash"),
                                    Resource("How Zcash is Different", "Unique features"),
                                    Resource("Privacy Explained", "How privacy works"),
                                    Resource("Shielded vs Transparent", "Address types comparison")
                                ]
                            ),
                            MapNode(
                                title="Getting Started",
                                level=ExperienceLevel.BEGINNER,
                                resources=[
                                    Resource("Download a Wallet", "Wallet installation guide"),
                                    Resource("Receive Your First ZEC", "How to receive ZEC"),
                                    Resource("Make a Private Tx", "Creating private transactions"),
                                    Resource("Check Your Balance", "Balance verification")
                                ]
                            )
                        ]
                    ),
                    MapNode(
                        title="INTERMEDIATE RESOURCES",
                        level=ExperienceLevel.INTERMEDIATE,
                        resources=[
                            Resource("How does it work under the hood?", "Technical overview")
                        ],
                        children=[
                            MapNode(
                                title="Technical Concepts",
                                level=ExperienceLevel.INTERMEDIATE,
                                resources=[
                                    Resource("zk-SNARKs Explained", "Zero-knowledge proofs"),
                                    Resource("Shielded Protocol", "Protocol details"),
                                    Resource("Address Types", "Address format explanation"),
                                    Resource("Transaction Structure", "Transaction anatomy")
                                ]
                            ),
                            MapNode(
                                title="Practical Skills",
                                level=ExperienceLevel.INTERMEDIATE,
                                resources=[
                                    Resource("Running a Full Node", "Node setup guide"),
                                    Resource("Mining Zcash", "Mining instructions"),
                                    Resource("Using Light Wallets", "Light wallet usage"),
                                    Resource("Exchanges & Liquidity", "Exchange information")
                                ]
                            )
                        ]
                    ),
                    MapNode(
                        title="ADVANCED RESOURCES",
                        level=ExperienceLevel.ADVANCED,
                        resources=[
                            Resource("I want to build on Zcash!", "Development resources")
                        ],
                        children=[
                            MapNode(
                                title="Development",
                                level=ExperienceLevel.ADVANCED,
                                resources=[
                                    Resource("SDK Documentation", "Development SDK guide"),
                                    Resource("Smart Contracts", "Zcash smart contracts"),
                                    Resource("API Reference", "API documentation"),
                                    Resource("Integration Guide", "Integration tutorial")
                                ]
                            ),
                            MapNode(
                                title="Research",
                                level=ExperienceLevel.ADVANCED,
                                resources=[
                                    Resource("Protocol Papers", "Research papers"),
                                    Resource("Security Audits", "Security documentation"),
                                    Resource("Performance Analysis", "Performance metrics"),
                                    Resource("Future Roadmap", "Development roadmap")
                                ]
                            )
                        ]
                    )
                ]
            )
        except (MapDataError, ValueError) as e:
            logger.error(f"Failed to create default map: {e}")
            raise MapDataError(f"Default map creation failed: {e}") from e

    @staticmethod
    def load_from_file(filepath: Union[str, Path]) -> MapNode:
        """Load map data from a JSON file with validation."""
        try:
            path = Path(filepath)
            if not path.exists():
                raise FileNotFoundError(f"Map file not found: {path}")
            if not path.suffix == '.json':
                raise ValueError(f"Invalid file format: {path.suffix}")
            
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            return MapDataProvider._parse_map_node(data)
        except (FileNotFoundError, json.JSONDecodeError, MapDataError) as e:
            logger.error(f"Failed to load map from file: {e}")
            raise MapDataError(f"Map loading failed: {e}") from e

    @staticmethod
    def _parse_map_node(data: Dict[str, Any]) -> MapNode:
        """Parse a dictionary into a MapNode with validation."""
        try:
            level_map = {
                "beginner": ExperienceLevel.BEGINNER,
                "intermediate": ExperienceLevel.INTERMEDIATE,
                "advanced": ExperienceLevel.ADVANCED
            }
            
            level_str = data.get("level", "beginner").lower()
            if level_str not in level_map:
                raise MapDataError(f"Invalid experience level: {level_str}")
            
            resources = []
            for res_data in data.get("resources", []):
                resources.append(Resource(
                    name=res_data.get("name", ""),
                    description=res_data.get("description", ""),
                    url=res_data.get("url"),
                    tags=res_data.get("tags", [])
                ))
            
            children = []
            for child_data in data.get("children", []):
                children.append(MapDataProvider._parse_map_node(child_data))
            
            return MapNode(
                title=data.get("title", ""),
                level=level_map[level_str],
                resources=resources,
                children=children,
                is_current_location=data.get("is_current_location", False)
            )
        except (KeyError, ValueError, MapDataError) as e:
            logger.error(f"Failed to parse map node: {e}")
            raise MapDataError(f"Map node parsing failed: {e}") from e

# ---------------------------------------------------------------------------
# Map Renderer
# ---------------------------------------------------------------------------

class MapRenderer:
    """Renders the learning map as an ASCII/terminal visualization."""

    def __init__(self, use_colors: bool = True, max_width: int = 80):
        """
        Initialize the renderer.
        
        Args:
            use_colors: Whether to use ANSI color codes
            max_width: Maximum width for rendering
        
        Raises:
            ConfigurationError: If parameters are invalid
        """
        if max_width < 40:
            raise ConfigurationError(f"Max width too small: {max_width}")
        
        self.use_colors = use_colors
        self.max_width = max_width
        self._color_cache: Dict[str, str] = {}

    def _colorize(self, text: str, color: Colors) -> str:
        """Apply color to text if enabled."""
        if not self.use_colors:
            return text
        return f"{color.value}{text}{Colors.RESET.value}"

    def _get_level_color(self, level: ExperienceLevel) -> Colors:
        """Get color for experience level."""
        color_map = {
            ExperienceLevel.BEGINNER: Colors.GREEN,
            ExperienceLevel.INTERMEDIATE: Colors.YELLOW,
            ExperienceLevel.ADVANCED: Colors.RED
        }
        return color_map.get(level, Colors.WHITE)

    def _format_title(self, title: str, level: ExperienceLevel, 
                      is_current: bool = False) -> str:
        """Format a node title with appropriate styling."""
        color = self._get_level_color(level)
        if is_current:
            title = f"★ {title} ★"
            color = Colors.CYAN
        return self._colorize(f" {title} ", color)

    def _render_node(self, node: MapNode, prefix: str = "", 
                     is_last: bool = True, depth: int = 0) -> List[str]:
        """
        Render a single node and its children.
        
        Args:
            node: The node to render
            prefix: Current line prefix
            is_last: Whether this is the last child
            depth: Current depth in the tree
        
        Returns:
            List of rendered lines
        """
        lines: List[str] = []
        
        try:
            # Build the node line
            connector = BoxChars.UP_RIGHT.value if is_last else BoxChars.T_RIGHT.value
            node_line = f"{prefix}{connector}{BoxChars.HORIZONTAL.value}"
            
            # Add title
            title = self._format_title(
                node.title, 
                node.level, 
                node.is_current_location
            )
            node_line += title
            
            # Add level indicator
            level_text = f"[{node.level.name}]"
            node_line += self._colorize(level_text, Colors.GRAY)
            
            lines.append(node_line)
            
            # Build child prefix
            child_prefix = f"{prefix}{'    ' if is_last else f'{BoxChars.VERTICAL.value}   '}"
            
            # Render resources
            for i, resource in enumerate(node.resources):
                is_last_resource = (i == len(node.resources) - 1 and not node.children)
                resource_prefix = f"{child_prefix}{BoxChars.T_RIGHT.value if not is_last_resource else BoxChars.UP_RIGHT.value}"
                resource_line = f"{resource_prefix}{BoxChars.HORIZONTAL.value} {resource.name}"
                if resource.description:
                    resource_line += f" - {resource.description[:50]}..."
                lines.append(resource_line)
            
            # Render children
            for i, child in enumerate(node.children):
                is_last_child = (i == len(node.children) - 1)
                child_lines = self._render_node(
                    child, 
                    child_prefix, 
                    is_last_child,
                    depth + 1
                )
                lines.extend(child_lines)
            
        except (RenderingError, ValueError) as e:
            logger.error(f"Failed to render node '{node.title}': {e}")
            lines.append(f"{prefix}Error rendering node: {e}")
        
        return lines

    def render(self, root_node: MapNode) -> str:
        """
        Render the complete learning map.
        
        Args:
            root_node: The root node of the map
        
        Returns:
            Rendered map as a string
        
        Raises:
            RenderingError: If rendering fails
        """
        try:
            if not isinstance(root_node, MapNode):
                raise RenderingError("Invalid root node type")
            
            lines: List[str] = []
            
            # Add header
            header = "=" * self.max_width
            lines.append(self._colorize(header, Colors.BOLD))
            lines.append(self._colorize(
                "ZecHub Learning Map - Sorted by Experience Level".center(self.max_width),
                Colors.BOLD
            ))
            lines.append(self._colorize(header, Colors.BOLD))
            lines.append("")
            
            # Add legend
            lines.append(self._colorize("Legend:", Colors.BOLD))
            lines.append(f"  {self._colorize('★', Colors.CYAN)} Current Location")
            lines.append(f"  {self._colorize('[BEGINNER]', Colors.GREEN)} Beginner Level")
            lines.append(f"  {self._colorize('[INTERMEDIATE]', Colors.YELLOW)} Intermediate Level")
            lines.append(f"  {self._colorize('[ADVANCED]', Colors.RED)} Advanced Level")
            lines.append("")
            
            # Render the tree
            tree_lines = self._render_node(root_node)
            lines.extend(tree_lines)
            
            # Add footer
            lines.append("")
            lines.append(self._colorize("-" * self.max_width, Colors.GRAY))
            lines.append(self._colorize(
                f"Total Nodes: {root_node.count_nodes()} | "
                f"Total Resources: {len(root_node.get_all_resources())}",
                Colors.GRAY
            ))
            
            return "\n".join(lines)
            
        except (RenderingError, ValueError) as e:
            logger.error(f"Failed to render map: {e}")
            raise RenderingError(f"Map rendering failed: {e}") from e

# ---------------------------------------------------------------------------
# Main Application
# ---------------------------------------------------------------------------

class ZecHubMapApp:
    """Main application class for the ZecHub Learning Map."""

    def __init__(self):
        """Initialize the application with configuration."""
        self.renderer: Optional[MapRenderer] = None
        self.map_data: Optional[MapNode] = None
        self._setup_complete = False

    def setup(self, use_colors: bool = True, max_width: int = 80,
              map_file: Optional[Union[str, Path]] = None) -> None:
        """
        Setup the application with configuration.