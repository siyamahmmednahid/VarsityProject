# Generated by Django 4.1.3 on 2023-02-02 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TodoApp', '0003_todo_important'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='SupervisorImportant',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='todo',
            name='Title',
            field=models.CharField(max_length=200),
        ),
    ]
