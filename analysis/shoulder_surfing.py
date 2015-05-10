#!/usr/bin/env python
from firebase import firebase

# Get results
print "getting shoulder surfing results from 'https://6857-project-pga.firebaseio.com/'\n"
firebase = firebase.FirebaseApplication('https://6857-project-pga.firebaseio.com/', None)
results = firebase.get('/shoulder_surfing', None)
print results

# format results
animals2 = {}
animals2['gesture1'] = []
animals2['gesture2'] = []
animals2['gesture3'] = []
animals2['description'] = []
waldo2 = {}
waldo2['gesture1'] = []
waldo2['gesture2'] = []
waldo2['gesture3'] = []
waldo2['description'] = []
for entry in results.values():
    try:
        gestures = entry[unicode('gestures')]
        descriptions = entry[unicode('desciption')]
        for i in range(3):
            description = str(descriptions[i])
            gesture_type = description.split(' ')[0]
            gesture_output = {}
            gesture_output['type'] = gesture_type
            if gesture_type == "circle":
                gesture_output['type']
                gesture_output['center'] = (float(gestures[i][1]), float(gestures[i][2]))
                gesture_output['radius'] = float(gestures[i][3])
            elif gesture_type == "line":
                gesture_output['start'] = (float(gestures[i][1]), float(gestures[i][2]))
                gesture_output['end'] = (float(gestures[i][1]), float(gestures[i][2]))
            else:
                gesture_output['center'] = (float(gestures[i][1]), float(gestures[i][2]))
            if str(entry[unicode('image')]) == "animals2":
                animals2['gesture' + str(i+1)].append(gesture_output)
            else:
                waldo2['gesture' + str(i+1)].append(gesture_output)
       
            
    except():
        print 'Error'
print
print 'animals2'
print
print 'gesture1'
print animals2['gesture1']
print
print 'gesture2'
print animals2['gesture2']
print
print 'gesture3'
print animals2['gesture3']
print
print
print 'waldo2'
print
print 'gesture1'
print waldo2['gesture1']
print
print 'gesture2'
print waldo2['gesture2']
print
print 'gesture3'
print waldo2['gesture3']
print

## saves results
f1 = open('animals2.txt', 'w')
f1.write('animals2 \n')
for i in range(3):
    f1.write('gesture ' + str(i + 1) + '\n')
    gestures = animals2['gesture' + str(i + 1)]
    for j in gestures:
        f1.write(j['type'])
        if j['type'] == "circle":
            f1.write('\t\t' + str(j['center']) + '\t\t' + str(j['radius']) + '\n')
        elif j['type'] == "tap":
            f1.write('\t\t' + str(j['center']) + '\n')
        else:
            f1.write('\t\t' + str(j['start']) + '\t\t' + str(j['end']) + '\n')
    f1.write('\n')
f1.close()

f2 = open('waldo2.txt', 'w')
f2.write('waldo2 \n')
for i in range(3):
    f2.write('gesture ' + str(i + 1) + '\n')
    gestures = waldo2['gesture' + str(i + 1)]
    for j in gestures:
        f2.write(j['type'])
        if j['type'] == "circle":
            f2.write('\t\t' + str(j['center']) + '\t\t' + str(j['radius']) + '\n')
        elif j['type'] == "tap":
            f2.write('\t\t' + str(j['center']) + '\n')
        else:
            f2.write('\t\t' + str(j['start']) + '\t\t' + str(j['end']) + '\n')
    f2.write('\n')
f2.close()





