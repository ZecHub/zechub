# CipherScan

## Overview

CipherScan is a comprehensive SSL/TLS cipher scanning tool that analyzes the cryptographic configurations of servers. It helps identify weak cipher suites, protocol versions, and certificate issues.

## Features

- **Cipher Suite Detection**: Identifies all supported cipher suites on a target server
- **Protocol Version Analysis**: Checks SSLv3, TLS 1.0, TLS 1.1, TLS 1.2, TLS 1.3 support
- **Certificate Validation**: Verifies certificate chain and expiration
- **Vulnerability Checks**: Tests for known TLS vulnerabilities (BEAST, POODLE, Heartbleed, etc.)
- **Configuration Grading**: Assigns a security grade (A+ through F) based on Mozilla SSL guidelines

## Installation

```bash
git clone https://github.com/mozilla/cipherscan.git
cd cipherscan
```

## Usage

```bash
# Basic scan
./cipherscan example.com

# Full output with all details
./cipherscan -a example.com

# Scan specific port
./cipherscan example.com:8443
```

## Interpreting Results

| Grade | Meaning |
|-------|---------|
| A+ | Excellent - Modern configuration |
| A | Good - Minor improvements possible |
| B | Acceptable - Some outdated configs |
| C | Needs improvement |
| F | Insecure - Immediate action required |

## Integration with Zcash

CipherScan can be used to verify TLS configurations of Zcash nodes and RPC endpoints to ensure secure communications.

## Related Tools

- SSL Labs (https://www.ssllabs.com/ssltest/)
- testssl.sh
- nmap --script ssl-enum-ciphers

## References

- Mozilla SSL Configuration Generator: https://ssl-config.mozilla.org/
- IANA TLS Cipher Suites: https://www.iana.org/assignments/tls-parameters/
