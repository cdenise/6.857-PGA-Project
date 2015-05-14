#!/usr/bin/env python
from firebase import firebase
import math

# Get results
print "getting shoulder surfing results from 'https://6857-project-pga.firebaseio.com/'\n"
firebase = firebase.FirebaseApplication('https://6857-project-pga.firebaseio.com/', None)
results = firebase.get('/shoulder_surfing', None)
##print results

# format results
animals2 = {}
animals2['gesture1'] = []
animals2['gesture2'] = []
animals2['gesture3'] = []
animals2['description'] = []
animals2['answer'] = []
waldo2 = {}
waldo2['gesture1'] = []
waldo2['gesture2'] = []
waldo2['gesture3'] = []
waldo2['description'] = []
waldo2['answer'] = []
for entry in results.values():
    try:
        answer = entry.get('answer', False)
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
                gesture_output['end'] = (float(gestures[i][3]), float(gestures[i][4]))
            else:
                gesture_output['center'] = (float(gestures[i][1]), float(gestures[i][2]))
            if answer:
                if str(entry[unicode('image')]) == "animals2":
                    animals2['answer'].append(gesture_output)
                else:
                    waldo2['answer'].append(gesture_output)
            else:
                if str(entry[unicode('image')]) == "animals2":
                    animals2['gesture' + str(i+1)].append(gesture_output)
                else:
                    waldo2['gesture' + str(i+1)].append(gesture_output)
       
            
    except():
        print 'Error'
##print
##print 'animals2'
##print
##print 'gesture1'
##print animals2['gesture1']
##print
##print 'gesture2'
##print animals2['gesture2']
##print
##print 'gesture3'
##print animals2['gesture3']
##print
##print
##print 'waldo2'
##print
##print 'gesture1'
##print waldo2['gesture1']
##print
##print 'gesture2'
##print waldo2['gesture2']
##print
##print 'gesture3'
##print waldo2['gesture3']
##print

## saves results
##f1 = open('animals2.txt', 'w')
##f1.write('animals2 \n')
##for i in range(3):
##    f1.write('gesture ' + str(i + 1) + '\n')
##    f1.write('**************************************************\n')
##    f1.write('ANSWER\n')
##    j = animals2['answer'][i]
##    f1.write(j['type'])
##    if j['type'] == "circle":
##        f1.write('\t\t' + str(j['center']) + '\t\t' + str(j['radius']) + '\n')
##    elif j['type'] == "tap":
##        f1.write('\t\t' + str(j['center']) + '\n')
##    else:
##        f1.write('\t\t' + str(j['start']) + '\t\t' + str(j['end']) + '\n')
##    f1.write('**************************************************\n')
##    gestures = animals2['gesture' + str(i + 1)]
##    for j in gestures:
##        f1.write(j['type'])
##        if j['type'] == "circle":
##            f1.write('\t\t' + str(j['center']) + '\t\t' + str(j['radius']) + '\n')
##        elif j['type'] == "tap":
##            f1.write('\t\t' + str(j['center']) + '\n')
##        else:
##            f1.write('\t\t' + str(j['start']) + '\t\t' + str(j['end']) + '\n')
##    f1.write('\n')
##f1.close()
##
##f2 = open('waldo2.txt', 'w')
##f2.write('waldo2 \n')
##for i in range(3):
##    f2.write('gesture ' + str(i + 1) + '\n')
##    f2.write('**************************************************\n')
##    f2.write('ANSWER\n')
##    j = waldo2['answer'][i]
##    f2.write(j['type'])
##    if j['type'] == "circle":
##        f2.write('\t\t' + str(j['center']) + '\t\t' + str(j['radius']) + '\n')
##    elif j['type'] == "tap":
##        f2.write('\t\t' + str(j['center']) + '\n')
##    else:
##        f2.write('\t\t' + str(j['start']) + '\t\t' + str(j['end']) + '\n')
##    f2.write('**************************************************\n')
##    gestures = waldo2['gesture' + str(i + 1)]
##    for j in gestures:
##        f2.write(j['type'])
##        if j['type'] == "circle":
##            f2.write('\t\t' + str(j['center']) + '\t\t' + str(j['radius']) + '\n')
##        elif j['type'] == "tap":
##            f2.write('\t\t' + str(j['center']) + '\n')
##        else:
##            f2.write('\t\t' + str(j['start']) + '\t\t' + str(j['end']) + '\n')
##    f2.write('\n')
##f2.close()

