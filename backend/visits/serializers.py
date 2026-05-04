from rest_framework import serializers
from visits.models import VisitRequest


class CreateVisitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitRequest
        # fields = "__all__"
        fields = ['phone', 'email', 'preferred_date']

class visitListSerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title', read_only=True)
    class Meta:
        model = VisitRequest
        fields = "__all__"
