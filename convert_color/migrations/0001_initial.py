# Generated by Django 4.2.7 on 2023-11-06 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ImageProcessingResult',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='images/')),
                ('processing_date', models.DateTimeField(auto_now_add=True)),
                ('processing_method', models.CharField(max_length=255)),
            ],
        ),
    ]
