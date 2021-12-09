/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';
import ICommand from './Models/Command';
import IInput from './Models/Input';
import IAlternative from './Models/Alternative';
import { resourceLimits } from 'worker_threads';

const display: string[] = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];

const lines = fs.readFileSync('Input/Day 8.txt', 'utf8').toString();
const rounds: ICommand[] = lines.split('\r\n').map(l => {
  const input = l.split('|')[0].split(' ').filter((i: string) => i.length > 0);
  const output = l.split('|')[1].split(' ').filter((i:string) => i.length > 0);
  let command = {
    input: [...input],
    output: [...output]
  } as ICommand;
  return command;
});

const testState = (state: IInput[], test: string, target: string): IInput[] => {
  let newState = state.map((s: IInput) => {
    if (s.solved.split('').sort().join('') !== s.input.split('').sort().join('')) {
      if (s.input.indexOf(test) > -1) {
        s.solved += test;
        let found = false;
        s.alternatives = s.alternatives.map((a: any) => {
          if (a.result.indexOf(target) !== -1 && !found) {
            found = true;
            s.result += target;
          }
          a.result = a.result.replace(target, '');
          return a;
        }).filter((a: any) => a.result.length == s.input.length - s.solved.length);
      }
    }
    return s;
  });

  let solved = newState.filter(s => s.solved.length !== s.input.length).length === 0;
  if (!solved) {
    if (newState.filter((s: IInput) => s.input.length !== s.result.length && s.alternatives.length == 0).length > 0) {
      // This was not a valid solution
      return [];
    }
    if (newState.filter(s => s.alternatives.length > 0).length > 0) {
      let nextTest = newState.find(s => s.alternatives.length === 1 && s.alternatives[0].result.length === 1);
      if (nextTest && nextTest.alternatives && nextTest.alternatives.length > 0 && nextTest.input) {
        const input = nextTest.input.split('').reduce((prev, i) => {
          if (nextTest && nextTest.solved && nextTest.solved.indexOf(i) == -1) {
            return prev + i;
          }
          return prev;
        }, '')
        return testState(newState, input, nextTest.alternatives[0].result);
      } else {
        let nextIndex: number = -1;
        const nextTestString: string = newState.reduce((prev: string, state: IInput, ix) => {
          if (state.input.length !== state.solved.length && state.input.length - state.solved.length < prev.length) {
            nextIndex = ix;
            const newTest: IAlternative = state.alternatives.find((a: IAlternative) => a.result.length == state.input.length - state.solved.length);
            if (newTest) {
              return newTest.result
            } else {
              return prev;
            }
          } else {
            return prev;
          }
        }, 'xxxxxxxxxx');
        const nextTest = newState[nextIndex];

        let result: IInput[] = [];
        for (let i = 0; i < nextTest.alternatives.length; i++) {
          const a = nextTest.alternatives[i];
          const testTarget = a.result.split('');
          const input = nextTest.input.split('').reduce((prev, i) => {
            if (nextTest && nextTest.solved && nextTest.solved.indexOf(i) == -1) {
              return prev + i;
            }
            return prev;
          }, '');
          const testInput: string[] = input.split('');
          for (let j = 0; j < testInput.length; j++) {
            const input = testInput[j];
            for (let k = 0; k < testTarget.length; k++) {
              const target = testTarget[k];
              result = testState(JSON.parse(JSON.stringify(newState)), input, target);
              if (result && result.length) {
                break;
              }
            }
            if (result && result.length) {
              break;
            }
          }
          if (result && result.length) {
            break;
          }
        }
        if (result && result.length) {
          return result;
        } else {
          return [];
        }
      }
    } else {
      return [];
    }
  } 
  
  return newState;
}

const findString = (state: IInput[], search: string): IInput | undefined => {
  return state.find(s => {
    return s.input.split('').sort().join() === search.split('').sort().join();
  });
}

let result = 0;
rounds.forEach(r => {
  let currentState: IInput[] = r.input.map((i, ix, arr) => {
    let state: IInput = {
      solved: '',
      result: '',
      alternatives: display.filter(d => d.length === i.length),
      input: i
    }
    state.alternatives = state.alternatives.map((a: any) => {
      return { 
        digit: display.indexOf(a),
        result: a
      };
    });
    return state;
  });
  const initialTarget: string = display.reduce((prev, d) => d.length < prev.length ? d : prev, 'xxxxxxxx');
  const initialTest: string = currentState.reduce((prev: string, state: any) => state.input.length == initialTarget.length ? state.input : prev, '' as string);

  const tests = initialTest.split('');
  const targets = initialTarget.split('');
  let finalState: IInput[] = [];
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    for (let j = 0; j < targets.length; j++) {
      const target = targets[j];
      const testResult: IInput[] = testState(JSON.parse(JSON.stringify(currentState)), test, target);
      if (testResult && testResult.length) {
        finalState = testResult;
        break;
      } 
    }
    if (finalState && finalState.length) {
      break;
    }
  }
  if (finalState && finalState.length) {
    const strResult = r.output.reduce((prev, curr) => {
      const output = findString(finalState, curr);
      if (output) {
        return prev + output.alternatives[0].digit.toString();
      } else {
        return prev;
      }
    }, '')
    result += parseInt(strResult);
  }
});
console.log(result);