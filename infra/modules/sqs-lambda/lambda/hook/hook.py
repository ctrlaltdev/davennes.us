import os
import json
import requests
import boto3

ssm = boto3.client('ssm', os.environ.get('AWS_REGION'))
def get_parameter(name):
  response = ssm.get_parameter(Name=name, WithDecryption=True)
  return response['Parameter']['Value']

token = get_parameter(os.environ.get('GH_TOKEN_SSM'))
def handler(event, context):
  org = os.environ.get('GH_ORG')
  repo = os.environ.get('GH_REPO')
  workflow = os.environ.get('GH_WORKFLOW')

  url = 'https://api.github.com/repos/{}/{}/actions/workflows/{}/dispatches'.format(org, repo, workflow)

  x = requests.post(url, data = json.dumps({'ref': 'main'}), headers = {
    'Authorization': 'token {}'.format(token),
    'Accept': 'application/vnd.github.v3+json'
  })
  return x.text
