from rest_framework import serializers
from properties.models import *


class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["title", "description", "price", "status", "type", "city", "address"]


# class PropertyListSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Property
#         fields = ["id", "title", "price", "city", "slug", "primary_image"]


#         def get_primary_image(self, obj):
#             image = obj.images.filter(is_primary=True).first()
#
#          return image.image.url if image else None


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ["key", "value"]


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_agent"]


class PropertyListSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()
    features = FeatureSerializer(many=True, read_only=True)
    agent = AgentSerializer(read_only=True)

    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "price",
            "city",
            "slug",
            "primary_image",
            "features",
            "address",
            "agent",
        ]

    def get_primary_image(self, obj):
        image = obj.images.filter(is_primary=True).first()
        return image.image.url if image else None


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["image", "is_primary"]


class PropertyDetailSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    features = FeatureSerializer(many=True, read_only=True)
    agent = AgentSerializer(read_only=True)
    # agent = UserSerializer(read_only=True)

    class Meta:
        model = Property
        fields = "__all__"
