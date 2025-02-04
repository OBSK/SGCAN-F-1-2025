from celery import Celery

app = Celery('tasks', broker='redis://localhost:9050/0')

app.conf.update(
    result_backend='redis://localhost:9050/0',
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
)