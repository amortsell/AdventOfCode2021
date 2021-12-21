/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 18.txt', 'utf8').toString().split('\r\n');

let tasks: any[][] = [];

lines.forEach(line => {
  tasks.push(JSON.parse(line));
});

const add = (task1: any[], task2: any[]): any[] => {
  return [task1, task2];
}

const getSubTask = (remainingString: string): string => {
  let subStack: any[] = [ '[' ]
  let level = 1;
  let i = 0;
  while (level > 0) {
    if (remainingString[i] == '[') {
      level++;
    } else if (remainingString[i] == ']') {
      level--;
    }
    subStack.push(remainingString[i++])
  }
  return subStack.join('');
}

const splitTask = (stack: any[]): any[] => {
  for (let i = 0; i < stack.length; i++) {
    if (!isNaN(stack[i]) && stack[i] >= 10) {
      let left = stack[i] / 2;
      let right = stack[i] / 2;
      if (left != Math.floor(left)) {
        left = Math.floor(left)
        right = Math.floor(left) + 1;
      }

      stack.splice(i, 1, '[', left, right, ']');
      break;
    }
  }

  const result = stringifyStack(stack);
  return JSON.parse(result);
}

const stringifyStack = (stack: any[], left: boolean = true): string => {
  let last: any = undefined;
  let result: string = '';
  if (left) {
    while (stack.length > 0) {
      let current = stack.pop();
      if (isNaN(current)) {
        if (last === '[' && current === ']' || current === ']' && !isNaN(last)) {
          result = current + ',' + result;
        } else {
          result = current + result;
        }
      } else {
        if (!isNaN(last) || last === '[') {
          result = current + ',' + result;
        } else {
          result = current + result;
        }
      }
      last = current;
    }
  } else {
    while (stack.length > 0) {
      let current = stack.pop();
      if (isNaN(current)) {
        if (last === ']' && current === '[' || current === '[' && !isNaN(last)) {
          result = result + ',' + current;
        } else {
          result += current;
        }
      } else {
        if (!isNaN(last) || last == ']') {
          result = result + ',' + current;
        } else {
          result += current;
        }
      }
      last = current;
    }
  }

  return result;
} 

const explodeTask = (task: any[], leftStack: any[], rightStack: any[]): any[] => {
  let left = 0;
  let zeroPushed = false;
  let tmpStack: any[] = [];
  const first = leftStack.pop();
  if (!isNaN(first)) {
    leftStack.push(first + task[0]);
  } else {
    tmpStack.push(first);
    let current = leftStack.pop();
    while (current !== undefined && isNaN(current)) {
      tmpStack.push(current);
      current = leftStack.pop();
    }

    if (!isNaN(current)) {
      leftStack.push(current + task[0]);
    }
    while (tmpStack.length > 0) {
      leftStack.push(tmpStack.pop());
    }
    if (Array.isArray(task[1])) {
      leftStack.push('[');
      leftStack.push(task[0] + task[1][0]);
    } else {
      leftStack.push(0);
      zeroPushed = true;
    }
  }

  const next = rightStack.pop();
  if (!isNaN(next)) {
    rightStack.push(next + task[1]);
  } else {
    tmpStack.push(next);
    let current = rightStack.pop();
    while (current !== undefined && isNaN(current)) {
      tmpStack.push(current);
      current = rightStack.pop();
    }

    if (!isNaN(current)) {
      if (Array.isArray(task[1])) {
        rightStack.push(current + task[1][1]);
      } else {
        rightStack.push(current + task[1]);
      }
    }
    while (tmpStack.length > 0) {
      rightStack.push(tmpStack.pop());
    }

    if (!zeroPushed) {
      if (Array.isArray(task[1])) {
        rightStack.push(']');
      }
      rightStack.push(0);
    }
  }
  let result = stringifyStack(leftStack);
  result += ',';
  result += stringifyStack(rightStack, false);
  return JSON.parse(result);
}

const reduceTask = (task: any[]): any[] => {
  let taskString = JSON.stringify(task);
  let leftStack: any[] = [];
  let levels = 0;
  for (let i = 0; i < taskString.length; i++) {
    if (taskString[i] == '[') {
      levels++;
      if (levels >= 5) {
        let subTask = JSON.parse(getSubTask(taskString.substring(i + 1)));
        if (!Array.isArray(subTask[0])) {
          let remainingString = taskString.substring(i + JSON.stringify(subTask).length);
          let rightStack: any[] = [];
          for (let j = remainingString.length - 1; j >= 0; j--) {
            if (/\d/.test(remainingString[j])) {
              let k = j
              let numPart = remainingString[k--];
              while (/\d/.test(remainingString[k])) {
                numPart = remainingString[k--] + numPart;
              }
              j = k + 1;
              rightStack.push(parseInt(numPart));
            } else if (remainingString[j] == '[' || remainingString[j] == ']') {
              rightStack.push(remainingString[j]);
            } 
          }
          task = explodeTask(subTask, leftStack, rightStack);
          return reduceTask(task);
        } else {
          leftStack.push(taskString[i]);
        }
      } else {
        leftStack.push(taskString[i]);
      }
    } else if (taskString[i] == ']') {
      leftStack.push(taskString[i]);
      levels--;
    } else if (/\d/.test(taskString[i])) {
      let numPart = taskString[i];
      let j = i + 1;
      while (/\d/.test(taskString[j])) {
        numPart += taskString[j++];
      }
      i = j - 1;
      leftStack.push(parseInt(numPart));
    } 
  }
  if (leftStack.filter(c => !isNaN(c) && c >= 10).length > 0) {
    task = splitTask(leftStack);
    return reduceTask(task);
  }
  return task;
}

const magnitude = (task: any): number => {
  if (Array.isArray(task)) {
    return 3 * magnitude(task[0]) + 2 * magnitude(task[1]);
  } else {
    if (!isNaN(task)) {
      return task;
    } else {
      return NaN;
    }
  }
} 

let maxMagnitude = 0;
for (let i = 0; i < tasks.length; i++) {
  for (let j = 0; j < tasks.length; j++) {
    if (i != j) {
      let sum = reduceTask([tasks[i], tasks[j]]);
      maxMagnitude = Math.max(maxMagnitude, 3 * magnitude(sum[0]) + 2 * magnitude(sum[1]));
      sum = reduceTask([tasks[j], tasks[i]]);
      maxMagnitude = Math.max(maxMagnitude, 3 * magnitude(sum[0]) + 2 * magnitude(sum[1]));
    }
  }
}
console.log(maxMagnitude);