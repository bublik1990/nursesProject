from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import Contact, Questionnaire, Education
from .forms import ContactForm, QuestionnaireForm, EducationForm
from django.core.mail import EmailMultiAlternatives
from django.http import JsonResponse
from django.forms import formset_factory


def sendEmail(data):
    html_content = f'''
            <p>Отримана нова заявка</p><p>ім’я: {data['name']}</p><p>Телефон: {data['phone']}</p><p>Пошта: {data['email']}</p>
        '''

    msg = EmailMultiAlternatives(
        'Нова заявка',
        html_content,
        'contact@go4more.school',
        ['bulanaja.julia@gmail.com', 'bulanaja.julia1990@gmail.com'],
    )
    msg.attach_alternative(
        html_content,
        "text/html")
    msg.send()



def index(request):
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':

        form = ContactForm(request.POST)

        if form.is_valid():
            sendEmail(form.cleaned_data)
            form.save()

            return JsonResponse({}, status=200)
        else:
            return JsonResponse(
                {"errors": form.errors}, status=400)
    else:
        form = ContactForm()

    return render(request, 'main/index.html', {'form': form})


def fill_form(request):
    
    EducationFormformset = formset_factory(EducationForm, extra=1, max_num=4)

    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        form = QuestionnaireForm(request.POST)
        formset = EducationFormformset(request.POST)

        if form.is_valid() and formset.is_valid():
            questionnaire = form.save()

            for education_form in formset:
                education = education_form.save(commit=False)
                education.person = questionnaire
                education.save()

            return JsonResponse({}, status=200)
        else:
            print(formset.errors)
            return JsonResponse(
                {"errors": form.errors, 'formset_errors': formset.errors}, status=400)

    else:
        form = QuestionnaireForm()
        formset = EducationFormformset()

    return render(request, 'main/form.html', {'form': form, 'formset': formset})
