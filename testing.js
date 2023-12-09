(function(Scratch) {
  const unsandboxed = Scratch.extensions.unsandboxed;
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
      const condition = Scratch.Cast.toBoolean(args.condition);
      if (condition) {
        util.startBranch(1, false);
      }
    }
    ifelseremake(args, util) {
      const condition = Scratch.Cast.toBoolean(args.condition);
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
  }
  Scratch.extensions.register(new test_ext());
})(Scratch);
