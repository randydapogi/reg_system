from rest_framework import serializers
from leads.models import Lead
from leads.models import Image

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

    def create(self, validated_data):
        print('serializer')
    
        lead_id = self.context['lead_id']

        print("lead id: ", lead_id)

        leads = Lead.objects.filter(id=lead_id)
        lead = leads[0]
        print(lead)
        validated_data.update({'lead': lead})
        print(validated_data)
        image = Image.objects.create(**validated_data)

        return image

