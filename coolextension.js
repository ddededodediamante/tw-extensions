(function(Scratch) {
  class cool_ext {
    getInfo() {
      return {
        id: 'coolextension',
        name: 'Cool Extension',
        color1: '#3e4652',
        blocks: [
          {
            opcode: 'cheddarcheese',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cheddar cheese natural cost per Pound in U.S. City'
          },
          {
            opcode: 'lettuce',
            blockType: Scratch.BlockType.REPORTER,
            text: 'lettuce iceberg cost per Pound in U.S. City'
          }
        ]
      };
    }
    cheddarcheese() {
      return 6.084;
    }
    lettuce() {
      return 1.660;
    }
  }
  Scratch.extensions.register(new cool_ext());
})(Scratch);
