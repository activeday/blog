from django.core.urlresolvers import reverse
from django.http import HttpResponseNotFound

class RestrictAdminMiddleware(object):
	def process_request(self, request):
		if request.path == reverse('admin:index'):
			if not (request.user.is_active and request.user.is_superuser):
				return HttpResponseNotFound('Page not found')

