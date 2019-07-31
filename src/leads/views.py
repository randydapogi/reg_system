from django.shortcuts import render
from leads.models import Lead
from leads.serializers import LeadSerializer
from rest_framework import generics, status

from rest_framework.viewsets import ModelViewSet, ViewSet

from rest_framework.response import Response

from leads.myforms import ImageUploadForm
from leads.models import Image

from rest_framework.views import APIView
from leads.serializers import ImageSerializer
from rest_framework.parsers import FileUploadParser


from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# from django.utils.decorators import method_decorator, csrf_exempt

# @csrf_exempt
@method_decorator(csrf_exempt, name='dispatch')
class LeadViewSet(ModelViewSet):
    # @method_decorator(csrf_exempt)
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


    def create(self, request):
        print("create")
        serializer = LeadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # print(serializer)
        self.perform_create(serializer)
        # headers = self.get_success_headers(serializer.data)

        # print(serializer.data)
        custom_response = {"product": serializer.data,
                           "detail": ["Product successfully created."]}

        return Response(custom_response, status=status.HTTP_201_CREATED)

    def update(self, request, lead_id=None):
        instance = self.queryset.get(pk=lead_id)
        print(instance)
        print(request.data['file'])

        instance.image = request.data['file']
        # instance.IsValidated = request.data['isValid']
        instance.status = request.data['status']
        instance.hasImage = True
        print(instance)

        instance.save()

        custom_response = {"product": "asd",
                           "detail": ["Product successfully created."]}

        return Response(custom_response, status=status.HTTP_201_CREATED)



class ImageUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, lead_id=None):
        print(lead_id)
    
        file_serializer = ImageSerializer(data=request.data, context={"lead_id": lead_id})
        # file_serializer = ImageSerializer(data=request.data)
    
        print(request.data)
        #   print(request)
        print('trying')
        if file_serializer.is_valid():
            print('valide')
            file_serializer.save()
            # self.perform_create(file_serializer)
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(file_serializer.errors)
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)