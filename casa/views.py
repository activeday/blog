from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .filters import *
from django.contrib.auth.models import User
from rest_framework.pagination import PageNumberPagination
import time



# Create your views here.
def username_generate(request):
	if request.user.is_authenticated():
		user_email = request.user.email
		at_index = user_email.index('@')
		return {'username': user_email[:at_index] }
	else:
		return {'username': ''}

def is_user_authenticated(request):
	if request.user.is_authenticated():
		return JsonResponse({'is_authenticated': True})
	else:
		return JsonResponse({'is_authenticated': False})

def welcome(request):
	context = {}
	context['username'] = username_generate(request)['username']
	context['title'] = 'welcome'
	return render(request, 'welcome.html', context)
    	

def homes(request):
	return render(request, 'layout.html')

def hostels(request):
	return render(request, 'hostels.html')

def offices(request):
	return render(request, 'offices.html')

def hotel_rooms(request):
	return render(request, 'hotelrooms.html')

def stalls(request):
	return render(request, 'footer.html')

@api_view(['GET'])
def account(request):
	if not request.is_ajax():
		return render(request, 'account.html', username_generate(request))
	else:
		pass
		

class ApartmentList(APIView):
	def get_queryset(self):
		queryset = Apartment.objects.all()

		if 'type' in self.request.GET and not self.request.GET['type'] == "":
			queryset = queryset.filter(sdtype = self.request.GET['type'])

		if 'county' in self.request.GET and not self.request.GET['county'] == "":
			queryset = queryset.filter(county = self.request.GET['county'])

		if 'location' in self.request.GET and not self.request.GET['location'] == "":
			queryset = queryset.filter(location__contains = self.request.GET['location'])

		if 'maximumrent' in self.request.GET and not self.request.GET['maximumrent'] == "":
			queryset = queryset.filter(rent__lte = self.request.GET['maximumrent'])

		if 'minimumrent' in self.request.GET and not self.request.GET['minimumrent'] == "":
			queryset = queryset.filter(rent__gte = self.request.GET['minimumrent'])

		return queryset

	def get(self, request, format=None):
		if request.is_ajax():
			apartments = self.get_queryset()
			paginator = PageNumberPagination()
			result_page = paginator.paginate_queryset(apartments, request)
			apartments_serialized = ApartmentSerializer(result_page, many=True)
			time.sleep(3)
			return paginator.get_paginated_response(apartments_serialized.data)
		else:
			context = {}
			context['username'] = username_generate(request)['username']
			context['title'] = 'apartments'
			return render(request, 'apartments.html', context)
			

	def post(self, request, format=None):
		name = request.POST['name'].lower()
		sdtype = request.POST['sd-type']
		rent = float(request.POST['rent'])
		county = request.POST['county'].lower()
		location = request.POST['location'].lower()
		description = request.POST['description'].lower()
		available = True
		owner = request.user
		
		image = None	
		if 'image' in request.FILES:
			image = request.FILES['image']

		apartment = Apartment(name=name, sdtype=sdtype, rent=rent, county=county, location=location, description=description, available=available, owner=owner, image=image)

		apartment.save()
		time.sleep(5)
		return Response(status=status.HTTP_201_CREATED)	


class OwnerDetails(APIView):
	def get(self, request, format=None):
		id = request.GET['id']
		user_details = User.objects.get(id = id)
		user_details_serialialized = UserSerializer(user_details)
		time.sleep(5)
		return Response(user_details_serialialized.data)


class HomeList(APIView):
	def get(self, request, format=None):
		if request.is_ajax():
			homes = Home.objects.all()
			homes_serialized = HomeSerializer(apartments, many=True)
			return Response(homes_serialized.data)
		else:
			return render(request, 'homes.html')
			

	def post(self, request, format=None):
		apartment_post = ApartmentSerializer(data=request.data)
		if apartment_post.is_valid():
			apartment_post.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(apartment_post.errors, status=status.HTTP_201_BAD_REQUEST)	
	 	 
