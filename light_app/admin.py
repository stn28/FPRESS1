from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Category, Product, Reviews, ProductImages, BrandProduct

admin.site.site_header = "Light admin"
admin.site.site_title = "Light admin"
admin.site.empty_value_display = "(пусто)"


@admin.register(Category)
class Category(admin.ModelAdmin):
    list_display = ("name", "url")
    list_display_links = ("name",)


class ReviewStacked(admin.StackedInline):
    model = Reviews
    extra = 1
    readonly_fields = ("name", "email")
    can_delete = True
    # exclude = ("parent",)


class ProductImagesInline(admin.TabularInline):
    model = ProductImages
    extra = 3
    readonly_fields = ("get_image",)

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} width="40" height="60"')

    get_image.short_description = "Изображение"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "brand", "price", "draft")
    list_filter = ("brand",)
    list_editable = ("draft",)
    search_fields = ("name", "brand__name")
    sortable_by = ("brand", "price")
    readonly_fields = ("get_image",)
    actions = ["publish", "unpublish"]
    save_on_top = True
    list_max_show_all = 100
    inlines = [ProductImagesInline, ReviewStacked]
    fieldsets = (
        (None, {
            "fields": ("name", "brand", "price", "description", "category"),
        }),
        (None, {
            "fields": ("get_image", "main_photo"),
        }),
        (None, {
            "fields": ("draft", "is_avaliable", "is_sale", "sale_price", "url"),
        }),
        ("Характеристики JSON", {
            "fields": ("specs",),
            "classes": ("collapse",)
        })

    )
    

    def get_image(self, obj):
        return mark_safe(f'<img src={obj.main_photo.url} width="80" height="100"')

    def unpublish(self, request, queryset):
        row_update = queryset.update(draft=True)
        if row_update == 1:
            message_bit = "1 запись была обновлена"
        else:
            message_bit = f"{row_update} записей были обновлены"
        self.message_user(request, f"{message_bit}")

    def publish(self, request, queryset):
        """Опубликовать"""
        row_update = queryset.update(draft=False)
        if row_update == 1:
            message_bit = "1 запись была обновлена"
        else:
            message_bit = f"{row_update} записей были обновлены"
        self.message_user(request, f"{message_bit}")

    publish.short_description = "Опубликовать"
    publish.allowed_permissions = ('change', )

    unpublish.short_description = "Снять с публикации"
    unpublish.allowed_permissions = ('change',)

    get_image.short_description = "Главное изображение"


@admin.register(Reviews)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "product", "upload_date")
    readonly_fields = ("name", "email", "upload_date")

admin.site.register(BrandProduct)
