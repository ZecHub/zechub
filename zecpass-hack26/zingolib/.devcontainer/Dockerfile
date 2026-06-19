# Base on the same image that we use in CI
FROM zingodevops/ci-build:002

# Install devcontainer-specific tools
RUN apt-get update \
 && apt-get install -y htop \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
