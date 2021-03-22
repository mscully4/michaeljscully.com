# from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework.parsers import FileUploadParser

import requests
import pandas as pd

class Investing(APIView):
    #GET requests only
    def get(self, request, format=None):
        '''
        Return the user's token information combined with destination data
        '''
        df = pd.read_json('https://alpaca-algo-trading.s3.us-east-2.amazonaws.com/positions.json')
        df = df[df['Date'] == df['Date'].max()]

        data = {
            "holdings": df.to_json(orient='records')
        }
        return Response(data)
