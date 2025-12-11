<script>
import FooterComponent from './components/FooterComponent.vue';
import NavBar from './components/NavBar.vue';

export default {
    name: "App",
    components: { FooterComponent, NavBar }
};
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <NavBar />
        <main class="flex-1 container mx-auto px-4 pt-24">
            <router-view></router-view>
        </main>
        <FooterComponent />
    </div>
</template>

