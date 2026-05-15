from rest_framework import serializers

from .models import Category, Transaction

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ['user']

class TransactionSerializer(serializers.ModelSerializer):

    """
    Readable category object
    */
    category = CategorySerializer(
        read_only=True
    )

    """
    
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

    class Meta:
        model = Transaction

        fields = "__all__"

        read_only_fields = ["user"]