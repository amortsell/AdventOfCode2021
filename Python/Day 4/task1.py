file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Input\\Day 4.txt", "r")
lines = file.readlines()

class Cell(object):
  pass

class Board(object):
  def hasBingo(self):
    for row in self.rows:
      i = 0
      for cell in row:
        if cell.hit == False:
          break
        i += 1
      if i == 5:
        return True
    i = 0
    while i < len(self.rows[0]):
      j = 0
      while j < len(self.rows):
        if cell.hit == False:
          break
        j += 1
      if j == 5:
        return True
      i += 1
    return False
  def hitCell(self, value):
    for row in self.rows:
      j = 0
      while j < len(row):
        if row[j].val == value:
          row[j].hit = True
          break
        j += 1
  def countUnmarked(self):
    result = 0
    for row in self.rows:
      i = 0
      while i < len(row):
        if row[i].hit == False:
          result += row[i].val
        i += 1
    return result



rounds = []
boards = []
board = None
for line in lines:
  if ',' in line:
    rounds = line.split(',')
  elif line == '\n':
    if board:
      boards.append(board)
    board = Board()
    board.rows = []
  else:
    if '\n' in line:
      line = line[:-1]
    cols = [cols for cols in line.split(' ') if cols.strip() != '']
    row = []
    i = 0
    while i < len(cols):
      cell = Cell()
      cell.val = int(cols[i])
      cell.hit = False
      row.append(cell)
      i += 1
    board.rows.append(row.copy())

result = None
for round in rounds:
  for board in boards:
    board.hitCell(int(round))
    if board.hasBingo():
      result = board
      break
  
  if result != None:
    unmarked = board.countUnmarked()
    print(int(round) * unmarked)
    break




  
