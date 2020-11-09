import os
import json
import html
import boto3
from botocore.exceptions import ClientError

ssm = boto3.client('ssm', os.environ.get('AWS_REGION'))
ses = boto3.client('sesv2', os.environ.get('AWS_REGION'))

def get_parameter(name):
  response = ssm.get_parameter(Name=name, WithDecryption=True)
  return response['Parameter']['Value']

def format_body(body):
  lines = body.rstrip().split('\n')
  return ''.join([ '<p>' + l + '</p>' for l in lines  ])

RECIPIENT = get_parameter(os.environ.get('EMAIL_SSM'))
def send_email(payload):
  SENDER = 'Choubi Super Contact Form <contact@davennes.us>'
  CHARSET = 'UTF-8'
  REPLYTO = payload['email']
  SUBJECT = '[CONTACT FORM] ' + payload['subject']
  BODY = html.escape(payload['body'])
  BODY_TEXT = 'From: {} <{}>\n\n{}\n'.format(payload['name'], payload['email'], BODY)
  BODY_HTML = """<html><head></head><body>
    <header><p>From: {} &lt;{}&gt;</p></header>
    <main>{}</main>
  </body></html>
  """.format(payload['name'], payload['email'], format_body(BODY))

  try:
    response = ses.send_email(
      FromEmailAddress=SENDER,
      Destination={ 'ToAddresses': [RECIPIENT] },
      ReplyToAddresses=[REPLYTO],
      Content={
        'Simple': {
          'Subject': {
            'Charset': CHARSET,
            'Data': SUBJECT
          },
          'Body': {
            'Html': {
              'Charset': CHARSET,
              'Data': BODY_HTML
            },
            'Text': {
              'Charset': CHARSET,
              'Data': BODY_TEXT
            }
          }
        }
      }
    )

  except ClientError as e:
    print(e.response['Error']['Message'])
    return False
  else:
    return True

def handler(event, context):
  for record in event['Records']:
    payload=json.loads(record["body"])
    send_email(payload)
  
  return True
