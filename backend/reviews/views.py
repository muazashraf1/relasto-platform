from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from reviews.models import Review
from reviews.serializers import ReviewCreateSerializer, ReviewListSerializer
from django.shortcuts import get_object_or_404
from accounts.models import User
from django.db.models import Avg


# class CreateReviewView(APIView):
#     permission_classes = [IsAuthenticated]
#     def post(self, request):
#         data = Review.objects.all()  👉 ❌ ye create nahi hai, ye list hai
#         serializer = ReviewCreateSerializer(data, many=True)
#         if not  serializer.agent.is_agent: 👉 ❌ serializer me aisa access nahi hota
#             KeyError
#         data.save() 👉 ❌ queryset pe save nahi hota
#         return Response(serializer.data)

# class AgentReviewListView(APIView):
#     def get(self, request, id):
#         agent_id = Review.objects.filter(id=id)
#         serializers = ReviewListSerializer(agent_id)
#         return Response(serializers.data)

# class UpdateReviewView(APIView):


class CreateReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReviewCreateSerializer(data=request.data)

        if serializer.is_valid():
            agent = serializer.validated_data["agent"]

            # check agent
            if not agent.is_agent:
                return Response({"error": "This user is not an agent"}, status=400)

            # self review
            if request.user == agent:
                return Response({"error": "You cannot review yourself"}, status=400)

            # duplicate
            if Review.objects.filter(user=request.user, agent=agent).exists():
                return Response({"error": "Already reviewed"}, status=400)

            serializer.save(user=request.user)

            return Response({"message": "Review created successfully"})

        return Response(serializer.errors, status=400)


class AgentReviewListView(APIView):
    def get(self, request, agent_id):
        agent = get_object_or_404(User, id=agent_id)

        if not agent.is_agent:
            return Response({"error": "Not an agent"}, status=400)

        reviews = Review.objects.filter(agent=agent)
        serializer = ReviewListSerializer(reviews, many=True)

        avg_rating = reviews.aggregate(avg=Avg("rating"))

        return Response({
            "average_rating": avg_rating["avg"],
            "reviews": serializer.data
        })


class UpdateReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, review_id):
        review = get_object_or_404(Review, id=review_id)

        # ownership check
        if review.user != request.user:
            return Response({"mesaseg": "Not Allowed"}, status=403)

        serializer = ReviewCreateSerializer(review, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(user=request.user, agent=review.agent)
            return Response({"message": "Updated successfully"})

        return Response(serializer.errors, status=400)



# ===== POSTMAN API testing

#------------------- STEP 1: Register Users (2 users will be created)

# 1. Agent User banao ---> POST http://127.0.0.1:8000/api/accounts/register/
                        # {
                        #   "username": "agent1",
                        #   "email": "agent1@gmail.com",
                        #   "password": "123456789",
                        #   "password2": "123456789",
                        #   "is_agent": true
                        # }

# 2. Normal User banao  --->  with same end point
                    # {
                    #   "username": "user1",
                    #   "email": "user1@gmail.com",
                    #   "password": "123456789",
                    #   "password2": "123456789",
                    #   "is_agent": false
                    # }



#------------------- STEP 2: Login (From Normal User)  ---> POST http://127.0.0.1:8000/api/accounts/token/

#------------------- STEP 3: Set the  Authorization   

#------------------- STEP 4: Create Review  ---> POST http://127.0.0.1:8000/api/reviews/create/   
#------------------- STEP 5: Get Reviews  ---> GET http://127.0.0.1:8000/api/reviews/agent/id/   


