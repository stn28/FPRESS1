from django.db import models
from django.urls import reverse
from django.utils.text import slugify

from datetime import datetime


class Category(models.Model):
    """Категория"""
    name = models.CharField("Категория", max_length=50, unique=True)
    url = models.SlugField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

class Product(models.Model):
    """Товар"""
    name = models.CharField("Название товара", max_length=200)
    brand = models.ForeignKey('BrandProduct', on_delete=models.PROTECT, related_name="product_brand", verbose_name="Бренд", default="", blank=True, null=True) #TODO Заполнить все стобцы и убрать пустые значения
    price = models.FloatField("Цена")
    description = models.TextField("Описание товара", null=True, blank=True)
    main_photo = models.ImageField("Главное фото", upload_to="product_main_photos/")
    is_avaliable = models.BooleanField("Наличие", default=True)
    category = models.ForeignKey(Category, verbose_name="категория", on_delete=models.PROTECT, related_name="product_category")
    specs = models.JSONField("Характеристики", blank=True, null=True, default={})
    is_sale = models.BooleanField("Скидка", default=False)
    sale_price = models.FloatField("Цена по скидке", blank=True, null=True)
    draft = models.BooleanField("Черновик", default=False)
    url = models.SlugField(max_length=130, unique=True, null=True, blank=True)
    
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("product_detail", kwargs={"slug": self.url})
    
    def get_review(self):
        return self.reviews_set.filter(parent__isnull=True)

    def save(self, *args, **kwargs):  # new
        if not self.url:
            self.url = slugify(self.name)
        return super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ProductImages(models.Model):
    """Изображения товара"""
    image = models.ImageField("Изображение", upload_to="product_images/")
    product = models.ForeignKey(Product, verbose_name="Товар", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.product.name} - {self.image.url}'

    class Meta:
        verbose_name = "Изображение товара"
        verbose_name_plural = "Изображения товаров"

class Reviews(models.Model):
    """Отзывы"""
    email = models.EmailField()
    name = models.CharField("Имя", max_length=100)
    text = models.TextField("Сообщение", max_length=1000)
    upload_date = models.DateTimeField("Дата публикации", default=datetime.now)
    parent = models.ForeignKey(
        'self', verbose_name="Родитель", on_delete=models.SET_NULL, blank=True, null=True
    )
    product = models.ForeignKey(Product, verbose_name="товар", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.email} - {self.product}"

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ['upload_date']


class BrandProduct(models.Model):
    """Бренд продукта"""
    name = models.CharField("Название", max_length=150, unique=True)
    short_description = models.TextField("Короткое описание", max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Бренд продукта"
        verbose_name_plural = "Бренды продуктов"
