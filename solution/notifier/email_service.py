import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD

def send_email(to_email):
    try:
        message = MIMEMultipart()
        message["From"] = SMTP_USER
        message["To"] = to_email
        message["Subject"] = "Procesamiento finalizado"
        
        body = "Procesamiento finalizado"
        message.attach(MIMEText(body, "plain"))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, to_email, message.as_string())
        
        return {"status": "success", "message": "Correo enviado correctamente"}
    except Exception as e:
        return {"status": "error", "message": str(e)}