def compare(point1, point2):
    # grid width = 10.2; assuming 100 grids along longer side
    w = 10.2
    x_diff = abs(math.floor(point1[0] / w) - math.floor(point2[0] / w))
    y_diff = abs(math.floor(point1[1] / w) - math.floor(point2[1] / w))
    return (x_diff <= 2 and y_diff <=2) or (x_diff <= 1 and y_diff <= 3) or (x_diff <= 3 and y_diff <= 1)
        
    
# Analysis for Animals2

# radius difference tolerance
dr = 10.2 * 3

print '**************************************************'
print 'Animals2 (Dogs)'
print 'gesture 1'
print '**************************************************'
correct_type = animals2['answer'][1-1]['type']
print 'correct_type:', correct_type
print 'users who guessed correctly:'
x_c, y_c = animals2['answer'][1-1]['center']
r_c = animals2['answer'][1-1]['radius']
correct_type_count = 0
total_error_c = 0
total_error_r = 0
correct_count = 0
c1 = 0
for j in animals2['gesture1']:
    c1 += 1
    if j['type'] == correct_type:
        correct_type_count += 1
        x, y = j['center']
        r = j['radius']
        if compare((x,y), (x_c, y_c)):
            if abs(r_c - r) < dr:
                correct_count += 1
                print c1
        total_error_c += math.sqrt((x-x_c)**2 + (y-y_c)**2)
        total_error_r += abs(r - r_c)
print 'total count:', len(animals2['gesture2'])
print 'correct_type_count:', correct_type_count
print 'correct_type_rate: ' + str(correct_type_count / float(len(animals2['gesture2'])) * 100) + "%"
print 'correct_count:', correct_count
print 'correct_rate: ' + str(correct_count / float(len(animals2['gesture2'])) * 100) + "%"
print 'average_error (center):', total_error_c / correct_type_count
print 'average_error (radius):', total_error_r / correct_type_count
print
print
print '**************************************************'
print 'Animals2 (Dogs)'
print 'gesture 2'
print '**************************************************'
correct_type = animals2['answer'][2-1]['type']
print 'correct_type:', correct_type
print 'users who guessed correctly:'
x_c, y_c = animals2['answer'][2-1]['center']
correct_type_count = 0
correct_count = 0
total_error = 0
c2 = 0
for j in animals2['gesture2']:
    c2 += 1
    if j['type'] == correct_type:
        correct_type_count += 1
        x, y = j['center']
        if compare((x,y), (x_c, y_c)):
            correct_count += 1
            print c2
        total_error += math.sqrt((x-x_c)**2 + (y-y_c)**2)
print 'total count:', len(animals2['gesture2'])
print 'correct_type_count:', correct_type_count
print 'correct_type_rate: ' + str(correct_type_count / float(len(animals2['gesture2'])) * 100) + "%"
print 'correct_count:', correct_count
print 'correct_rate: ' + str(correct_count / float(len(animals2['gesture2'])) * 100) + "%"
print 'average_error:', total_error / correct_type_count
print
print
print '**************************************************'
print 'Animals2 (Dogs)'
print 'gesture 3'
print '**************************************************'
correct_type = animals2['answer'][3-1]['type']
print 'correct_type:', correct_type
print 'users who guessed correctly:'
x_c, y_c = animals2['answer'][3-1]['center']
r_c = animals2['answer'][3-1]['radius']
correct_type_count = 0
correct_count = 0
total_error_c = 0
total_error_r = 0
c3 = 0
for j in animals2['gesture3']:
    c3 += 1
    if j['type'] == correct_type:
        correct_type_count += 1
        x, y = j['center']
        r = j['radius']
        if compare((x,y), (x_c, y_c)):
            if abs(r_c - r) < dr:
                correct_count += 1
                print c3
        total_error_c += math.sqrt((x-x_c)**2 + (y-y_c)**2)
        total_error_r += abs(r - r_c)
