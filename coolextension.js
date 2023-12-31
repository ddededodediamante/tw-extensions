(function(Scratch) {
  class cool_ext {
    getInfo() {
      return {
        id: 'coolextension',
        name: 'Coolest Extension',
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
          },
          {
            opcode: 'helloInSpanish',
            blockType: Scratch.BlockType.REPORTER,
            text: 'hello in spanish'
          },
          {
            opcode: 'holaEnIngles',
            blockType: Scratch.BlockType.REPORTER,
            text: 'hola en ingles'
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
    helloInSpanish() {
      return 'hola';
    }
    holaEnIngles() {
      return 'hello';
    }
  }
  Scratch.extensions.register(new cool_ext());
})(Scratch);
