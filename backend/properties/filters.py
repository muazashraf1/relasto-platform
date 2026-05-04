import django_filters
from properties.models import Property

class PropertyFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    city = django_filters.CharFilter(field_name="city", lookup_expr='icontains')
    type = django_filters.CharFilter(field_name="type", lookup_expr='exact')
    status = django_filters.CharFilter(field_name="status", lookup_expr='exact')

    class Meta:
        model = Property
        fields = ["city", "type", "min_price", "max_price", 'status']