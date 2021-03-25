# from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework.parsers import FileUploadParser

import requests
import pandas as pd

import json 
import requests

BASE_URL = 'https://alpaca-algo-trading.s3.us-east-2.amazonaws.com'

class Investing(APIView):
    #GET requests only
    def get(self, request, data, format=None):
        '''
        Return portfolio information
        '''
        if data == "positions":
            df = pd.read_json(f'{BASE_URL}/positions.json')
            df = df[df['Date'] == df['Date'].max()]
            return Response(data={"holdings": df.to_json(orient='records')})
        elif data == 'transfers':
            return Response(data={'transfers': requests.get(f'{BASE_URL}/transfers.json').text})
        elif data == 'returns':
            return Response(data={'returns': requests.get(f'{BASE_URL}/portfolio_value.json').text})
        else:
            return Response(status=404)
