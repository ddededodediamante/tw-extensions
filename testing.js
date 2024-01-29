(function(Scratch) {
  const unsandboxed = Scratch.extensions.unsandboxed;

  function generateCondition(amount) {
    const result = {};
  
    for (let i = 1; i <= amount; i++) {
      const condition = `condition${i}`;
      result[condition] = {
        type: Scratch.ArgumentType.BOOLEAN
      };
    }
  
    return result;
  }
	
  function delayAndReturn(value, seconds) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value);
      }, seconds * 1000);
    });
  }
	
  class test_ext {
    getInfo() {
      return {
        id: 'ddetest',
        name: 'Test Extension',
        blocks: [
          {
            opcode: 'argumentsjoin',
            blockType: Scratch.BlockType.REPORTER,
            text: 'join [string1] [string2]',
            arguments: {
              string1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'txt1'
              },
              string2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'txt2'
              }
            }
          },
          {
            opcode: 'commandtest',
            blockType: Scratch.BlockType.COMMAND,
            text: 'log'
          },
          {
            opcode: 'ifremake',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: 'if [condition] then',
            branchCount: 1,
            arguments: {
              condition: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
	  {
            opcode: 'ifelseremake',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: ["if [condition] then", "else"],
            branchCount: 2,
            arguments: {
              condition: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
	  {
            opcode: 'deletepage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete project'
          },
	  {
            opcode: 'returnwithwait',
            blockType: Scratch.BlockType.REPORTER,
	    allowDropAnywhere: true,
            text: 'return [string] after [time] seconds',
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hello'
              },
              time: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'ifelse8',
            blockType: Scratch.BlockType.CONDITIONAL,
            text: ["if [condition] then", "else if [condition2]", "else if [condition3]", "else if [condition4]", "else if [condition5]", "else if [condition6]", "else if [condition7]", "else if [condition8]"],
            branchCount: 8,
            arguments: generateCondition(8)
	  }
	]
      };
    }
    argumentsjoin(args) {
      return args.string1 + args.string2;
    }
    commandtest(args, util) {
      console.log(Scratch, util);
    }
    ifremake(args, util) {
      const condition = args.condition;
      if (condition) {
        util.startBranch(1, false);
      }
    }
    ifelseremake(args, util) {
      const condition = args.condition;
      if (condition) {
        util.startBranch(1, false);
      } else {
	util.startBranch(2, false);
      }
    }
    deletepage() {
      if (!unsandboxed) {
	window.alert('bro you didnt give me unsandbox')
      } else {
	Scratch.vm.loadProject({"targets":[{"isStage":true,"name":"Stage","variables":{"`jEk@4|i[#Fk?(8x)AV.-my variable":["mi variable",0]},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"name":"","bitmapResolution":2,"dataFormat":"png","assetId":"c446646a95cd43c36d25583fdaea3dbc","md5ext":"c446646a95cd43c36d25583fdaea3dbc.png","rotationCenterX":0,"rotationCenterY":0}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}});
      }
    }
    returnwithwait(args) {
      return delayAndReturn(args.string, args.time);
    }
    ifelse8(args, util) {
      const c1 = args.condition; const c2 = args.condition2; const c3 = args.condition3; const c4 = args.condition4;
      const c5 = args.condition5; const c6 = args.condition6; const c7 = args.condition7; const c8 = args.condition8;
      util.startBranch(c1 ? 1 : c2 ? 2 : c3 ? 3 : c4 ? 4 : c5 ? 5 : c6 ? 6 : c7 ? 7 : c8 ? 8 : 0, false);
    }
  }
  Scratch.extensions.register(new test_ext());
})(Scratch);
