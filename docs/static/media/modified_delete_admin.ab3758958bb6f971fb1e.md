# Django admin delete_selected 이름 변경하기

※ 본 가이드는 프로젝트 초기 세팅 및 프로젝트 구성 방법에 대해 다루지 않습니다. ※

Django를 사용하다보면 황당한게 많다.

이건 있겠지? -> 없다.

이건 없겠지..? -> 사실은 있다.

최근 당연히 있겠거니 했지만 없었던 기능에 대해서 설명해 보려한다.

간단한 Django 프로젝트와 앱을 하나 생성했다.

## 프로젝트 구성
```
project_name/
    project_name/
        __init__.py
        settings.py
        urls.py
        wsgi.py            
    books/
    	migrations/
        templates/
        __init__.py
        admin.py
        apps.py
        models.py
        tests.py
        views.py
        urls.py
    venv/
    manage.py

```

admin.py를 설정해준뒤 /admin으로 접속하자.

![admin delete selected example](/img/admin_delete_selected.png)

action의 셀렉트 박스를 열어보니 삭제하기에 대한 액션의 이름이 좀 이상하다.

이걸 수정해보려고 한다.

## 방법1 (비추천)

어느 스택오버플로우의 방법이다. 추천하지 않는다. 이유는 후술하도록 한다.

```
# books/admin.py

from django.contrib.admin.actions import delete_selected

delete_selected.short_description = '선택된 책을 삭제합니다.'
```

delete_selected를 불러온뒤 short_description을 통해 이름을 바꿔준다.

아마 적용해보면 원하는 이름으로 바뀌어 있을것이다.

하지만 이 경우 현재 프로젝트 내 있는 모든 delete_selected의 명칭이 똑같은 이름으로 바뀌게된다.

임시방편으로는 가능하겠지만... 추천하지 않는다.

## 방법2 (말하고자 하는것)

Django docs에서 힌트를 얻었다.

[Django Documents - ModelAdmin.get_actions](https://docs.djangoproject.com/en/4.0/ref/contrib/admin/actions/#django.contrib.admin.ModelAdmin.get_actions)

해당 내용을 보면 admin.ModelAdmin을 통해 생성한 어드민 페이지에서 actions를 가져올 수 있다.

이중에 우리가 필요한건 delete_selected이므로 해당 부분을 찾아보자.


```
# books/admin.py

@admin.register(Books)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'author')
    ordering = ('-id',)

    def get_actions(self, request):
        actions = super().get_actions(request)
        print(actions)
        return actions
```

print를 통해 actions에 무엇이 담겨있는지 확인해보자.

```
{'delete_selected': (<function delete_selected at 0x7ff30840f200>, 'delete_selected', 'Delete selected %(verbose_name_plural)s')}
```

보아하니 action이름을 키로 가지고 해당 action에 필요한 내용을 tuple로 가지는 딕셔너리다.

이름으로 보여주는것은 tuple의 세번째 인자인듯 하다.

수정해보자.

```
def get_actions(self, request):
    actions = super().get_actions(request)
    delete_function = list(actions['delete_selected'])
    delete_function[2] = '수정된 삭제 action이름 입니다.'
    actions['delete_selected'] = tuple(delete_function)
    return actions
```

![modified delete](/img/modified_delete.png)

원하는 문구로 잘 수정된것을 알 수 있다.