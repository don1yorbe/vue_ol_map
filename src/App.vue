<template>
    <div class="app">
        <div class="content">
            <InfoData :allDataCount="data.length"/>
            <div class="search-panel">
                <SearchPanel :updateTernHandler="updateTernHandler"/>
                <FilterData :updateFilterHandler="updateFilterHandler" :filterName="filter" />
                <AddData @createData="createData"/>
            </div>
            <Data
                    v-bind:data="onFilterHandler(onSearchHandler(data, term), filter)"
                    @onToggle="onToggleHandler"
                    @onRemove='onRemoveHandler'/>
            <Map/>
        </div>
    </div>
</template>

<script>
import "ol/ol.css";

import InfoData from "@/components/InfoData.vue";
import FilterData from "@/components/FilterData.vue";
import AddData from "@/components/AddData.vue";
import Data from "@/components/Data.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import Map from "@/components/Map.vue"
export default{
    components:{
        InfoData,
        SearchPanel,
        FilterData,
        AddData,
        Data,
        Map
    },
    data() {
        return {
            data:[
                {
                    name:'Toshkent',
                    latitude:69.254631,
                    longitude:41.316011,
                    type:1,
                    id:1,
                },
                {
                    name:'Chirchiq',
                    latitude:69.591520,
                    longitude:41.492798,
                    type:1,
                    id:2,
                },
                {
                    name:'Samarqand',
                    latitude:66.947957,
                    longitude:39.668590,
                    type:2,
                    id:3,
                },
            ],
            term: '',
            filter: 'all',
        }
    },
    methods: {
        createData(item){
            this.data.push(item)
        },
        onToggleHandler({id, prop}){
            this.data = this.data.map(item =>{
                if(item.id == id){
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        },
        onRemoveHandler(id){
            this.data = this.data.filter(c => c.id !== id)
        },
        onSearchHandler(arr, term){
            if(term.length == 0){
                return arr
            }
            return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
        },
        onFilterHandler(arr, filter){
            switch(filter){
                case 'popular':
                    return arr.filter(c => c.type === 1)
                case 'mostViewers':
                    return arr.filter(c => c.type > 1)
                default:
                    return arr
            }
        },
        updateTernHandler(term){
            this.term = term
        },
        updateFilterHandler(filter){
            this.filter = filter
        }
    },
}
</script>

<style>

/* #map {
  margin: 0;
  padding: 0;
  height: 500px;
  padding: 1.5rem;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

.content{
    margin: 2rem;
    padding: 1.5rem;
    border-radius: 4px;
    background-color: #fcfaf5;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
}
.search-panel{
}
</style>