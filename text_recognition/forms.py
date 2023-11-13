from django import forms


class ImageForm(forms.Form):
    imageInput = forms.ImageField(
        required=False,
        widget=forms.FileInput(
            attrs={
                'id': 'imageInput'
            }
        )
    )
