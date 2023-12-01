// import axios from 'axios';
import axios from 'axios';
import { defineStore } from 'pinia'

export const useDataStore = defineStore('DataStore', {
    state: () => {
        return {
            movies: [
                {
                    name: 'Toshkent',
                    latitude: 69.254631,
                    longitude: 41.316011,
                    type: 1,
                    id: 1,
                },
                {
                    name: 'Chirchiq',
                    latitude: 69.591520,
                    longitude: 41.492798,
                    type: 1,
                    id: 2,
                },
                {
                    name: 'Samarqand',
                    latitude: 66.947957,
                    longitude: 39.668590,
                    type: 2,
                    id: 3,
                },
            ]
        }
    },
    actions: {
        getCoordinates() {
            let coordinates = [
                {
                    name: 'Toshkent',
                    coordinates: [69.254631, 41.316011],
                    description: 1,
                    id: 1,
                },
                {
                    name: 'Chirchiq',
                    coordinates: [69.591520, 41.492798],
                    description: 'asdjf asdjhf jahsdjkfhasd asdjkfh aksjdhf asjhdfk hasdkjfh askjdhfjkh sdhfj kashdfkjh asdjkfhkj',
                    id: 2,
                },

            ];

        
            //make https request to the list
            /*axios.get('http://sharepoint.site.path/lits/markers')
                .then((response) => {
                    console.log(response);
                    response.data.forEach(item => coordinates.push([item.latitude, item.longitude]));
                });*/
            // this.movies.forEach(movie => coordinates.push([movie.latitude, movie.longitude]));
            axios.get("https://b7db-195-158-8-218.ngrok.io/api/Point").then(res => {

                if (res.data) {
                    coordinates = res.data.map(item => ({ coordinates: [item.latitude, item.longitude], name: item.name, description: item.description }));
                }
            }).catch(err => {
                console.log(err);
            })
            return coordinates;
        },

        createData(item) {
            this.data.push(item)
        },
        onToggleHandler({ id, prop }) {
            this.data = this.data.map(item => {
                if (item.id == id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item
            })
        },
        onRemoveHandler(id) {
            this.data = this.data.filter(c => c.id !== id)
        },
        onSearchHandler(arr, term) {
            if (term.length == 0) {
                return arr
            }
            return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
        },
        onFilterHandler(arr, filter) {
            switch (filter) {
                case 'popular':
                    return arr.filter(c => c.type === 1)
                case 'mostViewers':
                    return arr.filter(c => c.type > 1)
                default:
                    return arr
            }
        },
        updateTernHandler(term) {
            this.term = term
        },
        updateFilterHandler(filter) {
            this.filter = filter
        }
    },
})


// axios.get("https://b7db-195-158-8-218.ngrok.io/api/Point").then(res => {
//     console.log(res.data);
//     if(res.data) {
//       icons = res.data.map(item => ({coordinates: [item.latitude, item.longitude]}))
//     }
//   }).catch(err => {
//     console.log(err);
//   })