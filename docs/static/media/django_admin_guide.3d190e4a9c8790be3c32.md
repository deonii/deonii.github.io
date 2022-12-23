# Django admin 사용 가이드

※ 본 가이드는 프로젝트 초기 세팅 및 프로젝트 구성 방법에 대해 다루지 않습니다. ※


## 프로젝트 구성

```bash
project_name/
    apps/
        __init__.py
        settings.py
        urls.py
        wsgi.py
    books/
        migrations/
        __init__.py
        admin.py
        apps.py
        models.py
        tests.py
        views.py
        urls.py
    templates/
    venv/
    manage.py
```

## settings.py 확인 사항

![](https://images.velog.io/images/deonii/post/82c5d60d-0e24-47fc-aa93-99f4aea55344/Untitled.png)

- INSTALLED_APPS 내 django.contrib.admin을 포함하는지 확인해야합니다.

## models.py 구성

```python
# books/models.py

from django.db import models

PUBLISHING_CODE = (
    (1, ('Pending')),
    (2, ('Accepted')),
    (3, ('Canceled')),
    (4, ('Rejected')),
)

class Author(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=300)
    birth_date = models.DateField(blank=True, null=True)

class Genre(models.Model):
    genre_name = models.CharField(max_length=100)

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    status = models.SmallIntegerField(choices=PUBLISHING_CODE, default=2)
```


# admin.py 설정

## 모델 등록하기

```python
# books/admins.py

from django.contrib import admin

from books.models import Author, Genre, Book

admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Genre)
```

모델을 등록하는 것 만으로도 django의 기능을 통해 admin 페이지 구성이 가능합니다.

- /admin 을 통해 접속한 모습

![](https://images.velog.io/images/deonii/post/1af7dd80-ed93-4176-ace6-df0e045cc7b1/Untitled%201.png)

- /admin/(app이름)/ 을 통해 모델 목록을 확인 가능합니다.

![](https://images.velog.io/images/deonii/post/460e6088-5f79-4b3c-9aef-7e16b31cda95/Untitled%202.png)

- /admin/(app이름)/(모델명)/ 을 통해 table을 확인 가능합니다.

![](https://images.velog.io/images/deonii/post/92c05a45-8230-4e46-a172-f36c087e4ee6/Untitled%203.png)

- /admin/(app이름)/(모델명)/add/ 를 통해 데이터를 추가 할 수 있습니다.

![](https://images.velog.io/images/deonii/post/224b826c-fcc6-4d7f-8ae5-8f0c279d45e0/Untitled%204.png)

- /admin/(app이름)/(모델명)/(id)/change/ 를 통해 데이터를 수정 할 수 있습니다.

![](https://images.velog.io/images/deonii/post/13c03a33-fa96-4dc9-b305-ae5fd83beee5/Untitled%205.png)


# admins.py 커스터마이징

```python
# books/admins.py

from django.contrib import admin

from books.models import Author, Genre, Book

# admin.site.register(Book)
# admin.site.register(Author)
# admin.site.register(Genre)

# 방법 1
class AuthorAdmin(admin.ModelAdmin):
    pass

admin.site.register(Author, AuthorAdmin)

# 방법 2
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    pass
```

admin.ModelAdmin를 상속받은 클래스 선언 후 admin.site.register(모델명, 클래스명)을 등록하는것과@admin.register(모델명)을 데코레이터로 등록한 클래스는 기존에 admin.site.register()를 통해 등록한것과 동일한 결과를 보여줍니다.

## 목록 뷰 설정하기

```python
# books/admins.py

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'title', 'genre', 'status')
```

선언한 AuthorAdmin내에 list_display를 튜플 또는 리스트 형식으로 원하는 컬럼값을 등록해줍니다.

- 변경된 목록 뷰 모습

![](https://images.velog.io/images/deonii/post/ca44b384-f6e9-4bfd-a3d5-3c1a3d5d48cd/Untitled%206.png)

## 커스텀 필드명 설정하기

목록 뷰에 필요한 값을 노출시키고 싶다면 models.py에서 선언 후 사용 가능합니다.

```python
# books/models.py

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    status = models.SmallIntegerField(choices=PUBLISHING_CODE, default=2)

def tilte_for_html(self):
    return '<b>' + self.title + '</b>'
```

```python
# books/admins.py

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'tilte_for_html', 'genre', 'status')
```

- 변경된 목록 뷰 모습

![](https://images.velog.io/images/deonii/post/bcb1cdf2-182d-4203-a165-e239484a7d27/Untitled%207.png)

## 외래키 이름 설정하기

ForeignKey(xxx objects (1))가 보이는것 또한 변경이 가능합니다.

```python
# books/models.py

class Author(models.Model):
    name = models.CharField(max_length=100)
    birth_date = models.DateField(blank=True, null=True)

def __str__(self):
    return self.name
```

- 변경된 목록 뷰 모습

![](https://images.velog.io/images/deonii/post/0de68700-422f-4f46-bd5e-5f578bd81cfe/Untitled%208.png)

## 페이지 별 목록 개수 설정하기

```python
# books/admins.py

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'tilte_for_html', 'genre', 'status')
    list_per_page = 10
```

list_per_page 를 통해 페이지 별 목록 개수 설정이 가능합니다.

## /(id)/change/ 페이지 내 수정 불가능 하도록 설정하기

```python
# books/admins.py

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'tilte_for_html', 'genre', 'status')
    readonly_fields = ('author', 'title', 'genre')
    list_per_page = 10
```

- 변경된 수정 페이지 모습

![](https://images.velog.io/images/deonii/post/b58290d2-7234-49f3-a440-f04a4d974224/Untitled%209.png)

## /(id)/change/ 페이지 내 목록 순서 설정하기

```python
# books/admins.py

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'tilte_for_html', 'genre', 'status')
    readonly_fields = ('author', 'title', 'genre')
    list_per_page = 10
    fields = ['author', ('title','genre'), 'status']
```

fields를 선언함으로서 수정 페이지 내 순서 및 수평적 표시가 가능합니다.

- 변경된 수정 페이지 모습

![](https://images.velog.io/images/deonii/post/4c483de3-243d-4222-bcc9-651308890433/Untitled%2010.png)


# admin 페이지 html 변경하기

settings.py에 `STATIC_ROOT` 설정 되어있는것을 확인하고 collectstatic 명령어를 통해 django의 정적파일을 모아줍니다.

```bash
python manage.py collectstatic
```

**(django가 설치된 경로)**/contrib/admin/templates 폴더를 내를 확인해보면 admin 폴더와 registration 폴더가 존재합니다.

두 폴더를 복사해서 settings.py에서 templates dir로 설정된 경로에 붙여넣습니다.

```bash
project_name/
    apps/
        __init__.py
        settings.py
        urls.py
        wsgi.py
    books/
        migrations/
        __init__.py
        admin.py
        apps.py
        models.py
        tests.py
        views.py
        urls.py
    static/
        admin/
    templates/
        admin/
        registration/
    venv/
    manage.py
```

원하는 페이지의 html파일을 찾아 수정합니다.

## ex) SAVE 버튼, DELETE 버튼 수정하기

```html
# /templates/admin/submit_line.html

...
# line 4
{% if show_save %}
<input
    type="submit"
    value="{% if original %}{{ original }}을(를) {% endif %}{% translate '저장' %}"
    class="default"
    name="_save">
{% endif %}

...
# line 7
<p class="deletelink-box">
    <a href="{% add_preserved_filters delete_url %}" class="deletelink">
        {% if original %}{{ original }}을(를) {% endif %}{% translate "삭제" %}
    </a>
</p>
```

4번줄과 7번줄은 각각 save 버튼과 delete 버튼에 해당되는 부분입니다.

해당부분을 수정하여 원하는 모양으로 변경시켜줍니다.

- 변경된 change 페이지 모습

![](https://images.velog.io/images/deonii/post/c70903a2-80ad-4e2c-965f-10d1e882535b/Untitled%2011.png)