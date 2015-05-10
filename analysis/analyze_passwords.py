import editdistance

with open("password1_analysis.txt", "w") as writer:
    writer.write("actual, guess, editdistance")
    with open("password1.txt", "r") as f:
        f.readline()
        for line in f.readlines():
            parts = line.split()
            actual = parts[1]
            guess = parts[2]

            edit_distance = editdistance.eval(actual, guess)
            writer.write(actual + ", " + guess + ", " + str(edit_distance) + "\n")
