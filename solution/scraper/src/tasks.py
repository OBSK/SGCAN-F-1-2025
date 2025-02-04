from celery_config import app
import requests
from bs4 import BeautifulSoup

@app.task
def scrap_url(url: str):
    """
    Tarea de Celery para hacer scraping de la URL y obtener el título de la página.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.title.string if soup.title else 'No title found'

        return {"url": url, "title": title}
    
    except requests.exceptions.RequestException as e:
        return {"url": url, "error": str(e)}