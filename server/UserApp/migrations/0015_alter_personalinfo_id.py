# Generated by Django 4.1.3 on 2022-11-18 18:12

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('UserApp', '0014_alter_personalinfo_bloodgroup_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personalinfo',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
