import jaro

with open("password2_analysis.txt", "w") as writer:
    writer.write("actual, guess, jaro-winkler\n")
    total = 0.0
    number = 0.0
    with open("password2.txt", "r") as f:
        f.readline()
        for line in f.readlines():
            parts = line.split()
            actual = parts[1]
            guess = parts[2]

            #edit_distance = editdistance.eval(actual, guess)
            jaro_winkler = jaro.jaro_winkler_metric(unicode(actual), unicode(guess))
            total += jaro_winkler
            number += 1
            writer.write(actual + ", " + guess + ", " + str(jaro_winkler) + "\n")
    writer.write("Average: " + str(total/number))
