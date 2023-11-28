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
            text: 'sort array [array] by [menu]',
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
            text: 'sort array [array] by [menu]',
            arguments: {
              array: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["a","c","z","b"]'
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
                defaultValue: '["a","b","c"]'
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
                defaultValue: '[1,2,3]'
              }
            }
          },
          {
            opcode: 'sortReversedOf',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [array1] reversed of [array2]?',
            arguments: {
              array1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[1,2,3]'
              },
              array2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[3,2,1]'
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
      let array = JSON.parse(args.array);
      const shuffleArray = () => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
      while (array.some((el, index) => el === JSON.parse(args.array)[index])) {
        shuffleArray();
      }
      return JSON.stringify(array);
    }
    sortReverse(args) {
      const array = JSON.parse(args.array).reverse()
      return JSON.stringify(array);
    }
    sortReversedOf(args) {
      const array1 = JSON.parse(args.array1).reverse().join()
      const array2 = JSON.parse(args.array2).join()
      return array1 == array2;
    }
  }
  Scratch.extensions.register(new arraySorting());
})(Scratch);
