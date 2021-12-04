file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Input\\Day 2.txt", "r")
lines = file.readlines()

class Direction(object):
  pass

count = 0
last = ''
xPos = 0
yPos = 0
aim = 0
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
    yPos += direction.length * aim
  elif direction.action == "down":
    aim += direction.length
  else:
    aim -= direction.length

result = xPos * yPos
print(result)

