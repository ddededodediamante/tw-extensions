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
  }
  Scratch.extensions.register(new test_ext());
})(Scratch);
