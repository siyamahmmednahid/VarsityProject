# Generated by Django 4.1.3 on 2022-11-18 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserApp', '0009_personalinfo_bloodgroup_personalinfo_dateofbirth_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personalinfo',
            name='DateOfBirth',
            field=models.DateField(default='2000-01-01'),
        ),
    ]