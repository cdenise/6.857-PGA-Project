from firebase import firebase

# Get results
print "getting password results from 'https://6857-project-pga.firebaseio.com/'\n"
firebase = firebase.FirebaseApplication('https://6857-project-pga.firebaseio.com/', None)
results = firebase.get('/password', None)
print results

# format results
p1 = []
p1_guess = []
p2 = []
p2_guess = []
for entry in results.values():
    try:
        p1.append(str(entry[unicode('pass1')]))
        p1_guess.append(str(entry[unicode('pass1guess')]))
        p2.append(str(entry[unicode('pass2')]))
        p2_guess.append(str(entry[unicode('pass2guess')]))
    except(e):
        print 'Error', e
print
print 'p1'
print p1
print
print 'p1_guess'
print p1_guess
print
print 'p2'
print p2
print
print 'p2_guess'
print p2_guess
# saves and print results
f = open('password.txt', 'w')
f.write('password 1\n')
for i in range(len(p1)):
    f.write(str(i) + '\t\t' + p1[i] + '\t\t' + p1_guess[i] + '\n')
f.write('\n\npassword2\n')
for i in range(len(p2)):
    f.write(str(i) + '\t\t' + p2[i] + '\t\t' + p2_guess[i] + '\n')
f.close()





