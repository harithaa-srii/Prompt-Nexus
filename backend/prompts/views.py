import json
import re

from django.http import JsonResponse, Http404, HttpResponseBadRequest
from .models import Prompt
from django.views.decorators.csrf import csrf_exempt
from .redis_client import redis_client


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

        # Basic required validation
        if not title or not content or complexity is None:
            return HttpResponseBadRequest('title, content, and complexity are required')

        # Title validation
        if len(title.strip()) < 3:
            return HttpResponseBadRequest('Title must be at least 3 characters')

        if not re.search(r'[a-zA-Z]', title):
            return HttpResponseBadRequest('Title must contain at least one alphabet')

        # Content validation
        if len(content.strip()) < 20:
            return HttpResponseBadRequest('Content must be at least 20 characters')

        # Complexity validation
        try:
            complexity = int(complexity)
        except (TypeError, ValueError):
            return HttpResponseBadRequest('complexity must be an integer')

        if complexity < 1 or complexity > 10:
            return HttpResponseBadRequest('complexity must be between 1 and 10')

        prompt = Prompt.objects.create(
            title=title.strip(),
            content=content.strip(),
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

    # Redis safe handling
    try:
        redis_client.incr(f'prompt:{prompt_id}:views')
        view_count = redis_client.get(f'prompt:{prompt_id}:views')
        view_count = int(view_count) if view_count else 0
    except Exception:
        view_count = 0

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