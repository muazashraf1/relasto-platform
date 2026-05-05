from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


def optimize_image(image_field, max_width=1200, max_height=1200, quality=85):
    """
    Optimize image by resizing and compressing
    
    Args:
        image_field: Django ImageField instance
        max_width: Maximum width in pixels
        max_height: Maximum height in pixels
        quality: JPEG quality (1-95)
    
    Returns:
        ContentFile with optimized image
    """
    img = Image.open(image_field)
    
    # Convert RGBA to RGB if necessary
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
        img = background
    
    # Resize image maintaining aspect ratio
    img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
    
    # Save optimized image
    img_io = BytesIO()
    img.save(img_io, format='JPEG', quality=quality, optimize=True)
    img_io.seek(0)
    
    # Get original filename
    filename = image_field.name.split('/')[-1]
    if not filename.endswith('.jpg'):
        filename = filename.rsplit('.', 1)[0] + '.jpg'
    
    return ContentFile(img_io.read(), name=filename)
