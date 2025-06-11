from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from os.path import basename
import smtplib
import ssl


class MailSender():
    sender = 'mohammed0sejjari@gmail.com'
    password="elpntmpbyoivssxk"
    subject="Bewerbung um einen Ausbildungsplatz als Elektroniker für Betriebstechnik"

    def __init__(self,receiver,firma,x01) -> None:
        self.receiver = receiver
        self.firma=firma
        self.x01=x01

    def send(self):
#         body = """\
# Sehr geehrte%s,
# Zunächst möchte ich mich vorstellen: Mein Name ist Mohammed Sejjari. Ich komme aus Marokko.
# Ich bin auf der Suche nach einem Ausbildungsplatz als  Elektroniker für Betriebstechnik und bin auf Ihre Anzeige auf der Website "ausbildung.de" gestoßen, 
# die mein Interesse geweckt hat, daher möchte ich meine Bewerbungsunterlagen als PDF Datei anhängen.

# Über eine Antwort oder eine Einladung zu einem Vorstellungsgespräch würde ich mich sehr freuen.
# - Erste Datei: Deckblatt + Anschreiben + Lebenslauf
# - Zweite Datei: Unterlagen und Zeugnisse

# Vielen Dank im Voraus.
        
# Mit freundlichen Grüßen
# Mohammed Sejjari.""" % self.x01
        body="""\
Sehr geehrte%s,

ich hoffe, diese Nachricht erreicht Sie in bester Verfassung. Mein Name ist Mohammed Sejjari, und ich bin in Marokko geboren und aufgewachsen. Ich schreibe Ihnen heute, um mich für die ausgeschriebene Ausbildungsstelle als Elektroniker für Betriebstechnik zu bewerben, die ich auf der Website "arbeitsagentur.de" entdeckt habe.

Die Möglichkeit, meine Ausbildung bei Ihrem Unternehmen zu absolvieren, hat mein Interesse sofort geweckt. Ihre Firma genießt einen exzellenten Ruf, insbesondere im Bereich der Elektrotechnik, und ich bin überzeugt, dass ich hier die bestmögliche Ausbildung erhalten kann. Ich bin sehr motiviert, in einem renommierten Unternehmen wie Ihrem meine berufliche Laufbahn zu beginnen und meine Kenntnisse im Bereich Elektronik zu vertiefen.

Im Anhang finden Sie meine Bewerbungsunterlagen in zwei separaten PDF-Dateien:

Die erste Datei enthält mein Deckblatt, mein Anschreiben und meinen Lebenslauf.
Die zweite Datei umfasst meine relevanten Unterlagen und Zeugnisse.

Für die Gelegenheit, Ihre Einrichtung und Ihr Team näher kennenzulernen, würde ich mich sehr über eine Einladung zu einem persönlichen Gespräch freuen. Hierbei können wir weitere Details über meine Motivation und Qualifikationen besprechen.

Vielen Dank im Voraus für Ihre Zeit und Aufmerksamkeit. Ich freue mich auf die Möglichkeit, meine Fähigkeiten und mein Engagement in Ihrem Unternehmen unter Beweis zu stellen.

Mit freundlichen Grüßen,
Mohammed Sejjari"""% self.x01

        body.lstrip()
            
        em= MIMEMultipart()
        em["From"]= self.sender
        em["To"]=self.receiver
        em['Subject']=self.subject
        
        em.attach(MIMEText(body))

        with open("bewerbung/Bewerbung "+self.firma+".pdf","rb") as fil:
                part=MIMEApplication( fil.read(), Name=basename("Bewerbung "+self.firma+".pdf"))
                part['Content-Disposition'] = 'attachment; filename="%s"' % basename("Bewerbung "+self.firma+".pdf")
                em.attach(part)

        with open("unterlagen/unterlagen.pdf","rb") as fil:
            part=MIMEApplication( fil.read(), Name=basename("unterlagen.pdf"))
            part['Content-Disposition'] = 'attachment; filename="%s"' % basename("unterlagen.pdf")
            em.attach(part)
        contex = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com",465,context=contex) as smtp:
            smtp.login(self.sender,self.password)
            smtp.sendmail(self.sender,self.receiver,em.as_string())
        print("E-mail to: "+self.receiver + " hat gesendet")