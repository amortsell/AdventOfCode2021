file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Input\\Day 5.txt", "r")
lines = file.readlines()

class Point(object):
  pass

class Line(object):
  pass


for line in lines:
  if line[len(line) - 1] == '\n':
    line = line[:-1]
  