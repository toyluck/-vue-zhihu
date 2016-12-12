<template>
  <div id="categories">
    <div class='cat-header'>
      <h2><i class="bookmark icon"> </i> Bookmark</h2>
    </div>
    <div class='container'>
      <h2>
        {{title}}
        <span class='clickable right-float'>
          <i @click='addCategory' class="add icon"> </i>
        </span>
      </h2>
      <div class="ui list">
        <div class="item clickable">
          <div class="content">
            <a class="ui grey empty circular label"> </a>
            <span @click="categorySelected('')">ALL</span>
          </div>
        </div>
        <div v-for="(cat,index) in categories" class="item clickable">
          <div class='content'>
            <a :class='"empty circular label ui " + cat.color '> </a>
            <span @click="categorySelected(cat)"
                  :class="{selected:selectedCategory===cat}">
                {{cat.name}}
            </span>
            <i v-if="cat!=='Uncategorized'"
               class="remove icon right-float"
               @click="deleteCategory(cat)"
            > </i>
          </div>
        </div>
      </div>
      <button
        @click="addBookmark"
        class="ui grey inverted basic icon circular button right-float">
        <i class="add icon"> </i>
      </button>
    </div>

    <category-modal v-if='isCategoryShow'
                    v-on:closecategorymodal='closeCategoryModal'
    >
    </category-modal> 
  </div>
</template>
<style scoped >
   
   .content{
     background:inherit;
     padding:.15em;
   }
 
</style>
<script >
  import   store, { eventBusVue }  from '../store/index'
  import CategoryModal from './CategoryModal.vue'
  import BookmarkModal from './BookmarkModal.vue'
  export default{
    components: {
      CategoryModal
    },
    data: () => {
      return {
        isActive: true,
        rawTitle: 'categories',
        msg: 'hello vue',
        selectedCategory: '',
        isCategoryShow: false
      }
    },
    computed: {
      categoryTagClass: function () {
        return {}
      },
      title: function () {
        return this.rawTitle.toLocaleUpperCase()
      },
      categories: function () {
        return this.rawcategories.map(ctg => {
          let name = ctg.name;
          ctg.name = name.slice(0, 1).toUpperCase() + name.slice(1)
          return ctg
        })
      }
    },
    props: {
      'rawcategories': {
        type: Array,
        default: function () {
          return []
        },
        required: true
      }
    },
    methods: {
      selectCategory: (category) => {
        console.log(category)
      },
      addCategory() {
        // console.log('------------')
        // const date = Date.now()
        // const cat = {
        //   name: String(date),
        //   color: 'purple'
        // }
        // store.addCategory(cat)
        this.isCategoryShow = true
        // eventBusVue.$emit('ADD-CATEGORY')
      },
      closeCategoryModal(){
        this.isCategoryShow = false
      },
      selectedCategory: () => {

      },
      addBookmark: () => {

      },
      deleteCategory: (category) => {
        store.removeCategory(category)
      }
    }
  }
</script>
