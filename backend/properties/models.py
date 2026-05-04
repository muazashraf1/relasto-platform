from django.db import models
from accounts.models import User
from django.utils.text import slugify
import uuid


# class Property(models.Model):
#     # agent = models.ForeignKey(User, on_delete=models.CASCADE, is_agent=True)  # agent just check only in viws not in foreign key
#     agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name="properties")
#     title = models.TextField()
#     description = models.TextField(blank=True, null=True)
#     price = models.IntegerField()
#     PROPERTY_STATUS = [
#         ("sale", "For Sale"),
#         ("rent", "For Rent"),
#     ]
#     PROPERTY_TYPE = [
#         ("residential", "Residential"),
#         ("commercial", "Commercial"),
#         ("industrial", "Industrial"),
#         ("agricultural", "Agricultural"),
#     ]
#     status = models.CharField(max_length=20, choices=PROPERTY_STATUS)
#     type = models.CharField(max_length=20, choices=PROPERTY_TYPE)
#     city = models.TextField(null=True)
#     address = models.TextField(null=True)
#     slug = models.SlugField(unique=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = slugify(self.title) + "-" + str(uuid.uuid4())[:5]
#         super().save(*args, **kwargs)


from django.db import models
from accounts.models import User
from django.utils.text import slugify

class Property(models.Model):

    PROPERTY_STATUS = [
        ("sale", "For Sale"),
        ("rent", "For Rent"),
    ]

    PROPERTY_TYPE = [
        ("residential", "Residential"),
        ("commercial", "Commercial"),
        ("industrial", "Industrial"),
        ("agricultural", "Agricultural"),
    ]

    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name="properties")

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.IntegerField()

    status = models.CharField(max_length=10, choices=PROPERTY_STATUS)
    type = models.CharField(max_length=20, choices=PROPERTY_TYPE)

    city = models.CharField(max_length=100)
    address = models.TextField()

    slug = models.SlugField(unique=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='properties/images/')
    is_primary = models.BooleanField(default=False)

class PropertyFeature(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="features")
    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
