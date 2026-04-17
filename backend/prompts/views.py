import json
import redis

from django.http import JsonResponse, Http404, HttpResponseBadRequest
from .models import Prompt
from django.views.decorators.csrf import csrf_exempt

redis_client = redis.Redis(host='localhost', port=6379, db=0)

@csrf_exempt
def prompt_list(request):
    if request.method == 'GET':
        prompts = Prompt.objects.values()
        return JsonResponse(list(prompts), safe=False)

    if request.method == 'POST':
        try:
            body = json.loads(request.body)
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON body')

        title = body.get('title')
        content = body.get('content')
        complexity = body.get('complexity')

        if not title or not content or complexity is None:
            return HttpResponseBadRequest('title, content, and complexity are required')

        try:
            complexity = int(complexity)
        except (TypeError, ValueError):
            return HttpResponseBadRequest('complexity must be an integer')

        prompt = Prompt.objects.create(
            title=title,
            content=content,
            complexity=complexity,
        )
        return JsonResponse(
            {
                'id': str(prompt.id),
                'title': prompt.title,
                'content': prompt.content,
                'complexity': prompt.complexity,
                'created_at': prompt.created_at.isoformat(),
            },
            status=201,
        )

    return HttpResponseBadRequest('Unsupported HTTP method')


def prompt_detail(request, prompt_id):
    try:
        prompt = Prompt.objects.get(id=prompt_id)
    except Prompt.DoesNotExist:
        raise Http404('Prompt not found')
    
    redis_client.incr(f'prompt:{prompt_id}:views')

    view_count = redis_client.get(f'prompt:{prompt_id}:views')
    view_count = int(view_count) if view_count else 0

    return JsonResponse(
        {
            'id': str(prompt.id),
            'title': prompt.title,
            'content': prompt.content,
            'complexity': prompt.complexity,
            'created_at': prompt.created_at.isoformat(),
            'view_count': view_count,
        }
    )