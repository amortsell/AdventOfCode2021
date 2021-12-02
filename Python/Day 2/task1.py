file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Day 2\\input.txt", "r")
lines = file.readlines()

class Direction(object):
  pass

count = 0
last = ''
xPos = 0
yPos = 0
directions = []
for line in lines:
  dir = Direction()
  parts = line.split(' ')
  dir.action = parts[0]
  dir.length = int(parts[1])
  directions.append(dir)

for direction in directions:
  if direction.action == "forward":
    xPos += direction.length
  elif direction.action == "down":
    yPos += direction.length
  else:
    yPos -= direction.length

result = xPos * yPos
print(result)