print 'total count:', len(animals2['gesture2'])
print 'correct_type_count:', correct_type_count
print 'correct_type_rate: ' + str(correct_type_count / float(len(animals2['gesture2'])) * 100) + "%"
print 'correct_count:', correct_count
print 'correct_rate: ' + str(correct_count / float(len(animals2['gesture2'])) * 100) + "%"
print 'average_error (center):', total_error_c / correct_type_count
print 'average_error (radius):', total_error_r / correct_type_count
print
print

# Analysis for Waldo2
print '**************************************************'
print 'Waldo2'
print 'gesture 1'
print '**************************************************'
correct_type = waldo2['answer'][1-1]['type']
print 'correct_type:', correct_type
print 'users who guessed correctly:'
x_c, y_c = waldo2['answer'][1-1]['center']
print x_c, y_c
correct_type_count = 0
correct_count = 0
total_error_c = 0
c1 = 0
for j in waldo2['gesture1']:
    c1 += 1
    if j['type'] == correct_type:
        correct_type_count += 1
        x, y = j['center']
        if compare((x,y), (x_c, y_c)):
            correct_count += 1
            print c1
        total_error_c += math.sqrt((x-x_c)**2 + (y-y_c)**2)
print 'total count:', len(waldo2['gesture2'])
print 'correct_type_count:', correct_type_count
print 'correct_type_rate: ' + str(correct_type_count / float(len(waldo2['gesture2'])) * 100) + "%"
print 'correct_count:', correct_count
print 'correct_rate: ' + str(correct_count / float(len(waldo2['gesture2'])) * 100) + "%"
print 'average_error (center):', total_error_c / correct_type_count
print
print
print '**************************************************'
print 'Waldo2'
print 'gesture 2'
print '**************************************************'
correct_type = waldo2['answer'][2-1]['type']
print 'correct_type:', correct_type
print 'users who guessed correctly:'
x_s, y_s = waldo2['answer'][2-1]['start']
x_e, y_e = waldo2['answer'][2-1]['end']
correct_type_count = 0
correct_count = 0
total_error_s = 0
total_error_e = 0
c2 = 0
for j in waldo2['gesture2']:
    c2 += 1
    if j['type'] == correct_type:
        correct_type_count += 1
        if compare((j['start'][0],j['start'][1]), (x_s, y_s)):
            if compare((j['end'][0],j['end'][1]), (x_e, y_e)):
                correct_count += 1
                print c2
        total_error_s += math.sqrt((j['start'][0] - x_s)**2 + (j['start'][1]-y_s)**2)
        total_error_e += math.sqrt((j['end'][0] - x_e)**2 + (j['end'][1]-y_e)**2)
print 'total count:', len(waldo2['gesture2'])
print 'correct_type_count:', correct_type_count
print 'correct_type_rate: ' + str(correct_type_count / float(len(waldo2['gesture2'])) * 100) + "%"
print 'correct_count:', correct_count
print 'correct_rate: ' + str(correct_count / float(len(waldo2['gesture2'])) * 100) + "%"
print 'average_error (start):', total_error_s / correct_type_count
print 'average_error (end):', total_error_e / correct_type_count
print
print
print '**************************************************'
print 'Waldo2'
print 'gesture 3'
print '**************************************************'
correct_type = waldo2['answer'][3-1]['type']
print 'correct_type:', correct_type
print 'users who guessed correctly:'
x_c, y_c = waldo2['answer'][3-1]['center']
r_c = waldo2['answer'][3-1]['radius']
correct_type_count = 0
correct_count = 0
total_error_c = 0
total_error_r = 0
c3 = 0
for j in waldo2['gesture3']:
    c3 += 1
    if j['type'] == correct_type:
        correct_type_count += 1
        x, y = j['center']
        r = j['radius']
        if compare((x,y), (x_c, y_c)):
            if abs(r_c - r) < dr:
                correct_count += 1
                print c3
        total_error_c += math.sqrt((x-x_c)**2 + (y-y_c)**2)
        total_error_r += abs(r - r_c)
print 'total count:', len(waldo2['gesture2'])
print 'correct_type_count:', correct_type_count
print 'correct_type_rate: ' + str(correct_type_count / float(len(waldo2['gesture2'])) * 100) + "%"
print 'correct_count:', correct_count
print 'correct_rate: ' + str(correct_count / float(len(waldo2['gesture2'])) * 100) + "%"
print 'average_error (center):', total_error_c / correct_type_count
print 'average_error (radius):', total_error_r / correct_type_count
print
print






