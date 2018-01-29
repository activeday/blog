from django.db import models
from time import time
from django.contrib.auth.models import User

#uploaded file name definition
def uploaded_file_name(instance, filename):
	return "uploads/%s_%s" % (str(time()).replace('.', '_'), filename) 


# Create your models here.
class CommonDetails(models.Model):
	owner = models.ForeignKey(User, on_delete=models.CASCADE)
	name = models.CharField(max_length=20, default="settle down listing")
	rent = models.DecimalField(max_digits=19, decimal_places=2, null=False)
	county = models.CharField(max_length=12, null=False)
	location = models.TextField(null=True)
	image = models.FileField(upload_to = uploaded_file_name, default="uploads/curtain.png")
	description = models.TextField()
	available = models.BooleanField(default=False)

	class Meta:
		abstract = True


class Apartment(CommonDetails):
	sdtype = models.CharField(null=False, max_length=20)

	def __str__(self):
		return '%s %s' % (self.sdtype, self.name)

	def save(self, *args, **kwargs):
		if self.image == None:
			self.image = "uploads/curtain.png"

		if not self.name:
			self.name = "settle down listing"

		if not self.description:
			self.description = "Not any"

		super(Apartment,self).save(*args, **kwargs)


class Home(CommonDetails):
	bathrooms = models.IntegerField()
	bedrooms = models.IntegerField(null=False, default=0)


class Hostel(CommonDetails):
	shared = models.CharField(max_length=10, null=False)
	meals = models.CharField(max_length=10, null=False)


class HotelRoom(CommonDetails):
	rooms = models.IntegerField(default=1)
	beds = models.IntegerField(default=1)
	bathrooms = models.IntegerField(default=1)


class Stall(CommonDetails):
	size = models.IntegerField(null=False)


class Office(CommonDetails):
	size = models.IntegerField(null=False)
	bathrooms = models.IntegerField(default=1)