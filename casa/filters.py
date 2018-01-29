
def filter_model(request, model):
	querysets = []
	sdtype = request.GET['type']
	minimumrent = request.GET['minimumrent'] or 0.00
	maximumrent = request.GET['maximumrent'] or 1000000000.00
	county = request.GET['county'] 
	location = request.GET['location']

	if sdtype and not county and not location:
		querysets.append(
			model.objects.filter(
				sdtype = sdtype
			).filter(
				rent__gte=minimumrent, rent__lte=maximumrent
			)
		)
		print('type only')
	elif sdtype and county and not location:
		querysets.append(
			model.objects.filter(
				sdtype = sdtype
			).filter(
				rent__gte=minimumrent, rent__lte=maximumrent
			).filter(
				county = county
			)
		)
		print('type and county')
	elif sdtype and location and county:
		querysets.append(
			model.objects.filter(
				sdtype = sdtype
			).filter(
				rent__gte=minimumrent, rent__lte=maximumrent
			).filter(
				county = county
			).filter(
				location__contains = location
			)
		)
		print('type and county and location')
	elif county and not sdtype and not location:
		querysets.append(
			model.objects.filter(
				county = county
			).filter(
				rent__gte=minimumrent, rent__lte=maximumrent
			)
		)
		print('county')
	elif county and location and not sdtype:
		querysets.append(
			model.objects.filter(
				rent__gte=minimumrent, rent__lte=maximumrent
			).filter(
				county = county
			).filter(
				location__contains = location
			)
		)
		print('county and location')

	elif not county and not location and not sdtype:
		querysets.append(
			model.objects.filter(
				rent__gte=minimumrent, rent__lte=maximumrent
			)
		)
	return querysets	



def filter_model2(request, model):
	querysets = []
	sdtype = request.GET['type']
	minimumrent = request.GET['minimumrent'] or 0.00
	maximumrent = request.GET['maximumrent'] or 1000000000.00
	county = request.GET['county'] 
	location = request.GET['location']

	if county and not sdtype and not location:
		return model.objects.filter(
			county = county
		).filter(
			rent__gte=minimumrent, rent__lte=maximumrent
		)