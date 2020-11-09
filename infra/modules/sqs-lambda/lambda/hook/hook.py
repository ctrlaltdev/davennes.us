import os
import json
import requests
import boto3

ssm = boto3.client('ssm', os.environ.get('AWS_REGION'))
sqs = boto3.client('sqs', os.environ.get('AWS_REGION'))

org = os.environ.get('GH_ORG')
repo = os.environ.get('GH_REPO')
workflow = os.environ.get('GH_WORKFLOW')

def get_parameter(name):
  response = ssm.get_parameter(Name=name, WithDecryption=True)
  return response['Parameter']['Value']

def get_messages():
  response = sqs.receive_message(
    QueueUrl=os.environ.get('QUEUE_ID'),
    AttributeNames=[],
    MessageAttributeNames=[],
    MaxNumberOfMessages=10,
    VisibilityTimeout=20,
    WaitTimeSeconds=0
  )
  return response['Messages']

def delete_messages():
  sqs.purge_queue(
    QueueUrl=os.environ.get('QUEUE_ID')
  )

def handler(event, context):
  msgs = get_messages()
  
  if len(msgs) > 0:
    token = get_parameter(os.environ.get('GH_TOKEN_SSM'))
    delete_messages()

    url = 'https://api.github.com/repos/{}/{}/actions/workflows/{}/dispatches'.format(org, repo, workflow)

    x = requests.post(url, data = json.dumps({'ref': 'main'}), headers = {
      'Authorization': 'token {}'.format(token),
      'Accept': 'application/vnd.github.v3+json'
    })
    return x.text
  
  return True
