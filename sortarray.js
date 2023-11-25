(function(Scratch) {
  class arraySorting {
    getInfo() {
      return {
        id: 'ddesortarray',
        name: 'Array sorting',
        color1: '#72cf94',
        blocks: [
          {
            opcode: 'sortByNumber',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sort array [array] [menu] by numbers',
            arguments: {
              array: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,5,2,9]'
              },
              menu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ORDER_MENU',
                defaultValue: 'highest'
              }
            }
          },
          {
            opcode: 'sortByAlphabet',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sort array [array] [menu] by alphabet',
            arguments: {
              array: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","z","c","b"]'
              },
              menu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ALPHABET_MENU',
                defaultValue: 'a-z'
              }
            }
          },
          {
            opcode: 'sortRandom',
            blockType: Scratch.BlockType.REPORTER,
            text: 'randomize array [array]',
            arguments: {
              array: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a",1,"b",2]'
              }
            }
          },
          {
            opcode: 'sortShuffle',
            blockType: Scratch.BlockType.REPORTER,
            text: 'shuffle array [array]',
            arguments: {
              array: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a",1,"b",2]'
              }
            }
          },
          {
            opcode: 'sortReverse',
            blockType: Scratch.BlockType.REPORTER,
            text: 'reverse array [array]',
            arguments: {
              array: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a",1,"b",2]'
              }
            }
          }
        ],
        menus: {
          ORDER_MENU: {
            acceptReporters: true,
            items: ['highest', 'lowest']
          },
          ALPHABET_MENU: {
            acceptReporters: true,
            items: ['a-z', 'z-a']
          }
        }
      };
    }
    sortByNumber(args) {
      const array = JSON.parse(args.array).sort((a,b) => a-b)
      if (args.menu == 'highest') { array.reverse() }
      return JSON.stringify(array);
    }
    sortByAlphabet(args) {
      const array = JSON.parse(args.array).sort()
      if (args.menu == 'z-a') { array.reverse() }
      return JSON.stringify(array);
    }
    sortRandom(args) {
      const array = JSON.parse(args.array).sort(() => Math.random() - 0.5)
      return JSON.stringify(array);
    }
    sortShuffle(args) {
      const array = JSON.parse(args.array);
      const originalIndices = array.map((_, index) => index);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[originalIndices[i]], array[originalIndices[j]]];
        [originalIndices[i], originalIndices[j]] = [originalIndices[j], originalIndices[i]];
      }
      return JSON.stringify(array);
    }
    sortReverse(args) {
      const array = JSON.parse(args.array).reverse()
      return JSON.stringify(array);
    }
  }
  Scratch.extensions.register(new arraySorting());
})(Scratch);
