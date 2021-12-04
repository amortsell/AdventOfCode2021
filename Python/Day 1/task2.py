file = open("C:\\Source\\amortsell\\AdventOfCode2021\\Input\\Day 1.txt", "r")
lines = file.readlines()

def arrSum(arr):
  sum = 0
  for i in arr:
    sum += i
  return sum 

count = 0
arr1 = []
arr2 = []
arr3 = [] 
wait = 2
for line in lines:
  if wait >= 0:
    arr1.append(int(line))
  if wait < 2:
    arr2.append(int(line))
  if wait < 1:
    arr3.append(int(line))
  if wait < 0:
    if arrSum(arr2) > arrSum(arr1):
      count += 1
    arr1 = arr2.copy()
    arr2 = arr3.copy()
    arr3.clear()
    arr3.append(int(line))
  wait -= 1    

print(count)