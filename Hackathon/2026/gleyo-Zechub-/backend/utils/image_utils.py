import io
import logging
from PIL import Image

logger = logging.getLogger("gleyo.image_utils")


def compress_image(file_bytes: bytes, max_dimension: int = 512, quality: int = 85) -> tuple[bytes, str]:
    """
    Resize and compress an uploaded image before storage upload.

    Converts to JPEG (smaller than PNG for photos, avoids alpha/CMYK edge
    cases) and shrinks to fit within max_dimension x max_dimension while
    preserving aspect ratio.

    Args:
        file_bytes: raw bytes of the uploaded image
        max_dimension: max width/height in pixels (default 512 — plenty
            for avatars, quest thumbnails, etc; use a larger value like
            1600 for banners/covers where more detail is needed)
        quality: JPEG quality 1-100 (85 is a good size/quality balance)

    Returns:
        (compressed_bytes, content_type) — content_type is always
        "image/jpeg" since we standardize output format.

    Falls back to returning the original bytes unchanged if the image
    can't be parsed/resized for any reason (corrupt file, unsupported
    format edge case) — callers should still treat the original
    extension/content-type as valid in that case, so check whether the
    returned bytes differ from the input if that distinction matters.
    """
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img = img.convert("RGB")  # normalize away alpha/CMYK/palette modes
        img.thumbnail((max_dimension, max_dimension), Image.LANCZOS)

        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=quality, optimize=True)
        compressed = buf.getvalue()

        logger.info(
            "compress_image success original_bytes=%s compressed_bytes=%s max_dimension=%s",
            len(file_bytes), len(compressed), max_dimension
        )
        return compressed, "image/jpeg"

    except Exception as e:
        logger.warning(
            "compress_image failed error=%s — falling back to original bytes unchanged",
            e
        )
        return file_bytes, None  