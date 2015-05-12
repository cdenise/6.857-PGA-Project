import sys
from firebase import firebase as fb

def pushData(x):
    firebase = fb.FirebaseApplication('https://6857-project-pga.firebaseio.com/', None)
    current = firebase.get('/python_test', None)
    for key in current:
        firebase.delete('python_test', key)
    result = firebase.post('/python_test', x)

if __name__ == '__main__':
    x = float(sys.argv[1])
    pushData(x)
