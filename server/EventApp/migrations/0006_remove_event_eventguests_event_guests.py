# Generated by Django 4.1.3 on 2022-11-24 20:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('EventApp', '0005_remove_event_eventguests_event_eventguests'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='EventGuests',
        ),
        migrations.AddField(
            model_name='event',
            name='Guests',
            field=models.ManyToManyField(related_name='Guests_set', to=settings.AUTH_USER_MODEL),
        ),
    ]
