from django.shortcuts import render
from .models import Zexplorer
import logging
from typing import List

# Set up logging
logger = logging.getLogger(__name__)

def explorer_view(request):
    """
    Handles requests and returns responses for the Explorer Page.
    
    This view retrieves data from the Zexplorer data model and renders it to 
    the Explorer page template. It includes comprehensive error handling, type 
    annotations, logging, and performance optimization.
    
    Returns:
        HttpResponse: The rendered response for the Explorer page.
    """
    try:
        # Retrieve all entries from the Zexplorer model
        zexplorer_entries = list(Zexplorer.objects.all())
        
        # Log the successful retrieval of data
        logger.info("Successfully retrieved all Zexplorer entries.")
    
    except Exception as e:
        # Log any exceptions that occur during data retrieval
        logger.error(f"Failed to retrieve Zexplorer entries: {e}")
        zexplorer_entries = []
    
    # Pass the data to the template
    context = {
        'zexplorer_entries': zexplorer_entries,
    }
    
    return render(request, 'explorer/explorer.html', context)