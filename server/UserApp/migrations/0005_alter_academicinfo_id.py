# Generated by Django 4.1.3 on 2022-11-17 16:43

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('UserApp', '0004_rename_awardingbody_awardandscholarshipinfo_organization'),
    ]

    operations = [
        migrations.AlterField(
            model_name='academicinfo',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]