<template>
    <div class="posts">
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
        <template v-if="!isLoading">
            <post 
            v-for="(item, i) in listPosts"
            :key="i">
                <template v-slot:title>
                   {{item.title}} 
                </template>
                <template v-slot:content>
                   {{item.description}} 
                </template>
                <template v-slot:date>
                   {{item | filterDate(parseDate)}} 
                </template>
                <template
                v-if="GETTERS_CURRENT_USER !== null"
                v-slot:buttons>
                    <b-button
                    v-if="GETTERS_CURRENT_USER.role === 'reader'"
                    @click="addClap({id: item.id, clap: ++item.claps})"
                    icon-left="thumb-up"
                    type="is-info is-light">
                        {{item.claps}}
                    </b-button>
                    <template v-if="(GETTERS_CURRENT_USER.role === 'writer') && (GETTERS_CURRENT_USER.id === item.userId)">
                        <b-button
                        @click="$router.push(`/update-post/${item.id}`, () => {})"
                        icon-left="comment-edit"
                        type="is-info is-light">
                            Изменить
                        </b-button>
                        <b-button
                        @click="deletePost(item.id)" 
                        icon-left="delete"
                        type="is-danger is-light">
                            Удалить
                        </b-button>
                    </template>
                </template>
            </post>
            <b-pagination
                :total="total"
                v-model="current"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">
            </b-pagination>
        </template>
    </div>
</template>
<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import Post from '../post/index'

export default {
    name: 'PostsComponents',
    props: {
        currentUser: Object
    },
    components: {
        Post
    },
    data() {
        return {
            isLoading: true,

            current: 1,
            perPage: 3,
            rangeBefore: 3,
            rangeAfter: 1,
            order: '',
            size: '',
            isSimple: true,
            isRounded: false,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right'
        }
    },
    filters: {
        filterDate({ createdAt, updateAt }, parseDate) {
            
            let created = Date.parse(createdAt),
                updated = Date.parse(updateAt);
            
            if (created < updated) {
                
                return parseDate(updateAt)
               
            } 

            return parseDate(createdAt)

        } 
    },
    computed: {
        ...mapGetters(['GETTERS_LIST_POSTS', 'GETTERS_CURRENT_USER']),
        total() {
            return this.GETTERS_LIST_POSTS.length
        },
        listPosts() {

            let pageNumber = this.current - 1;
 
            return this.GETTERS_LIST_POSTS.slice(pageNumber * this.perPage, (++pageNumber) * this.perPage);
        }
    },
    mounted() {
        this.GET_LIST_POST()
    },
    methods: {
        ...mapActions(['GET_LIST_POST', 'DELETE_POST', 'CLAPS_POTS']),
        ...mapMutations(['UPDATE_POST']),
        parseDate(date) {

            let different = (new Date() - new Date(date));

            let hours = Math.floor((different % 86400000) / 3600000);
            let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
            let result = `${hours} часа(ов) ${minutes} минут назад`;

            return result

        },
        addClap(data) {
            this.CLAPS_POTS(data)
        },
        deletePost(id) {
            this.DELETE_POST(id)
            .then(() => {

                this.UPDATE_POST(id)

                this.$buefy.toast.open({
                    message: 'Пост был удален',
                    type: 'is-success'
                })

            })
        }
    },
    watch: {
        GETTERS_LIST_POSTS(val) {
            if (val !== null) this.isLoading = false
        }
    }
}
</script>
<style>

    .is-current {
        background: #167df0 !important;
    }

    .posts {
        margin: 0 auto;
        max-width: 600px;
        width: 100%;
    }
</style>
