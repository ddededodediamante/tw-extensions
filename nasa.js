(function (Scratch) {
    class dde_nasa_ext {
      getInfo() {
        return {
          id: 'ddenasamediasearch',
          name: 'Nasa Media Search',
          color1: '#543275',
          blocks: [
            {
              opcode: 'searchNasaMedia',
              blockType: Scratch.BlockType.REPORTER,
              text: 'search for nasa images of [search]',
              arguments: {
                search: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'moon',
                },
              },
            }
          ]
        };
      }
  
      searchNasaMedia(args) {
        const search = args.search;
        const media = 'image';
  
        const apiNasaUrl = `https://images-api.nasa.gov/search?q=${encodeURI(search)}`;
  
        return fetch(apiNasaUrl)
          .then(response => response.json())
          .then(data => {
            const items = data.collection.items;
            const mediaItems = items.filter(item => item.data[0].media_type == media);
  
            const randomMedia = mediaItems[Math.floor(Math.random() * mediaItems.length)];
  
            const mediaDate = new Date(randomMedia.data[0].date_created);
  
            return JSON.stringify({
              url: encodeURI(randomMedia.links[0].href),
              date_created: {
                year: mediaDate.getFullYear(),
                dayOfWeek: mediaDate.getDay(),
                hours: mediaDate.getHours()
              },
            });
          })
          .catch(err => {
            console.error(err);
            return 'null';
          });
      }
    }
  Scratch.extensions.register(new dde_nasa_ext());
})(Scratch);
