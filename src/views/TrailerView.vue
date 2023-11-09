<template>
    <div class="container">
        <YouTube v-if="trailer" :src="`https://www.youtube.com/watch?v=${trailer}`" @ready="onReady" ref="youtube" />
    </div>
</template>

<script>
import { getTrailer } from "@/services/MovieServices";
import { defineComponent } from "vue";
import YouTube from "vue3-youtube";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "Trailer",
    components: { YouTube },
    data() {
        return {
            id: "",
            movie: {},
            videos: [],
            trailer: false,
        };
    },
    async created() {
        try {
            const route = useRoute();
            this.id = route.params.id;
            this.videos = await getTrailer(this.id);
            if (this.videos.length > 0 && this.videos[0].key) {
                this.trailer = this.videos[0].key;
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    },
    methods: {
        onReady() {
            if (this.$refs.youtube) {
                this.$refs.youtube.playVideo();
            }
        },
    },
});
</script>

<style scoped lang="scss">
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

.YouTube {
    width: 100%;
    height: 400px;
}
</style>