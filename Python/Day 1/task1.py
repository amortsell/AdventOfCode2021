file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Input\\Day 1.txt", "r")
lines = file.readlines()

count = 0
last = ''
for line in lines:
  if last != '':
    if int(line) > int(last):
      count += 1
  last = line

print("{0}".format(count))