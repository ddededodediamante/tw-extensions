(function(Scratch) {
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
            text: 'log scratch and target'
          },
          {
            opcode: 'ifremake',
            blockType: Scratch.BlockType.COMMAND,
            text: 'if [condition] then',
            branchCount: 1,
            arguments: {
              condition: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'squareoutput',
            blockType: Scratch.BlockType.OUTPUT,
	    text: 'square',
	    output: "Boolean",
	    outputShape: 3
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
  }
  Scratch.extensions.register(new test_ext());
})(Scratch);
