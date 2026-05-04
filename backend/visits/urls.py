from django.urls import path
from visits import views

urlpatterns = [
    path("create-request/<slug:slug>/", views.CreateVisitRequestView.as_view()),
    path("my-request/", views.AgentVisitRequestsView.as_view()),
    path("update-request/<int:id>/", views.UpdateVisitStatusView.as_view()),
]



# testing post man 

# 1- register the new user ----> POST http://127.0.0.1:8000/api/accounts/register/
                            # {
                            #   "username": "salar",
                            #   "email": "salar@gmail.com",
                            #   "password": "12345678",
                            #   "password2": "12345678",
                            #   "is_agent": false
                            # }

# 2- login and authenticated 
# 3- Create Property (as salar) ---> POST /api/properties/create/
                    # {
                    #   "title": "Farm House Islamabad",
                    #   "description": "Beautiful farm house",
                    #   "price": 200000,
                    #   "status": "sale",
                    #   "type": "residential",
                    #   "city": "Islamabad",
                    #   "address": "Bani Gala"
                    # }  --> slug  = farm-house-islamabad

# 4-Register Normal User (ertugrul) --> POST /api/accounts/register/

                # {
                #   "username": "ertugrul",
                #   "email": "ertugrul@gmail.com",
                #   "password": "12345678",
                #   "password2": "12345678",
                #   "is_agent": false
                # }

# 5-Login (ertugrul)

# 6-Create Visit Request -->    POST /api/visits/create-request/farm-house-islamabad/

                    # {
                    #   "phone": "03001234567",
                    #   "email": "ertugrul@gmail.com",
                    #   "preferred_date": "2026-05-01T12:00:00Z"
                    # }


# 7- Agent sees requests --> login back as salars ---> GET /api/visits/my-requests/

# 8- Agent updates status -->PUT /api/visits/update-request/1/

                    # {
                    #   "is_reviewed": true,
                    #   "is_completed": true
                    # }