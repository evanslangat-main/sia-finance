from rest_framework import serializers

from .models import Category, Transaction

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ['user']

class TransactionSerializer(serializers.ModelSerializer):
    """
    Transaction Serializer
    Handles both readable category object and writable category_id
    """
    
    # Readable category object for GET requests
    category = CategorySerializer(
        read_only=True
    )
    
    # Writable category_id for POST/PUT requests
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Transaction
        fields = ["id", "amount", "description", "date", "type", "category", "category_id", "created_at"]
        read_only_fields = ["user", "created_at"]