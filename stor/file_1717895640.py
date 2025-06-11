from docx2pdf import convert
from PyPDF2 import PdfMerger
from docx import Document
from datetime impot datetime
import pandas as pd
import numpy as np
import os
import time
from mailer import MailSender
import mysql.connector

dir = os.path.dirname(os.path.abspath(__file__))

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="bewerber"
)

conn = mydb.cursor(dictionary=True)

conn.execute("select * from unternehmens")
my_data = conn.fetchall()
 
def create_bewerbung(data):
    print("create bewerbung: "+data["name"])
    merger = PdfMerger()
    today = datetime.today().strftime('%d.%m.%Y')
    if data['sex']=='f' or data['sex'] =="F":
        x01=" Frau "+data["empfanger"]
    elif data['sex']=='m' or data['sex']=="M":
        x01="r Herr "+data["empfanger"]
    else:
        x01 = " Dammen und Herren"
        
    lines = data["anschrift"].split('\n')
    lines = [line for line in lines if line.strip()]

    dic = {
            "X_01_X": x01,
            "X_DATE_X":today,
            "X_BEREICH_X":data["berich"],
            "X_FIRMA_X":data["name"],
            "X_ KONTAKTPERSON_X": "".join(lines)
            }
    doc = Document('unterlagen/anschreiben.docx')
 
    for i in dic:
        for p in doc.paragraphs:
            if p.text.find(i)>=0:
                p.text=p.text.replace(i,str(dic[i]))
    doc.save('./test.docx')
    
    convert("test.docx", "x.pdf")
    for pdf in ['unterlagen/blatt.pdf','x.pdf','unterlagen/lebenslauf.pdf']:
        merger.append(pdf)
    merger.write("bewerbung/bewerbung "+str(data["name"])+".pdf")
    merger.close()
  
    os.remove(dir+"/x.pdf")
    os.remove(dir+"/test.docx")
    sender = MailSender( receiver= data["mail"], firma=data["name"],x01 = x01 )
    #sender.send()
    print("mail sent to: "+data["mail"])


for bw in my_data:
    create_bewerbung(bw)

