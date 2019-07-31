from django.db import models



# Create your models here.
class Image(models.Model):
    file = models.FileField(blank=False, null=False, default=None)
    # lead = models.ForeignKey(
    #     Lead, on_delete=models.CASCADE, blank=True
    # )
    def __str__(self):
        return self.file.name

def upload_file_name(instance, filename):
    """
    Format photos upload filename
    """

    lead = instance

    ext = filename.split('.')[-1]
    # filename = "%s/%s/image-%s.%s" % (
    #     variant.product.title.lower().replace(' ', '_'),
    #     variant.name.lower().replace(' ', '_'),
    #     instance.id,
    #     ext,
    # )

    new_filename = "%d_%s.%s" % (instance.id, filename, ext)
    return new_filename

class Lead(models.Model):
    status_choices = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Rejected', 'Rejected'),
        ('Showed', 'Showed'),
    ]
    status = models.CharField(
        max_length=10,
        choices=status_choices,
        default='Pending',
    )



    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    isValidated = models.BooleanField(blank=True, default=False)

    hasImage = models.BooleanField(blank=True, default=False)
    # image = models.ImageField(upload_to = 'pic_folder/')
    created_at = models.DateTimeField(auto_now_add=True)
    # image = models.ForeignKey(
    #     Image, on_delete=models.CASCADE, blank=True
    # )
    image = models.ImageField(upload_to=upload_file_name, blank=True, null=False, default=None)

