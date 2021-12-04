file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Input\\Day 3.txt", "r")
lines = file.readlines()

class Epsilon(object):
  pass

class Gamma(object):
  pass

epsilon = Epsilon()
gamma = Gamma()
i = 0 
while i < len(lines[0]):
  if lines[0][i] != '\n':
    setattr(epsilon, str(i), 0)
    setattr(gamma, str(i), 0)
  i += 1

for line in lines:
  if line[len(line)-1] == '\n':
    line = line[:-1]
  i = 0
  while i < len(line):
    if line[i] == '0':
      setattr(gamma, str(i), getattr(gamma, str(i)) + 1)
    else:
      setattr(epsilon, str(i), getattr(epsilon, str(i)) + 1)
    i += 1

i = 0
strEpsilon = ''
strGamma = ''
while i < len(lines[0]):
  if lines[0][i] != '\n':
    if getattr(epsilon, str(i)) > getattr(gamma, str(i)):
      strEpsilon += '1'
      strGamma += '0'
    else:
      strEpsilon += '0'
      strGamma += '1'
  i += 1
print(int(strEpsilon, 2) * int(strGamma, 2))

