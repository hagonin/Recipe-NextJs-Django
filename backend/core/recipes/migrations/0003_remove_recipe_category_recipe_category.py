# Generated by Django 4.1.5 on 2023-02-09 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='category',
        ),
        migrations.AddField(
            model_name='recipe',
            name='category',
            field=models.ManyToManyField(related_name='recipe_list', to='recipes.category'),
        ),
    ]
