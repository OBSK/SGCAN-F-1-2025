from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from celery.result import AsyncResult
from tasks import scrap_url
import tempfile

app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """
    Endpoint que recibe un array de archivos binarios, procesa las URLs de cada uno
    en segundo plano utilizando Celery.
    """
    content = await file.read()

    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        tmp_file.write(content)
        tmp_file_path = tmp_file.name

    with open(tmp_file_path, 'r', encoding='utf-8') as f:
        urls = f.read().splitlines()

    tasks = [scrap_url.delay(url) for url in urls]

    return {"task_ids": [task.id for task in tasks]}

@app.get("/status/{task_id}")
async def get_task_status(task_id: str):
    """
    Endpoint para consultar el estado de una tarea.
    """
    task = AsyncResult(task_id)
    if task.state == 'SUCCESS':
        return {"task_id": task.id, "status": task.state, "result": task.result}
    else:
        return {"task_id": task.id, "status": task.state}

