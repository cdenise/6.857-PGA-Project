import difflib

with open("difflib_password2_analysis.txt", "w") as writer:
    writer.write("actual, guess, diffLibn")
    total = 0.0
    number = 0.0
    with open("password2.txt", "r") as f:
        f.readline()
        for line in f.readlines():
            parts = line.split()
            actual = parts[1]
            guess = parts[2]

            #edit_distance = editdistance.eval(actual, guess)
            jaro_winkler = difflib.SequenceMatcher(None, unicode(actual), unicode(guess)).ratio()
            total += jaro_winkler
            number += 1
            writer.write(actual + ", " + guess + ", " + str(jaro_winkler) + "\n")
    writer.write("Average: " + str(total/number))
