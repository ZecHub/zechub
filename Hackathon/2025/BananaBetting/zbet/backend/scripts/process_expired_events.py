#!/usr/bin/env python3
"""
Automated script to process expired betting events.

This script should be run periodically (e.g., every hour) via cron job to:
1. Check for events past their settlement deadline
2. Attempt consensus-based settlement
3. Refund bets if no consensus can be reached

Example cron job (run every hour):
0 * * * * /path/to/venv/bin/python /path/to/process_expired_events.py

Environment variables required:
- DATABASE_URL
- HOUSE_ZCASH_ADDRESS  
- ZCASH_RPC_URL
- ZCASH_RPC_USER
- ZCASH_RPC_PASSWORD
"""

import os
import sys
import requests
import json
from datetime import datetime

# Configuration
API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:8000')
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME')  # Set these in environment
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')  # Set these in environment

def get_admin_token():
    """Authenticate and get admin token"""
    if not ADMIN_USERNAME or not ADMIN_PASSWORD:
        print("ERROR: ADMIN_USERNAME and ADMIN_PASSWORD environment variables must be set")
        return None
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/login/",
            data={
                "username": ADMIN_USERNAME,
                "password": ADMIN_PASSWORD
            }
        )
        
        if response.status_code == 200:
            return response.json()["access_token"]
        else:
            print(f"ERROR: Failed to authenticate: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"ERROR: Failed to get admin token: {e}")
        return None

def check_expired_events(token):
    """Check for expired events"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{API_BASE_URL}/api/admin/expired-events", headers=headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"ERROR: Failed to get expired events: {response.status_code}")
            return None
            
    except Exception as e:
        print(f"ERROR: Failed to check expired events: {e}")
        return None

def auto_settle_event(token, event_id):
    """Auto-settle a specific event"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.post(f"{API_BASE_URL}/api/events/{event_id}/auto-settle", headers=headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"ERROR: Failed to auto-settle event {event_id}: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"ERROR: Failed to auto-settle event {event_id}: {e}")
        return None

def process_expired_events(token):
    """Process all expired events (bulk endpoint)"""
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.post(f"{API_BASE_URL}/api/admin/process-expired-events", headers=headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"ERROR: Failed to process expired events: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"ERROR: Failed to process expired events: {e}")
        return None

def main():
    """Main script execution"""
    print(f"[{datetime.now()}] Starting expired events processing...")
    
    # Get admin token
    token = get_admin_token()
    if not token:
        sys.exit(1)
    
    # Check for expired events first
    expired_data = check_expired_events(token)
    if not expired_data:
        sys.exit(1)
    
    expired_count = expired_data.get("total_count", 0)
    print(f"Found {expired_count} expired events")
    
    if expired_count == 0:
        print("No expired events to process")
        return
    
    # Log details of expired events
    for event in expired_data.get("expired_events", []):
        print(f"  Event {event['id']}: {event['title']}")
        print(f"    Hours past deadline: {event['hours_past_deadline']:.1f}")
        print(f"    Validations: {event['validation_count']}")
        print(f"    Can auto-settle: {event['can_auto_settle']}")
    
    # Process expired events using auto-settle
    print("Auto-settling expired events...")
    for event in expired_data.get("expired_events", []):
        print(f"Processing event {event['id']}...")
        auto_settle_result = auto_settle_event(token, event['id'])
        if auto_settle_result:
            settlement_type = auto_settle_result.get('settlement_type', 'unknown')
            if settlement_type == 'consensus':
                print(f"  ✓ Settled with consensus: {auto_settle_result.get('winning_outcome')}")
            elif settlement_type == 'deadline_refund':
                print(f"  ✓ Refunded due to deadline: {auto_settle_result.get('total_payouts')} refunds")
            else:
                print(f"  ✓ Settled: {auto_settle_result.get('winning_outcome')}")
        else:
            print(f"  ✗ Failed to settle event {event['id']}")
    
    # Also run the bulk process for any remaining events
    print("Running bulk expired events processing...")
    result = process_expired_events(token)
    
    if result:
        print(f"Successfully processed {len(result.get('processed_events', []))} events")
        
        for processed in result.get("processed_events", []):
            event_id = processed["event_id"]
            action = processed["action"]
            
            if action == "settled_with_consensus":
                print(f"  Event {event_id}: Settled with consensus - {processed['winning_outcome']}")
                print(f"    Payouts: {processed['total_payouts']}, Amount: {processed['total_payout_amount']} ZEC")
            elif action == "cancelled_and_refunded":
                print(f"  Event {event_id}: Cancelled and refunded")
                print(f"    Refunds: {processed['total_refunds']}, Amount: {processed['total_refund_amount']} ZEC")
            elif action == "error":
                print(f"  Event {event_id}: ERROR - {processed['error']}")
    else:
        print("Failed to process expired events")
        sys.exit(1)
    
    print(f"[{datetime.now()}] Expired events processing completed")

if __name__ == "__main__":
    main()
