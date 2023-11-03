(function(Scratch) {
  class cool_ext {
    getInfo() {
      return {
        id: 'coolextension',
        name: 'Cool Extension',
        color1: #ffdc69,
        blocks: [
          {
            opcode: 'cheddarcheese',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cheddar cheese natural cost per Pound in U.S. City'
          }
        ]
      };
    }
    cheddarcheese() {
      return 5.846;
    }
  }
  Scratch.extensions.register(new cool_ext());
})(Scratch);
