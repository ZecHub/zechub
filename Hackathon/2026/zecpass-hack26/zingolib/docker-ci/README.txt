The container test image is versioned from `.env.testing-artifacts`,
`rust-toolchain.toml`, and this `docker-ci` directory.

For local reproducible test runs:
 - update `.env.testing-artifacts` if lightwalletd, zcashd, or the Zaino image tag changes
 - run `makers build-image` to build the local image
 - run `makers run` to execute tests inside the image

For Github CI workflow images:
 - run `makers compute-image-tag` to get the reproducible image tag
 - run `docker login` and fill in the credentials for DockerHub
 - run `docker push zingodevops/ci-build:<computed image tag>` to push to DockerHub
 - update github workflow files to the new image tag

 NOTE: if `sudo` is necessary use `sudo` with all commands including login.
