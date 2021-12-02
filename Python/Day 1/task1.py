file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Day 1\\input.txt", "r")
lines = file.readlines()

count = 0
last = ''
for line in lines:
  if last != '':
    if int(line) > int(last):
      count += 1
  last = line

print("{0}".format(count))