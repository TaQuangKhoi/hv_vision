from django.db import models


# Create your models here.
class Requests(models.Model):
    id = models.AutoField(primary_key=True)
    server = models.OneToOneField('Servers', on_delete=models.CASCADE)
    current_rank = models.OneToOneField('Ranks', on_delete=models.CASCADE)
    desired_rank = models.OneToOneField('Ranks', on_delete=models.CASCADE)
    champion = models.OneToOneField('Champions', on_delete=models.CASCADE)


class Ranks(models.Model):
    id = models.AutoField(primary_key=True)


class Champions(models.Model):
    id = models.AutoField(primary_key=True)


class Servers(models.Model):
    id = models.AutoField(primary_key=True)


class GameTypes(models.Model):
    id = models.AutoField(primary_key=True)
