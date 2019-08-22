<template lang="html">
    <div>
        <!-- <ListCate_List v-for="(item,index) in musicTypeJSON" :musicType="item" :key = "index"/> -->
        <ListCate_List v-for="(item,index) in musicTypeJSON" :key = "index" :musicType ="item" />
    </div>
</template>

<script>

    import MusicType from "../../assets/data/musictype.json"
    import ListCate_List from "../listcate_template/listcate_template.vue"

    export default {
        data() {
            return {
                musicTypeJSON: [],
            }
        },
        components: {
            ListCate_List
        },
        created() {
            
        },
        beforeMount(){

        },
        mounted(){
            this.musicTypeJSON = MusicType.currentType

        }
    }
</script>

<style lang="css">
</style>