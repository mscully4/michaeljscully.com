#! /usr/bin/env python3

import os
import sys
import argparse

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--command', help='Command (start, stop, restart)')
    args, unknown = parser.parse_known_args()

    commmand = args.command.lower()
    if command == 'start':
        os.system('sudo service gunicorn start')
        os.system('sudo systemctl stop nginx')
    elif command == 'stop':
        os.system('sudo service gunicorn stop')
        os.system('sudo systemctl stop nginx')
    elif command == 'restart':
        os.system('sudo service gunicorn restart')
        os.system('sudo systemctl reload nginx')
