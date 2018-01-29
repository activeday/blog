from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class ApartmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Apartment
		fields = ('owner','id', 'name', 'rent', 'county', 'location', 'image', 'available', 'sdtype', 'description')

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username', 'email')


class HomeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Home
		fields = ('id', 'name', 'rent', 'county', 'location', 'image', 'available', 'bathrooms', 'bedrooms')
