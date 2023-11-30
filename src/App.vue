<script>
import FooterComponent from './components/FooterComponent.vue';
import NavBar from './components/NavBar.vue';

export default {
    name: "App",
    components: { FooterComponent, NavBar }
};
</script>

<template>
    <NavBar />
    <div class="container h-full m-auto p-4">
        <router-view>
        </router-view>
    </div>
    <FooterComponent />
</template>

