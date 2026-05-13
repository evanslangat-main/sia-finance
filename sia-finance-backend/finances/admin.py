from django.contrib import admin

# Register your models here.

#import models
from .models import Category, Transaction

#register models in admin

admin.site.register(Category)
admin.site.register(Transaction)
