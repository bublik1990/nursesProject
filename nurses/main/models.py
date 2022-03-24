from django.db import models
# from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator
from datetime import datetime

# Create your models here.
PHONE_NUMBER_REGEX = RegexValidator(r'^\+?3?8?(0[\d\s-]{9,15})$', 'Невірний номер')

class Contact(models.Model):
    name = models.CharField(max_length=100, verbose_name="Ім'я", blank=False, null=False)
    email = models.EmailField(verbose_name='Пошта', blank=False, null=False)
    phone = models.CharField(validators=[PHONE_NUMBER_REGEX], null=False, blank=False, max_length=20, verbose_name='Телефон')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата створення')
    is_processed = models.BooleanField(default=False, verbose_name='Заявка опрацьована')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_date']


class Questionnaire(models.Model):
    name = models.CharField(max_length=150, verbose_name="Прізвище, ім’я, по-батькові")
    latin_name = models.CharField(max_length=150, verbose_name="Прізвище, ім’я")
    maiden_name = models.CharField(max_length=100, blank=True, verbose_name="Дівоче прізвище")
    registration_address = models.TextField(verbose_name="Адреса реєстрації")
    current_address = models.TextField(verbose_name="Адреса фактичного проживання")
    nationality = models.CharField(max_length=100, verbose_name="Громадянство")
    marital_status = models.CharField(max_length=100, blank=True, verbose_name="Сімейний стан")
    phone = models.CharField(validators=[PHONE_NUMBER_REGEX], max_length=20, verbose_name="Номер телефону чи Viber")
    email = models.EmailField(verbose_name="E-mail", blank=False, null=False)
    date_of_birth = models.DateField(verbose_name="Дата народження", default=datetime(datetime.now().year, 1, 1, 0, 0))
    skype = models.CharField(max_length=100, blank=True, verbose_name="Skype")
    experience = models.TextField(verbose_name="Робочий досвід")
    further_education = models.TextField(verbose_name="Додаткова освіта", blank=True)
    has_driver_license = models.BooleanField(default=False, verbose_name="Чи є водійські права?")
    languages = models.TextField(verbose_name="Знання мов")
    professional_skills = models.TextField(verbose_name="Професійні навички")
    about = models.TextField(verbose_name="Про себе")
    full_name = models.CharField(max_length=150, verbose_name="Прізвище, ім’я, по-батькові")
    created_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата заповнення")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Анкета'
        verbose_name_plural = 'Анкети'
        ordering = ['-created_date']


class Education(models.Model):
    name = models.CharField(max_length=250, verbose_name="Назва навчального закладу")
    city = models.CharField(max_length=100, verbose_name="Місто")
    start_date = models.DateField(verbose_name="Місяць і рік початку навчання", default=datetime(datetime.now().year, 1, 1, 0, 0))
    end_date = models.DateField(verbose_name="Місяць і рік завершення навчання", default=datetime(datetime.now().year, 1, 1, 0, 0))
    speciality = models.CharField(max_length=150, verbose_name="Спеціальність")
    person = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)

    def __str__(self):
        return self.speciality

    class Meta:
        verbose_name = 'Навчальний заклад'
        verbose_name_plural = 'Навчальні заклади'
        ordering = ['-name']
