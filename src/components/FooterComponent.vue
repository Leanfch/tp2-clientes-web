<script>
export default {
    name: "FooterComponent",
};
</script>
<template>
    <footer class="bg-gradient-to-r from-slate-700 via-slate-600 to-gray-700 text-white mt-auto">
        <div class="container mx-auto px-4 md:px-6 py-8 md:py-10">
            <!-- Desktop Layout -->
            <div class="hidden md:flex justify-between items-center">
                <!-- Info Leandro -->
                <div class="flex-1 text-left">
                    <ul class="space-y-1 text-gray-300">
                        <li class="font-semibold text-white">Leandro Martín Fernández Chapotot</li>
                        <li class="text-sm">DWN4BV</li>
                        <li class="text-sm">2023</li>
                    </ul>
                </div>

                <!-- Logo Central -->
                <div class="flex-1 flex justify-center">
                    <div class="flex flex-col items-center gap-2">
                        <img class="w-16 drop-shadow-lg" src="/vitahost.svg" alt="Logo de vitahost">
                        <span class="text-xl font-bold tracking-wide">VITAHOST</span>
                    </div>
                </div>

                <!-- Info Santiago -->
                <div class="flex-1 text-right">
                    <ul class="space-y-1 text-gray-300">
                        <li class="font-semibold text-white">Santiago Gallino</li>
                        <li class="text-sm">Clientes Web Mobile</li>
                        <li class="text-sm">Final</li>
                    </ul>
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="md:hidden flex flex-col items-center gap-6">
                <!-- Logo -->
                <div class="flex flex-col items-center gap-2">
                    <img class="w-14 drop-shadow-lg" src="/vitahost.svg" alt="Logo de vitahost">
                    <span class="text-lg font-bold tracking-wide">VITAHOST</span>
                </div>

                <!-- Info Cards -->
                <div class="flex flex-col gap-4 w-full">
                    <div class="bg-white/5 rounded-lg p-4 text-center">
                        <ul class="space-y-1 text-gray-300">
                            <li class="font-semibold text-white">Leandro Martín Fernández Chapotot</li>
                            <li class="text-sm">DWN4BV</li>
                            <li class="text-sm">2023</li>
                        </ul>
                    </div>
                    <div class="bg-white/5 rounded-lg p-4 text-center">
                        <ul class="space-y-1 text-gray-300">
                            <li class="font-semibold text-white">Santiago Gallino</li>
                            <li class="text-sm">Clientes Web Mobile</li>
                            <li class="text-sm">Final</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mt-6 pt-6 border-t border-gray-500 text-center text-sm text-gray-300">
                <p>&copy; 2023 VitaHost. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</template>