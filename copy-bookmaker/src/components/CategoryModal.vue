<template>
  <!--<transition name='cat-modal'>-->
<div>
  <basemodal>
  <h2 slot='header'>Add a new category</h2>
  <form class="ui form" >
            <div class="field">
              <label class="field" for="catName">Category name</label>
              <input v-model='catName' type="text" id='catName'
                     placeholder="Enter a catetory name...">
            </div>
            <div class="field">
              <label class="field" for="catColor">Category color</label>
              <select v-model='catColor' id="catColor"
                      class="ui simple dropdown">
                <option value="">Select a color</option>
                <option v-for='color in categoryColors'
                        >
                  {{color|capitalize}}
                </option>
              </select>
            </div><!-- select fileds-->
          </form>
          <div slot="footer" @click="addCategory" class="ui purple inverted button  right">Save</div>
          
  </basemodal>
</div>

  <!--</transition>-->
</template>
<style scoped>
 
</style>
<script type='text/babel'>
  import { eventBusVue } from "../store"
  import store from '../store'
  import BaseModal from './BaseModal.vue'
  import Vue from 'vue' 
  export default{
    components:{
       'basemodal': BaseModal
    },
    beforeCreate: function () {
        this.$options.components.BaseModal = require('./BaseModal.vue')
      },
    created(){
      eventBusVue.$on('ADD-CATEGORY', this.showModal)
    },
    props: {
      isShowModal: true
    },
    data: function () {
      return {
        catName: '',
        catColor: '',
        categoryColors: ['red', 'orange', 'yellow', 'olive', 'green',
          'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']
      }
    },
    watch:{
      catColor:function(){
        console.log(this.catColor)
      }
    },
    filters: {
      capitalize: (content) => content.slice(0, 1).toLocaleUpperCase() + content.slice(1)
    },
    methods: {
      addCategory: function () {
        const newCategory = {}
          , cm = this
        newCategory.name = cm.catName
        newCategory.color = cm.catColor
        store.addCategory(newCategory)
        this.closeModal()

      },
      showModal(){

      },
      closeModal(){
        this.$emit('closecategorymodal')
      }
    }
  }
</script>



// WEBPACK FOOTER //
// CategoryModal.vue?06c52e34