from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from properties.models import Property
from visits.serializers import CreateVisitRequestSerializer, visitListSerializer
from rest_framework.permissions import IsAuthenticated
from visits.models import VisitRequest
from django.shortcuts import get_object_or_404

# Create your views here.


class CreateVisitRequestView(APIView):
    permission_classes = [IsAuthenticated]

    # def post(self, request):
    def post(self, request, slug):
        # property = VisitRequest.objects.filter(property=property)
        prop = get_object_or_404(Property, slug=slug)
        serializer = CreateVisitRequestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                user=request.user,
                property=prop,
                agent=prop.agent
            )
            return Response({"message": "Visit request created!"})

        return Response(serializer.errors, status=400)


class AgentVisitRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requests = VisitRequest.objects.filter(agent=request.user)
        serializer = visitListSerializer(requests, many=True)
        return Response(serializer.data)


class UpdateVisitStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        visit = get_object_or_404(VisitRequest, id=id)

        if visit.agent != request.user:
            return Response({"message": "Not Allowed"}, status=403)

        visit.is_reviewed = request.data.get("is_reviewed", visit.is_reviewed)
        visit.is_completed = request.data.get("is_completed", visit.is_completed)
        visit.save()
        return Response({"message": "Status updated!"})
