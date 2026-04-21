<script>
export default {
    name: "FooterComponent",
};
</script>
<template>
    <footer class="bg-gradient-to-r from-slate-700 via-slate-600 to-gray-700 text-white mt-auto">
        <div class="container mx-auto px-4 md:px-6 py-8 md:py-10">
            <!-- Desktop Layout -->
            <div class="hidden md:flex justify-between items-start">
                <!-- Nav Links -->
                <div class="flex-1 text-left">
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Navegación</p>
                    <ul class="space-y-2 text-sm text-gray-300">
                        <li><a href="#/" class="hover:text-white transition-colors">Inicio</a></li>
                        <li><a href="#/quienes-somos" class="hover:text-white transition-colors">Nosotros</a></li>
                        <li><a href="#/iniciar-sesion" class="hover:text-white transition-colors">Iniciar sesión</a></li>
                        <li><a href="#/registro" class="hover:text-white transition-colors">Crear cuenta</a></li>
                    </ul>
                </div>

                <!-- Logo Central -->
                <div class="flex-1 flex justify-center">
                    <div class="flex flex-col items-center gap-2">
                        <img class="w-16 drop-shadow-lg" src="/vitahost.svg" alt="Logo de vitahost">
                        <span class="text-xl font-bold tracking-wide">VITAHOST</span>
                        <p class="text-xs text-gray-400 text-center max-w-[160px]">Hosting confiable para tu negocio digital</p>
                    </div>
                </div>

                <!-- Social Links -->
                <div class="flex-1 text-right">
                    <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Síguenos</p>
                    <ul class="space-y-2 text-sm text-gray-300">
                        <li><a href="#" class="hover:text-white transition-colors">Twitter / X</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">LinkedIn</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Instagram</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">GitHub</a></li>
                    </ul>
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="md:hidden flex flex-col items-center gap-6">
                <!-- Logo -->
                <div class="flex flex-col items-center gap-2">
                    <img class="w-14 drop-shadow-lg" src="/vitahost.svg" alt="Logo de vitahost">
                    <span class="text-lg font-bold tracking-wide">VITAHOST</span>
                    <p class="text-xs text-gray-400 text-center">Hosting confiable para tu negocio digital</p>
                </div>

                <!-- Links Cards -->
                <div class="flex gap-4 w-full">
                    <div class="bg-white/5 rounded-lg p-4 flex-1 text-center">
                        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Navegación</p>
                        <ul class="space-y-1 text-sm text-gray-300">
                            <li><a href="#/" class="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#/about" class="hover:text-white transition-colors">Nosotros</a></li>
                            <li><a href="#/login" class="hover:text-white transition-colors">Iniciar sesión</a></li>
                            <li><a href="#/register" class="hover:text-white transition-colors">Crear cuenta</a></li>
                        </ul>
                    </div>
                    <div class="bg-white/5 rounded-lg p-4 flex-1 text-center">
                        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Síguenos</p>
                        <ul class="space-y-1 text-sm text-gray-300">
                            <li><a href="#" class="hover:text-white transition-colors">Twitter / X</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mt-6 pt-6 border-t border-gray-500 text-center text-sm text-gray-300">
                <p>&copy; 2026 VitaHost. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</template>