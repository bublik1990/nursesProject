from django.contrib import admin
from .models import Contact, Questionnaire, Education

# Register your models here.


class ContactAdmin(admin.ModelAdmin):
    list_display = ('created_date', 'name', 'phone', 'email', 'is_processed')
    readonly_fields=('created_date',)
    search_fields = ('name', 'phone', 'email')

class EducationInline(admin.TabularInline):
    model = Education
    extra = 0
    readonly_fields = ('name', 'speciality', 'city', 'start_date', 'end_date')

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
    
class QuestionnaireAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_date', 'phone', 'email')
    readonly_fields = ('name', 'latin_name', 'maiden_name', 'registration_address',
                       'current_address', 'nationality', 'marital_status', 'phone', 'email',
                       'date_of_birth', 'skype', 'experience', 'further_education', 'has_driver_license',
                       'languages', 'professional_skills', 'about', 'full_name', 'created_date',)
    search_fields = ('name', 'phone', 'email')

    inlines = [
        EducationInline,
    ]

    # list_editable = []

#
# class EducationAdmin(admin.ModelAdmin):
#     model = Education
#     readonly_fields = ('name', 'speciality', 'city', 'start_date', 'end_date')
#


admin.site.register(Contact, ContactAdmin)
admin.site.register(Questionnaire, QuestionnaireAdmin)
# admin.site.register(Education, EducationAdmin)