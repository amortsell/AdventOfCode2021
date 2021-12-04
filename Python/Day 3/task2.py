file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Input\\Day 3.txt", "r")
lines = file.readlines()

def getValidLines(lines, comparison):
  i = 0 
  ones = 0
  zeros = 0
  tmpLines = []
  while i < len(lines[0]) - 1 and len(lines) > 1:
    tmpLines = [];
    ones = 0
    zeros = 0
    for line in lines:
      if line[i] == '0':
        zeros += 1
      else:
        ones += 1

    filter = ''
    if ones >= zeros and comparison == 0 or ones < zeros and comparison == 1: 
      filter = '1'
    else: 
      filter = '0'

    for line in lines:
      if line[i] == filter:
        tmpLines.append(line)
    lines = tmpLines.copy()
    i += 1

  if lines[0][len(lines[0]) - 1] == '\n':
    lines[0] = lines[0][:-1]
  return lines[0]

oxygenGeneratorRating = int(getValidLines(lines, 0), 2)
co2ScrubberRating = int(getValidLines(lines, 1), 2)
print(oxygenGeneratorRating * co2ScrubberRating)
