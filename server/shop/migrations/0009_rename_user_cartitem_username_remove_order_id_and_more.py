from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_rename_createdat_product_created_at_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cartitem',
            old_name='user',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='order',
            name='id',
        ),
        migrations.AddField(
            model_name='order',
            name='_id',
            field=models.AutoField(editable=False, primary_key=True, serialize=False),
        ),  
    ]
