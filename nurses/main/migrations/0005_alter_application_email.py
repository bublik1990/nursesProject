# Generated by Django 4.0.2 on 2022-02-21 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_alter_application_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='email',
            field=models.EmailField(max_length=254, verbose_name='Почта'),
        ),
    ]
