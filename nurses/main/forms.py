from django import forms
from .models import Contact, Questionnaire, Education
from datetime import datetime


class DateInput(forms.DateInput):
    input_type = 'date'

class ContactForm(forms.ModelForm):

    class Meta:
        model = Contact
        error_css_class = "error"
        fields = ['name', 'email', 'phone']
        localized_fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': 'hero__input', 'placeholder': 'Ваше ім’я'})
        self.fields['email'].widget.attrs.update({'class': 'hero__input', 'placeholder': 'E-mail'})
        self.fields['phone'].widget.attrs.update({'class': 'hero__input', 'placeholder': 'Номер телефону',
                                                  })

class QuestionnaireForm(forms.ModelForm):

    class Meta:
        model = Questionnaire
        # fields = ['name', 'email', 'phone']
        fields = '__all__'
        localized_fields = '__all__'
        widgets = {
            'date_of_birth': forms.SelectDateWidget(years=range(datetime.now().year, 1900, -1),)
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['latin_name'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['maiden_name'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['registration_address'].widget.attrs.update({'class': 'form__input form__textarea', 'placeholder': ''})
        self.fields['current_address'].widget.attrs.update({'class': 'form__input form__textarea', 'placeholder': ''})
        self.fields['nationality'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['marital_status'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['phone'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['email'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['date_of_birth'].widget.attrs.update({'class': 'form__input datetime-input', 'placeholder': ''})
        self.fields['skype'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['experience'].widget.attrs.update({'class': 'form__input form__textarea form__textarea--extended', 'placeholder': ''})
        self.fields['further_education'].widget.attrs.update({'class': 'form__input form__textarea form__textarea--extended', 'placeholder': ''})
        self.fields['has_driver_license'].widget.attrs.update({'class': 'form__checkbox', 'placeholder': ''})
        self.fields['languages'].widget.attrs.update({'class': 'form__input form__textarea form__textarea--extended', 'placeholder': ''})
        self.fields['professional_skills'].widget.attrs.update({'class': 'form__input form__textarea form__textarea--extended', 'placeholder': ''})
        self.fields['about'].widget.attrs.update({'class': 'form__input form__textarea form__textarea--extended', 'placeholder': ''})
        self.fields['full_name'].widget.attrs.update({'class': 'form__input--policy', 'placeholder': ''})

class EducationForm(forms.ModelForm):

    class Meta:
        model = Education
        exclude = ('person',)
        localized_fields = '__all__'

        widgets = {
            'start_date': forms.SelectDateWidget(years=range(datetime.now().year+10, 1900, -1)),
            'end_date': forms.SelectDateWidget()
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['city'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['start_date'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['end_date'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})
        self.fields['speciality'].widget.attrs.update({'class': 'form__input', 'placeholder': ''})